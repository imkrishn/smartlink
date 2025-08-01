"use client";

import { client } from "@/app/(root)/appwrite";
import { trackLinkCLick } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Theme } from "@/types/themeType";
import { Link, User } from "@/types/UserType";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ShowPage = ({ user }: { user: User | undefined }) => {
  const [data, setData] = useState<User | undefined>(user);

  useEffect(() => {
    if (!user) return;

    const userUnsubscribe = client.subscribe(
      `databases.${process.env
        .NEXT_PUBLIC_APPWRITE_DATABASE_ID!}.collections.${process.env
        .NEXT_PUBLIC_APPWRITE_COLLECTION_USER_ID!}.documents.${user.$id}`,
      (response: any) => {
        const payload = response.payload as User;
        const parsedTheme: Theme = payload.theme
          ? JSON.parse(response.payload.theme)
          : undefined;

        setData({
          ...payload,
          theme: parsedTheme,
        });
      }
    );

    const linkUnsubscribe = client.subscribe(
      `databases.${process.env
        .NEXT_PUBLIC_APPWRITE_DATABASE_ID!}.collections.${process.env
        .NEXT_PUBLIC_APPWRITE_COLLECTION_LINK_ID!}.documents`,
      (response: any) => {
        const payload = response.payload as Link;
        console.log(response);

        if (payload.users === user.$id) {
          setData((prev) =>
            prev
              ? {
                  ...prev,
                  links: [...(prev.links || []), payload].sort(
                    (a, b) => a.position - b.position
                  ),
                }
              : prev
          );
        }
      }
    );

    return () => {
      userUnsubscribe();
      linkUnsubscribe();
    };
  }, [user]);

  const handleLinks = async (
    linkId: string,
    linkUrl: string,
    linkTitle: string
  ) => {
    try {
      if (!data?.username || !linkId || !linkUrl || !linkTitle) {
        return;
      }
      await trackLinkCLick({
        profileUsername: data?.username,
        linkId,
        linkUrl,
        linkTitle,
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) return null;

  return (
    <div
      className={cn(
        "w-full min-h-full my-3 bg-[#FFFAFA] rounded-3xl pt-11 p-7 text-[#716B6B] shadow-lg border border-[#B4AAAA] grid place-items-center",
        data.theme?.bg,
        data.theme?.text
      )}
    >
      <Image
        src={data.profileUrl || "/man.png"}
        alt="#man_logo"
        width={100}
        height={100}
        className="rounded-full bg-contain p-1 h-28 w-28 bg-white"
      />
      <p className="text-xl font-bold">{data.username}</p>
      <p className="text-xs font-light text-center">{data.description}</p>

      <div className="w-full my-3 grid place-items-center">
        {data.links?.map((link) => (
          <div
            onClick={() => handleLinks(link.$id, link.href, link.title)}
            key={link.$id}
            className={cn(
              "w-full lg:w-108 h-14 cursor-pointer grid place-items-center active:scale-[.98] hover:opacity-90 rounded-lg shadow-md border my-2 border-[#62BEF8] bg-[#c0d3df]",
              data.theme?.linkBg
            )}
          >
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              <p className="text-sm w-full text-center font-semibold">
                {link.title}
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowPage;

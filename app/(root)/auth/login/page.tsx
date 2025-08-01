"use client";

import { account, database } from "@/app/(root)/appwrite";
import { GithubBtn } from "@/components/Buttons";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";
import { Query } from "appwrite";
import bcrypt from "bcryptjs";
import { Lock, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();

      const { email, password } = form;

      if (email.trim() === "" || password.trim() === "") return;

      setLoading(true);

      const user = await database.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USER_ID!,
        [Query.equal("email", email), Query.equal("verified", true)]
      );

      if (user.total === 0) {
        toast.warning("Registered or verfiy the mail");
        return;
      }

      const isRightPassword = await bcrypt.compare(
        password,
        user.documents[0].password
      );

      if (!isRightPassword) {
        toast.error("Password is Wrong.");
        return;
      }

      await account.createEmailPasswordSession(email, password);

      router.push("/dashboard");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="lg:px-48 text-[#6b6a6a]  p-6 overflow-clip">
      <Logo />
      <div className="py-9 flex lg:flex-row flex-col items-center justify-between">
        <div className="max-w-max">
          <h1 className="text-2xl text-[#413F3F] my-3 font-extralight">
            Simplify your presence across the Internet
          </h1>
          <h1 className="text-xl font-bold text-center text-[#827C7C]">
            <p className="inline text-[#6398CA]">Link</p> Smarter ,{" "}
            <p className="inline text-[#0ca10c]">Grow</p> Faster
          </h1>
          <Image
            src="/login-bg.png"
            width={450}
            height={400}
            alt="#login_bg"
            className="bg-cover my-7 lg:block hidden"
          />
        </div>
        <div className="bg-white rounded-2xl text-center p-9 my-7 shadow-lg flex flex-col justify-center items-center">
          <h1 className="text-3xl text-[#3F3B3B] font-black ">Welcome Back</h1>
          <h3 className="text-xs font-extralight ">Sign in to Smartlink 🔗</h3>
          <GithubBtn />
          <p className="">OR</p>
          <form onSubmit={handleSubmit}>
            <div className="my-2 rounded-lg bg-[#F3F0F0] flex gap-2 items-center px-3 py-2">
              <Mail />
              <input
                onChange={handleOnChange}
                name="email"
                disabled={loading}
                type="email"
                placeholder="Email"
                className="px-4  w-full  outline-none bg-transparent"
              />
            </div>
            <div className="my-2 rounded-lg bg-[#F3F0F0] flex gap-2 items-center px-3 py-2">
              <Lock />
              <input
                onChange={handleOnChange}
                name="password"
                disabled={loading}
                type="password"
                placeholder="Password"
                className="px-4  w-full  outline-none bg-transparent"
              />
            </div>
            <p className="my-2 text-[#3580BE] text-sm text-right cursor-pointer active:scale-[.98]">
              Forgot Password
            </p>
            <button
              type="submit"
              className={cn(
                "text-white font-bold px-3 w-full py-2 cursor-pointer active:scale-[.96] rounded-md lg:text-sm text-xs shadow-lg ",
                loading ? "bg-[#7cacda] cursor-default" : "bg-[#6398ca]"
              )}
              disabled={loading}
            >
              {loading ? "Logging" : "Login"}
            </button>
          </form>
          <p className="text-[#807B7B] text-sm mt-7">
            Don&apos;t have Account ?{" "}
            <p
              className="text-[#3580BE] inline cursor-pointer active:scale-[.98]"
              onClick={() => router.push("/auth/signup")}
            >
              Sign Up
            </p>
          </p>
        </div>
      </div>
    </main>
  );
};

export default page;

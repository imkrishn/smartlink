"use client";

import { account } from "@/app/(root)/appwrite";
import { useTimer } from "@/hooks/useTimer";
import { cn } from "@/lib/utils";
import { OAuthProvider } from "appwrite";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type OtpBtnProps = {
  onClick: () => Promise<string | void>;
  initialTime?: number;
};

export function LoginBtn() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/auth/login")}
      className="text-white font-bold lg:px-3 px-2 py-1 cursor-pointer active:scale-[.96] rounded-md lg:text-sm text-xs shadow-2xl drop-shadow-white bg-[#6398ca]"
    >
      Login
    </button>
  );
}

export function GithubBtn() {
  async function onClick() {
    try {
      await account.createOAuth2Session(
        OAuthProvider.Github,
        `${process.env.NEXT_PUBLIC_URL}/dashboard`,
        `${process.env.NEXT_PUBLIC_URL}/auth/login`
      );
    } catch (Err) {
      console.log(Err);
    }
  }

  return (
    <button
      onClick={onClick}
      className="bg-white w-full my-3  border border-slate-400 font-bold px-6 py-0.5 cursor-pointer active:scale-[.96] rounded-md lg:text-sm text-xs shadow-lg "
    >
      <Image
        src="/github.png"
        alt="#github_logo"
        width={35}
        height={35}
        className="inline"
      />{" "}
      Continue with Github
    </button>
  );
}

export function SubmitBtn({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      className={cn(
        "text-white font-bold px-3 w-full py-2 cursor-pointer active:scale-[.96] rounded-md lg:text-sm text-xs shadow-lg ",
        loading ? "bg-[#7cacda] cursor-default" : "bg-[#6398ca]"
      )}
      disabled={loading}
    >
      {loading ? "Submitting" : "Submit"}
    </button>
  );
}

export function OtpBtn({ onClick, initialTime = 60 }: OtpBtnProps) {
  const [clicked, setClicked] = useState<boolean>(false);
  const [timerKey, setTimerKey] = useState<number>(0);
  const timeLeft = useTimer(clicked ? initialTime : 0, timerKey);

  useEffect(() => {
    if (timeLeft === 0) setClicked(false);
  }, [timeLeft]);

  async function onSubmit() {
    if (clicked) return;

    const result = await onClick();
    if (result !== "failed") {
      setClicked(true);
      setTimerKey((prev) => prev + 1);
    }
  }

  return (
    <div
      onClick={onSubmit}
      aria-disabled={clicked}
      className={cn(
        "px-2 py-1 text-sm whitespace-nowrap rounded-full cursor-pointer text-white select-none",
        clicked
          ? "bg-slate-600 cursor-not-allowed"
          : "bg-slate-950 hover:bg-slate-800 active:scale-95"
      )}
    >
      {clicked ? `${timeLeft}s` : "Send OTP"}
    </div>
  );
}

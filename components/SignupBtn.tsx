"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const SignupBtn = ({ arrow }: { arrow?: boolean }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/auth/signup")}
      className="bg-white font-semibold lg:py-1.5 lg:px-3 p-2 min-w-max rounded-md my-4 cursor-pointer active:scale-[.98] lg:text-sm text-xs shadow-[0_4px_6px_rgba(0,0,0,0.6),_0_1px_3px_rgba(0,0,0,0.08)] border border-[#6398CA] text-[#6398CA]"
    >
      Get Started For Free{" "}
      {arrow && (
        <Image
          width={35}
          height={50}
          src="/arrow-right.png"
          alt="#arrowright_icon"
          className="h-7 m-2  inline"
        />
      )}
    </button>
  );
};

export default SignupBtn;

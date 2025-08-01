"use client";

import Analytics from "@/components/Analytics";
import Footer from "@/components/Footer";
import Links from "@/components/Links";
import Logo from "@/components/Logo";
import Personalize from "@/components/Personalize";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="lg:px-48 p-4">
        <div className="flex ">
          <Logo />
          <Image
            src="/man.png"
            alt="#man_logo"
            width={60}
            height={50}
            className="bg-cover mr-6"
          />
        </div>
        <Analytics />
        <Personalize />
        <Links userId="688871d90039ff315396" />
      </div>
      <Footer />
    </div>
  );
};

export default Page;

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const analyticsAssests = [
  {
    iconUrl: "/audience.png",
    heading: "Unique Visitors",
    value: "32",
    color: "text-[#1284BD] bg-[#87e0f92f]",
  },
  {
    iconUrl: "/link.png",
    heading: "Links Clicked",
    value: "4",
    color: "text-[#0EAE31] bg-[#adfabe5e]",
  },
  {
    iconUrl: "/globe.png",
    heading: "Upgrade to Ultra",
    value: "🔒",
    color: "text-[#B80B36] bg-[#ffb7cb3f]",
  },
  {
    iconUrl: "/cursor.png",
    heading: "Total Clicked",
    value: "67",
    color: "text-[#F56207] bg-[#ffd4a931]",
  },
  {
    iconUrl: "/calendar.png",
    heading: "Last Activity",
    value: "24 July,2025",
    color: "text-[#920094] bg-[#f9c7f242] text-sm",
  },
];

const Analytics = () => {
  return (
    <div className="bg-white shadow-lg p-9 my-3 rounded-lg">
      <h1 className="text-2xl font-extralight text-[#575555]">
        Analytics Overview
      </h1>
      <h1 className="text-[#B3ACAC]  font-semibold text-xs">
        Last 30 days Performance
      </h1>
      <div className="my-7 flex gap-2 items-center justify-center lg:flex-nowrap flex-wrap text-[#474444]">
        {analyticsAssests.map(({ color, iconUrl, heading, value }, index) => (
          <span
            key={index}
            className={cn(" lg:w-44 w-full rounded-lg shadow-lg p-4 ", color)}
          >
            <p className=" text-sm">{heading}</p>
            <div className="w-full mt-5 pl-2 flex justify-between text-[#474444]  font-bold">
              <p>{value}</p>
              <Image
                src={iconUrl}
                alt={iconUrl}
                width={30}
                height={30}
                className="inline bg-cover  ml-4"
              />
            </div>
          </span>
        ))}
      </div>
      <div className="flex justify-between gap-2 lg:flex-nowrap flex-wrap">
        <span className="flex items-center lg:w-1/2 w-full  shadow-lg border border-slate-300 rounded-lg p-3">
          <Image
            src="/link1.png"
            alt="#link1_icon"
            width={30}
            height={30}
            className="bg-cover"
          />
          <span className="font-bold  pl-4">
            Top Performing link{" "}
            <p className="text-sm font-extralight px-1">Github</p>
          </span>
        </span>
        <span className="flex items-center  lg:w-1/2 w-full shadow-lg border border-slate-300 rounded-lg p-3">
          <Image
            src="/domain.png"
            alt="#domain_icon"
            width={30}
            height={30}
            className="bg-cover"
          />
          <span className="font-bold  pl-4">
            Top Referer <p className="text-sm font-extralight px-1">Internet</p>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Analytics;

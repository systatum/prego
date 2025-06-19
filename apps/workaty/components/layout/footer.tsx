"use client";

import Image from "next/image";
import React from "react";
import { WorkatyTypeLogo } from "@/public/workatyLogo";
import Link from "next/link";
import { useHomePageNavbarItems } from "../data/Navigation";
import LocaleActionModal from "../modal/LocaleActionModal";
import { scrollToId } from "./../../../../packages/components/tools/scroll-to-id";

export default function Footer() {
  const { HOMEPAGE_FOOTER_LINK_ITEMS, HOMEPAGE_SOCIAL_MEDIA_ACCOUNTS } =
    useHomePageNavbarItems();

  return (
    <footer className="relative z-30 flex w-full flex-col items-center justify-center overflow-hidden border border-gray-50 bg-white px-3 py-20 shadow-sm">
      <div className="relative flex w-full max-w-[1400px] flex-col items-start justify-center gap-7 md:flex-row md:px-10">
        <div className="flex w-full flex-row gap-3 md:flex-col">
          <div className="flex w-full flex-col gap-4">
            <Image src={WorkatyTypeLogo} alt="Logo dashtomer" width={150} />
            <div className="flex w-full flex-col gap-2">
              <div className="flex flex-row gap-3">
                {HOMEPAGE_SOCIAL_MEDIA_ACCOUNTS?.map((data, index) => (
                  <div
                    key={index}
                    onClick={() => scrollToId("HeroSection")}
                    className="flex cursor-pointer items-center rounded-full bg-black p-2"
                  >
                    <Image
                      width={12}
                      src={data?.logo}
                      alt={`Social media on Workaty ${data?.title}`}
                    />
                  </div>
                ))}
              </div>
              <span className="text-sm">
                ©2025 copyright by{" "}
                <Link
                  href={"/"}
                  className="transform font-semibold transition-all duration-300 hover:underline"
                >
                  Workaty
                </Link>
              </span>
            </div>
          </div>
          <LocaleActionModal />
        </div>

        <div className="flex w-full flex-wrap justify-between gap-6 sm:flex-row">
          {HOMEPAGE_FOOTER_LINK_ITEMS?.map((data, index) => (
            <div key={index} className="flex flex-col gap-4 text-sm">
              <h2 className="font-semibold">{data?.category}</h2>
              {data?.items?.map((val, i) => (
                <p
                  onClick={() => scrollToId("HeroSection")}
                  className="cursor-pointer text-gray-500 underline hover:text-gray-600"
                  key={i}
                >
                  {val?.title}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

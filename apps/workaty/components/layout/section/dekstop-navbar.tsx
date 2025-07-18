import { useHomePageNavbarItems } from "@/components/data/Navigation";
import Link from "next/link";
import React from "react";

interface HomePageDesktopNavbarProps {
  handleMouseEnterHover: (data: string) => void;
  handleMouseLeaveHover: () => void;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
  isHovered: string | null;
  openIndex: number | null;
}

export default function HomePageDesktopNavbar({
  handleMouseEnterHover,
  handleMouseLeaveHover,
  isHovered,
  handleMouseEnter,
  handleMouseLeave,
  openIndex,
}: HomePageDesktopNavbarProps) {
  const { HOMEPAGE_MENU_NAVBAR } = useHomePageNavbarItems();

  return (
    <div className="flex w-full flex-row items-center gap-2 text-sm font-medium">
      {HOMEPAGE_MENU_NAVBAR?.map((data, index) => (
        <div
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          className="relative px-4"
        >
          <button className="cursor-pointer rounded-[0px] hover:bg-transparent">
            {data?.title}
          </button>

          {openIndex === index && (
            <div className="absolute top-full z-10 mt-5 -translate-x-3 transform border bg-white shadow-lg">
              {data?.data?.map((item, subIndex) => (
                <Link key={subIndex} href={item?.link}>
                  <div
                    className={`flex min-w-[300px] cursor-pointer items-center gap-3 p-4 transition-all ${
                      isHovered ===
                      `nav-subItem-${item?.titleChild}-${subIndex}`
                        ? "bg-black text-white"
                        : ""
                    }`}
                    onMouseEnter={() =>
                      handleMouseEnterHover(
                        `nav-subItem-${item?.titleChild}-${subIndex}`
                      )
                    }
                    onMouseLeave={handleMouseLeaveHover}
                  >
                    <div
                      className={`rounded-full border p-3 px-4 text-xs ${
                        isHovered ===
                        `nav-subItem-${item?.titleChild}-${subIndex}`
                          ? "bg-white text-black"
                          : ""
                      }`}
                    >
                      {item?.titleChild?.slice(0, 1)}
                    </div>
                    {item?.titleChild}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

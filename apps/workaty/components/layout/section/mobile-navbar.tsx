import { useHomePageNavbarItems } from "@/components/data/Navigation";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SwipeableHandlers } from "react-swipeable";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface HomePageMobileNavbarProps {
  isOpen: boolean | null;
  swipeHandlers: SwipeableHandlers;
  handleMouseEnterHover: (data: string) => void;
  handleMouseLeaveHover: () => void;
  isHovered: string | null;
  setIsOpen: (data: boolean) => void;
}

export default function HomePageMobileNavbar({
  isOpen,
  swipeHandlers,
  handleMouseEnterHover,
  handleMouseLeaveHover,
  isHovered,
  setIsOpen,
}: HomePageMobileNavbarProps) {
  const { HOMEPAGE_MENU_NAVBAR } = useHomePageNavbarItems();
  const router = useRouter();
  const t = useTranslations("navigation.authModal");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
            style={{ touchAction: "none" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            {...swipeHandlers}
          />
          <motion.div
            className="absolute top-14 left-0 z-30 flex w-full flex-col justify-between bg-white p-4 shadow-md md:hidden"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 40 }}
            {...swipeHandlers}
          >
            {HOMEPAGE_MENU_NAVBAR?.map((data, index) => (
              <div key={index} className="mb-4 flex flex-col">
                <div className="mb-2 font-semibold">{data?.title}</div>
                {data?.data?.map((item, subIndex) => (
                  <Link
                    key={subIndex}
                    href={item?.link}
                    className="flex flex-row items-center gap-4 py-1 text-xs"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      setTimeout(() => {
                        router.push(item?.link);
                      }, 200);
                    }}
                  >
                    <div
                      className={`${
                        isHovered === `${item?.titleChild}-${subIndex}`
                          ? "bg-black text-white"
                          : ""
                      } flex w-full min-w-[200px] cursor-pointer flex-row items-center gap-3 px-2 py-1 text-base`}
                      onMouseEnter={() =>
                        handleMouseEnterHover(`${item?.titleChild}-${subIndex}`)
                      }
                      onMouseLeave={() => handleMouseLeaveHover()}
                    >
                      <div
                        className={`rounded-full border p-3 px-4 text-[10px] transition-colors duration-200 ${
                          isHovered === `${item?.titleChild}-${subIndex}`
                            ? "bg-white text-black"
                            : ""
                        }`}
                      >
                        {item?.titleChild?.slice(0, 1)}
                      </div>
                      <div className="min-w-[300px]">{item?.titleChild}</div>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
            <div className="mt-4 flex flex-col gap-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex w-full flex-col items-end justify-end gap-3 md:flex-row"
              >
                <Link
                  href={`https://app.workaty.com`}
                  onClick={() => setIsOpen(false)}
                  className="w-full"
                >
                  <Button variant={"default"} className="w-full">
                    {t("goToDashboard")}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { RiMenuLine, RiCloseLine } from "@remixicon/react";
import { AnimatePresence, motion } from "framer-motion";
import { SwipeableHandlers, useSwipeable } from "react-swipeable";
import styled, { css } from "styled-components";
import { useRouter } from "next/navigation";
import { Button } from "@systatum/coneto/button";
import { OverlayBlocker } from "@systatum/coneto/overlay-blocker";
import { play } from "@/fonts";
import { applyId } from "../../../../packages/components/tools/apply-id";
import { scrollToId } from "./../../../../packages/components/tools/scroll-to-id";

export function Navbar() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => setIsOpen(false),
    trackMouse: true,
    trackTouch: true,
  });

  return (
    <NavbarWrapper id={applyId("navigation-bar")} $scrolled={scrolled}>
      <MobileNavbar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        swipeHandlers={swipeHandlers}
      />

      <NavbarInner>
        <Button
          icon={{
            image: "/assets/sequelore_128.png",
            size: 48,
          }}
          onClick={() => router.push("/")}
          variant="ghost"
          styles={{
            self: css`
              padding: 0px 10px;
              font-weight: 600;
              font-size: 22px;
              font-family: ${play.style.fontFamily};
              color: #2c5f3f;

              &:hover {
                background-color: transparent;
                box-shadow: none;
              }
              &:focus-visible {
                background-color: transparent;
              }
            `,
          }}
        >
          Sequelore
        </Button>

        <DesktopNavbar />

        <MotionButton
          variant="ghost"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.1 }}
          icon={{
            image: isOpen ? RiCloseLine : RiMenuLine,
            size: 22,
          }}
          styles={{
            containerStyle: css`
              @media (min-width: 820px) {
                display: none;
              }
            `,
            self: css`
              padding: 0px;
              width: 40px;
              height: 40px;
              justify-content: center;
              align-self: center;
              font-weight: 600;
            `,
          }}
        />
      </NavbarInner>
    </NavbarWrapper>
  );
}

const MotionButton = motion(Button);

const NavbarWrapper = styled.div<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  width: 100%;
  transition: box-shadow 0.3s ease;
  background-image: url("/assets/paper-background.png");
  background-repeat: repeat;
  border-bottom: 1px solid #f1f1f1;

  ${({ $scrolled }) =>
    $scrolled &&
    css`
      box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06);
    `}
`;

const NavbarInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: 56px;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 30px 20px;
  background-image: url("/assets/paper-background.png");
  background-repeat: repeat;
  z-index: 50;

  @media (min-width: 1280px) {
    padding: 0 40px;
  }
  @media (min-width: 1440px) {
    padding: 0 0px;
  }
`;

function DesktopNavbar() {
  return (
    <>
      <Button
        variant="success"
        styles={{
          containerStyle: css`
            display: none;

            @media (min-width: 820px) {
              display: flex;
            }
          `,
          self: css`
            background-color: #2c5f3f;
            &:hover {
              background-color: #326c47;
            }
            &:active {
              background-color: #234c32;
            }
          `,
        }}
        onClick={() => scrollToId("download-sequelore")}
      >
        Download
      </Button>
    </>
  );
}

const Nav = styled.nav`
  flex-direction: row;
  align-items: center;
  gap: 4px;

  display: none;

  @media (min-width: 820px) {
    display: flex;
  }
`;

interface MobileNavbarProps {
  isOpen: boolean | null;
  swipeHandlers: SwipeableHandlers;
  setIsOpen: (value: boolean) => void;
}

function MobileNavbar({ isOpen, swipeHandlers, setIsOpen }: MobileNavbarProps) {
  const router = useRouter();

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setTimeout(() => router.push(href), 200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <OverlayBlocker
            zIndex={30}
            styles={{
              self: css`
                position: fixed;
              `,
            }}
            show={isOpen}
            onClick={() => setIsOpen(false)}
          />

          <Drawer
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 40 }}
            {...swipeHandlers}
          >
            <Divider />

            <Button
              styles={{
                containerStyle: css`
                  width: 100%;
                  @media (min-width: 820px) {
                    display: none;
                  }
                `,
                self: css`
                  width: 100%;
                  background-color: #2c5f3f;
                  &:hover {
                    background-color: #326c47;
                  }
                  &:active {
                    background-color: #234c32;
                  }
                `,
              }}
              onClick={() => {
                setIsOpen(false);
                scrollToId("download-sequelore");
              }}
              variant="success"
            >
              Download
            </Button>
          </Drawer>
        </>
      )}
    </AnimatePresence>
  );
}

const Drawer = styled(motion.div)`
  position: absolute;
  top: 56px;
  left: 0;
  z-index: 30;
  width: 100%;
  background-image: url("/assets/paper-background.png");
  background-repeat: repeat;
  padding: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (min-width: 820px) {
    display: none;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #f1f1f1;
  margin: 8px 0;
`;

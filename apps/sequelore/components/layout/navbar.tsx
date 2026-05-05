"use client";

import React, { useEffect, useState } from "react";
import { RiMenuLine, RiCloseLine } from "@remixicon/react";
import { AnimatePresence, motion } from "framer-motion";
import { SwipeableHandlers, useSwipeable } from "react-swipeable";
import styled, { css, CSSProp } from "styled-components";
import { useRouter } from "next/navigation";
import { Button } from "@systatum/coneto/button";
import { OverlayBlocker } from "@systatum/coneto/overlay-blocker";

interface NavItem {
  title: string;
  href?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    title: "Product",
    href: "/product",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Docs",
    href: "/docs",
  },
  {
    title: "Company",
    href: "/company",
  },
];

export default function Navbar() {
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
    <NavbarWrapper $scrolled={scrolled}>
      <MobileNavbar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        swipeHandlers={swipeHandlers}
      />

      <NavbarInner>
        <Button
          icon={{
            image: "/assets/sequelore_128.png",
          }}
          variant="ghost"
          styles={{
            self: css`
              padding: 0px 10px;
              font-weight: 600;
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
              @media (min-width: 840px) {
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
  padding: 0 20px;
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
  const router = useRouter();

  return (
    <>
      <Nav>
        {NAV_ITEMS.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            onClick={() => {
              router.push(String(item.href));
            }}
          >
            {item.title}
          </Button>
        ))}
      </Nav>

      <Button
        variant="success"
        styles={{
          containerStyle: css`
            display: none;

            @media (min-width: 840px) {
              display: flex;
            }
          `,
        }}
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

  @media (min-width: 840px) {
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
            {NAV_ITEMS.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                styles={{
                  containerStyle: css`
                    width: 100%;
                  `,
                  self: css`
                    width: 100%;
                  `,
                }}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/${item.href}`);
                  handleNavClick(String(item.href));
                }}
              >
                {item.title}
              </Button>
            ))}

            <Divider />

            <Button
              styles={{
                containerStyle: css`
                  width: 100%;
                  @media (min-width: 840px) {
                    display: none;
                  }
                `,
                self: css`
                  width: 100%;
                `,
              }}
              onClick={() => setIsOpen(false)}
              variant="success"
            >
              Get Started
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

  @media (min-width: 840px) {
    display: none;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #f1f1f1;
  margin: 8px 0;
`;

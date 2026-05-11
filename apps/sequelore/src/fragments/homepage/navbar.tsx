import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import { navigate } from "gatsby";
import { Button } from "@systatum/coneto/button";
import { applyId } from "../../../../../packages/components/tools/apply-id";
import { scrollToId } from "../../../../../packages/components/tools/scroll-to-id";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <NavbarWrapper id={applyId("navigation-bar")} $scrolled={scrolled}>
      <NavbarInner>
        <Button
          icon={{
            image: "/assets/sequelore_128.png",
            size: 48,
          }}
          onClick={() => navigate("/")}
          variant="ghost"
          styles={{
            self: css`
              padding: 0px 10px;
              font-weight: 600;
              font-size: 22px;
              font-family: "Play", sans-serif;
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

        <Button
          variant="success"
          styles={{
            containerStyle: css`
              display: flex;
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

const Nav = styled.nav`
  flex-direction: row;
  align-items: center;
  gap: 4px;

  display: none;

  @media (min-width: 820px) {
    display: flex;
  }
`;

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

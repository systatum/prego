"use client";

import { Container } from "@/components/layout/container";
import { Text } from "@/components/layout/typography";
import { WaterImage, DuckSwimming } from "@/public/assets";
import { RiAppleFill, RiWindowsFill } from "@remixicon/react";
import { Button } from "@systatum/coneto/button";
import { useRouter } from "next/navigation";
import React from "react";
import styled, { css, keyframes } from "styled-components";
import { applyId } from "../../../../packages/components/tools/apply-id";

export function Footer() {
  const router = useRouter();

  const DOWNLOAD_OPTIONS = [
    {
      key: "linux",
      title: "Download for Linux",
      sub: ".deb / .rpm / AppImage",
      icon: LinuxIcon,
      iconColor: "rgba(255,255,255,0.2)",
      link: "/",
    },
    {
      key: "mac",
      title: "Download for macOS",
      sub: "Universal — Apple & Intel",
      icon: RiAppleFill,
      iconColor: "rgba(255,255,255,0.2)",
      link: "/",
    },
    {
      key: "windows",
      title: "Download for Windows",
      sub: ".exe installer — 64-bit",
      icon: RiWindowsFill,
      iconColor: "rgba(100,180,255,0.25)",
      link: "/",
    },
  ];

  const DUCKS = [
    { x: 2, y: -20, delay: 0 },
    { x: 6, y: 24, delay: 0.8 },
    { x: 19, y: 0, delay: 1.6 },
  ];

  return (
    <Container.Section
      id={applyId("download")}
      styles={{
        self: css`
          position: relative;
          overflow: hidden;
          padding: 0px;
          @media (max-width: 840px) {
            padding: 0px;
          }
          @media (max-width: 640px) {
            padding: 0px;
          }
        `,
      }}
    >
      <WaterSection>
        <DownloadPanel>
          <Text
            styles={{
              self: css`
                font-size: 11px;
                font-weight: 500;
                color: rgba(0, 0, 0, 0.6);
                letter-spacing: 0.08em;
                text-transform: uppercase;
                margin: 0 0 2px 0;
              `,
            }}
          >
            Download
          </Text>

          {DOWNLOAD_OPTIONS.map((item) => (
            <Button
              key={item.key}
              icon={{
                image: item.icon,
                size: 24,
              }}
              styles={{
                self: buttonStyles,
              }}
              onClick={() => {
                router.push(item.link);
              }}
            >
              <BtnLabel>
                <Text styles={{ self: BtnTitle }}>{item.title}</Text>
                <Text styles={{ self: BtnSub }}>{item.sub}</Text>
              </BtnLabel>
            </Button>
          ))}
        </DownloadPanel>

        {DUCKS.map((duck, i) => (
          <Duck
            key={i}
            src={DuckSwimming.src}
            $x={duck.x}
            $y={duck.y}
            $delay={duck.delay}
          />
        ))}
      </WaterSection>
    </Container.Section>
  );
}

const bobble = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
`;

const WaterSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 280px;
  overflow: hidden;

  background-image: url(${WaterImage.src});
  background-repeat: repeat-x;

  background-size: auto;
  background-position: 0 bottom;

  image-rendering: auto;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      #ffffff 0%,
      rgba(255, 255, 255, 0) 30%
    );
    z-index: 1;
  }
`;

const Duck = styled.img<{ $x: number; $y?: number; $delay: number }>`
  position: absolute;
  bottom: ${({ $y }) => $y ?? "0"}%;
  right: ${({ $x }) => $x}%;
  height: 80%;

  animation: ${bobble} 3.5s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;

  pointer-events: none;
`;

const DownloadPanel = styled.div`
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 260px;
`;

const buttonStyles = css`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow:
    0 2px 16px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  cursor: pointer;
  text-align: left;
  min-width: 240px;
  height: 50px;

  transition:
    background 0.18s,
    border-color 0.18s,
    transform 0.12s;

  &:hover {
    background: rgba(255, 255, 255, 0.28);
    border-color: rgba(255, 255, 255, 0.55);
  }

  &:active {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const BtnLabel = styled.span`
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
`;

const BtnTitle = css`
  font-size: 13px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
  line-height: 1.3;
`;

const BtnSub = css`
  font-size: 11px;
  color: rgba(0, 0, 0, 0.4);
  font-weight: 400;
`;

const BtnArrow = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  flex-shrink: 0;
`;
const LinuxIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="128" cy="150" rx="70" ry="80" fill="#000000" />

    <ellipse cx="128" cy="165" rx="45" ry="55" fill="#ffffff" />

    <circle cx="128" cy="85" r="50" fill="#000000" />

    <ellipse cx="108" cy="75" rx="10" ry="14" fill="#ffffff" />
    <ellipse cx="148" cy="75" rx="10" ry="14" fill="#ffffff" />
    <circle cx="108" cy="80" r="5" fill="#000000" />
    <circle cx="148" cy="80" r="5" fill="#000000" />

    <ellipse cx="128" cy="100" rx="18" ry="10" fill="#f4a300" />

    <ellipse cx="95" cy="225" rx="20" ry="10" fill="#f4a300" />
    <ellipse cx="160" cy="225" rx="20" ry="10" fill="#f4a300" />
  </svg>
);

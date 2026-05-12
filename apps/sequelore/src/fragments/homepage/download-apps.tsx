import { RiAppleFill, RiWindowsFill } from "@remixicon/react";
import { Button } from "@systatum/coneto/button";
import { navigate } from "gatsby";
import React from "react";
import styled, { css, keyframes } from "styled-components";
import { applyId } from "../../../../../packages/components/tools/apply-id";
import { Container } from "./../../../../../packages/components/layout/container";
import { Text } from "./../../../../../packages/components/layout/typography";

export function DownloadApps() {
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
    { x: 2, y: -20, delay: 0, xMob: 40, yMob: 5 },
    { x: 6, y: 24, delay: 0.8, xMob: 20, yMob: 20 },
    { x: 19, y: 0, delay: 1.6, xMob: 5, yMob: -5 },
  ];

  return (
    <Container.Section
      id={applyId("download")}
      styles={{
        self: css`
          position: relative;
          overflow: hidden;
          padding: 0px;
          @media (max-width: 820px) {
            padding: 0px;
          }
          @media (max-width: 640px) {
            padding: 0px;
          }
        `,
      }}
    >
      <WaterSection>
        <Container.Section.Inner
          styles={{
            self: css`
              position: relative;
              width: 100%;
              max-width: 1280px;
              margin: 0 auto;
              min-height: 280px;

              @media (max-width: 640px) {
                min-height: 600px;
              }
            `,
          }}
        >
          <DownloadPanel>
            <Text
              styles={{
                self: css`
                  font-size: 14px;
                  font-weight: 600;
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
                  navigate(item.link);
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
              src={"/assets/duck.png"}
              $x={duck.x}
              $y={duck.y}
              $xMob={duck.xMob}
              $yMob={duck.yMob}
              $delay={duck.delay}
            />
          ))}
        </Container.Section.Inner>
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
  align-items: center;

  background-image: url(${"/assets/water.png"});
  background-repeat: repeat-x;
  background-size: auto 100%;
  background-position: center 0px;

  image-rendering: auto;

  @media (max-width: 640px) {
    min-height: 600px;
  }
`;

const Duck = styled.img<{
  $x: number;
  $y?: number;
  $xMob: number;
  $yMob?: number;
  $delay: number;
}>`
  position: absolute;
  bottom: ${({ $y }) => $y ?? "0"}%;
  right: ${({ $x }) => $x}%;
  height: 200px;

  animation: ${bobble} 3.5s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;

  pointer-events: none;

  @media (max-width: 640px) {
    bottom: ${({ $yMob }) => $yMob ?? "0"}%;
    right: ${({ $xMob }) => $xMob}%;
  }
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

  @media (max-width: 640px) {
    justify-content: center;
    align-items: center;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    top: 30%;
  }
`;

const buttonStyles = css`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
  box-shadow:
    0 2px 16px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  cursor: pointer;
  text-align: left;
  min-width: 400px;
  height: 60px;

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

  @media (max-width: 640px) {
    min-width: 340px;
    max-width: 340px;
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

const LinuxIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="128" cy="150" rx="70" ry="80" fill="#2f2f2f" />
    <ellipse cx="128" cy="165" rx="45" ry="55" fill="#d1d1d1" />
    <circle cx="128" cy="85" r="50" fill="#2a2a2a" />
    <ellipse cx="108" cy="75" rx="10" ry="14" fill="#e5e5e5" />
    <ellipse cx="148" cy="75" rx="10" ry="14" fill="#e5e5e5" />
    <circle cx="108" cy="80" r="5" fill="#1a1a1a" />
    <circle cx="148" cy="80" r="5" fill="#1a1a1a" />
    <ellipse cx="128" cy="100" rx="18" ry="10" fill="#9e9e9e" />
    <ellipse cx="95" cy="225" rx="20" ry="10" fill="#8a8a8a" />
    <ellipse cx="160" cy="225" rx="20" ry="10" fill="#8a8a8a" />
  </svg>
);

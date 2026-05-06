"use client";

import React from "react";
import styled, { css } from "styled-components";
import {
  RiTriangleFill,
  RiGithubFill,
  RiSlackFill,
  RiNotionFill,
} from "@remixicon/react";
import { Container } from "@/components/layout/container";
import { applyId } from "../../../../packages/components/tools/apply-id";
import { Text } from "@/components/layout/typography";

const LOGOS = [
  { name: "Lattice", icon: <Lattice /> },
  { name: "Vercel", icon: <RiTriangleFill /> },
  { name: "Linear", icon: <Linear /> },
  { name: "Notion", icon: <RiNotionFill /> },
  { name: "GitHub", icon: <RiGithubFill /> },
  { name: "Slack", icon: <RiSlackFill /> },
];

export function TrustedBy() {
  return (
    <Container.Section
      id={applyId("trusted-by")}
      styles={{
        self: css`
          flex-direction: column;
          gap: 30px;
        `,
      }}
    >
      <Text.Label>Trusted by modern teams at</Text.Label>
      <LogoRow>
        {LOGOS.map(({ name, icon }) => (
          <LogoItem key={name}>
            {icon}
            {name}
          </LogoItem>
        ))}
      </LogoRow>
    </Container.Section>
  );
}

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3.5rem;
  flex-wrap: wrap;
`;

const LogoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  font-family: "DM Sans", sans-serif;
  color: #6b6b5a;
  opacity: 0.65;
  transition: opacity 0.2s ease;
  cursor: default;

  svg {
    color: #6b6b5a;
    width: 18px;
    height: 18px;
  }

  &:hover {
    opacity: 1;
  }
`;

function Lattice({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 115" fill="none">
      <path
        d="M10 62 L28 80 L46 62"
        stroke="#6B6B5A"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M10 38 L28 56 L46 38"
        stroke="#6B6B5A"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M28 62 L46 80 L64 62"
        stroke="#6B6B5A"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M28 38 L46 56 L64 38"
        stroke="#6B6B5A"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M46 62 L64 80 L82 62"
        stroke="#6B6B5A"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M46 38 L64 56 L82 38"
        stroke="#6B6B5A"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function Linear({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 115" fill="none">
      {/* Full circle clipping mask */}
      <defs>
        <clipPath id="circle">
          <circle cx="50" cy="50" r="48" />
        </clipPath>
      </defs>

      {/* Base circle */}
      <circle cx="50" cy="50" r="48" fill="#6B6B5A" />

      {/* Three diagonal slash stripes cut through the circle */}
      <g clipPath="url(#circle)" fill="#6B6B5A">
        {/* These dark gaps simulate the cuts */}
      </g>

      {/* Dark diagonal slashes (the gaps between segments) */}
      <rect
        x="-10"
        y="34"
        width="120"
        height="9"
        rx="4"
        transform="rotate(-38 50 50)"
        fill="black"
        opacity="0.85"
        clipPath="url(#circle)"
      />
      <rect
        x="-10"
        y="50"
        width="120"
        height="9"
        rx="4"
        transform="rotate(-38 50 50)"
        fill="black"
        opacity="0.85"
        clipPath="url(#circle)"
      />
      <rect
        x="-10"
        y="66"
        width="120"
        height="9"
        rx="4"
        transform="rotate(-38 50 50)"
        fill="black"
        opacity="0.85"
        clipPath="url(#circle)"
      />
    </svg>
  );
}

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

function Lattice() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="1" width="7" height="7" rx="1.5" fill="#6B6B5A" />
      <rect x="10" y="1" width="7" height="7" rx="1.5" fill="#6B6B5A" />
      <rect x="1" y="10" width="7" height="7" rx="1.5" fill="#6B6B5A" />
      <rect x="10" y="10" width="7" height="7" rx="1.5" fill="#6B6B5A" />
    </svg>
  );
}

function Linear() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="8" stroke="#6B6B5A" strokeWidth="1.5" />
      <path d="M4 9 Q9 4 14 9" stroke="#6B6B5A" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

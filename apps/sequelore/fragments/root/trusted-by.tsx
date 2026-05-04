"use client";

import React from "react";
import styled from "styled-components";
import {
  RiLayoutGridFill,
  RiTriangleFill,
  RiLinksLine,
  RiFileTextFill,
  RiGithubFill,
  RiSlackFill,
  RiNotionFill,
} from "@remixicon/react";

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

const LOGOS = [
  { name: "Lattice", icon: <Lattice /> },
  { name: "Vercel", icon: <RiTriangleFill /> },
  { name: "Linear", icon: <Linear /> },
  { name: "Notion", icon: <RiNotionFill /> },
  { name: "GitHub", icon: <RiGithubFill /> },
  { name: "Slack", icon: <RiSlackFill /> },
];

function TrustedBy() {
  return (
    <Section>
      <Label>Trusted by modern teams at</Label>
      <LogoRow>
        {LOGOS.map(({ name, icon }) => (
          <LogoItem key={name}>
            {icon}
            {name}
          </LogoItem>
        ))}
      </LogoRow>
    </Section>
  );
}

const Section = styled.section`
  padding: 4rem 6rem;
  background: #f5f0e8;
  border-top: 1px solid #d4ccba;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const Label = styled.p`
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6b6b5a;
  margin-bottom: 2rem;
  font-family: "DM Sans", sans-serif;
`;

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

export default TrustedBy;

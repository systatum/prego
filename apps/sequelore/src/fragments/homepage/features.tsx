"use client";

import React from "react";
import styled, { css } from "styled-components";
import MigrateIllustration from "./section/migrate-illustration";
import QueryIllustration from "./section/query-illustration";
import DesignModelIllustration from "./section/design-model-illustration";
import {
  RiCodeBoxLine,
  RiDatabase2Line,
  RiUploadCloud2Line,
} from "@remixicon/react";
import { BulletList, Text } from "@/fragments/layout/typography";
import { Container } from "@/fragments/layout/container";
import { applyId } from "../../../../../packages/components/tools/apply-id";

export function Features() {
  const FEATURES: FeatureSectionProps[] = [
    {
      id: applyId("design-model"),
      number: "1",
      icon: <RiDatabase2Line />,
      title: "Design your data model",
      description:
        "Visually model your database with an intuitive drag-and-drop editor. Create tables, define relationships, and customize constraints with ease.",
      bullets: [
        "Visual schema designer",
        "Smart relationship detection",
        "Support for SQL, JSON & more",
      ],
      illustration: <DesignModelIllustration />,
      reverse: false,
    },
    {
      id: applyId("query-explore"),
      number: "2",
      icon: <RiCodeBoxLine />,
      title: "Query and explore with confidence",
      description:
        "Write, run, and optimize queries in a powerful SQL editor with autocomplete, syntax highlighting, and real-time results.",
      bullets: [
        "Auto-complete & error detection",
        "Query history & saved snippets",
        "Real-time results and performance insights",
      ],
      illustration: <QueryIllustration />,
      reverse: true,
    },
    {
      id: applyId("migrate-deploy"),
      number: "3",
      icon: <RiUploadCloud2Line />,
      title: "Migrate and deploy seamlessly",
      description:
        "Manage migrations with version control, preview changes, and deploy to any environment with confidence.",
      bullets: ["Versioned migrations", "Safe rollbacks", "CI/CD friendly"],
      illustration: <MigrateIllustration />,
      reverse: false,
    },
  ];
  return FEATURES.map((feature) => (
    <FeatureSection key={feature.number} {...feature} />
  ));
}

interface FeatureSectionProps {
  id?: string;
  number: string;
  icon?: React.ReactNode;
  title: string;
  description: string;
  bullets?: string[];
  illustration: React.ReactNode;
  reverse?: boolean;
}

function FeatureSection({
  id,
  number,
  icon,
  title,
  description,
  bullets = [],
  illustration,
  reverse = false,
}: FeatureSectionProps) {
  return (
    <Container.Section
      id={id}
      reverse={reverse}
      styles={{
        self: css`
          margin-left: 0px;
          margin-right: 0px;
        `,
      }}
    >
      <Container.Section.Inner
        reverse={reverse}
        styles={{
          self: css`
            width: 100%;
            @media (max-width: 1080px) {
              flex-direction: column;
            }
          `,
        }}
      >
        <TextBlock>
          {icon && <IconBadge>{icon}</IconBadge>}
          <Text.H2>
            {number}. {title}
          </Text.H2>
          <Text
            styles={{
              self: css`
                font-size: 1rem;
                line-height: 1.7;
              `,
            }}
          >
            {description}
          </Text>

          <BulletList>
            {bullets.map((bullet) => (
              <BulletList.Item key={bullet}>
                <Checkmark>
                  <CheckSVG />
                </Checkmark>
                {bullet}
              </BulletList.Item>
            ))}
          </BulletList>
        </TextBlock>

        {illustration}
      </Container.Section.Inner>
    </Container.Section>
  );
}

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const IconBadge = styled.div`
  width: 44px;
  height: 44px;
  background: #e8f0ea;
  border: 1.5px solid #c0d8c4;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: #2c5f3f;
`;

const Checkmark = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #e8f0ea;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const CheckSVG: React.FC = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path
      d="M2 5l2 2 4-4"
      stroke="#2C5F3F"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

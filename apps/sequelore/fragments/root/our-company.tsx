"use client";

import { Container } from "@/components/layout/container";
import { Text } from "@/components/layout/typography";
import { play } from "@/fonts";
import { SystatumImage } from "@/public/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import styled, { css } from "styled-components";
import { applyId } from "../../../../packages/components/tools/apply-id";

export function OurCompany() {
  const router = useRouter();

  return (
    <Container.Section
      id={applyId("our-company")}
      styles={{
        self: css`
          background: #f5f0e8;
          flex-direction: column;
          gap: 30px;
        `,
      }}
    >
      <Text.Label>Built by</Text.Label>
      <Container.Section.Inner
        onClick={() => {
          router.push("https://systatum.com");
        }}
        styles={{
          self: css`
            gap: 24px;
            justify-content: center;
            cursor: pointer;
          `,
        }}
      >
        <Image width={60} src={SystatumImage} alt="our company - systatum" />
        <Text.H2
          styles={{
            self: css`
              font-size: 48px;
              color: #6b6b5a;
            `,
          }}
        >
          Systatum
        </Text.H2>
      </Container.Section.Inner>
    </Container.Section>
  );
}

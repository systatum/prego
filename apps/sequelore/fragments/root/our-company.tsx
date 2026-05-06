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
          background: white;
          flex-direction: column;
          gap: 30px;
          padding: 40px;
        `,
      }}
    >
      <Container.Section.Inner
        onClick={() => {
          router.push("https://systatum.com");
        }}
        styles={{
          self: css`
            gap: 24px;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          `,
        }}
      >
        <Image
          style={{
            marginTop: "4px",
          }}
          width={60}
          src={SystatumImage}
          alt="our company - systatum"
        />
        <Text.H2
          styles={{
            self: css`
              font-size: 48px;
              color: black;
              font-family: "MontHeavy", sans-serif;
              @media (max-width: 640px) {
                font-size: 40px;
              }
            `,
          }}
        >
          systatum.com
        </Text.H2>
      </Container.Section.Inner>
    </Container.Section>
  );
}

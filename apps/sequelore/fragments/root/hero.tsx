"use client";

import { Container } from "@/components/layout/container";
import { Text } from "@/components/layout/typography";
import { HeroBackground } from "@/public/assets";
import { Button } from "@systatum/coneto/button";
import Image from "next/image";
import styled, { css, CSSProp } from "styled-components";
import {
  RiShieldCheckLine,
  RiStackLine,
  RiCodeSSlashLine,
} from "@remixicon/react";

export function Hero() {
  const TITLE_CONTENT = [
    { caption: "Your data.", color: "#446F53" },
    { caption: "Structured.", color: "#446F53" },
    { caption: "Effortless.", color: "#7B6A5C" },
  ];

  return (
    <Container
      styles={{
        self: css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 4rem;

          @media (max-width: 768px) {
            padding-left: 20px;
            padding-right: 20px;
          }

          @media (max-width: 640px) {
            padding: 80px 0px;
            flex-direction: column;
          }
        `,
      }}
    >
      <HeroContent
        $style={css`
          width: 70%;
          @media (max-width: 640px) {
            width: 100%;
            justify-content: center;
            align-items: center;
          }
        `}
      >
        <NewBadge href="#">
          ✦ <span>New</span> Sequelore 2.0 is now in beta →
        </NewBadge>
        {TITLE_CONTENT?.map((content) => (
          <Text.H1
            styles={{
              self: css`
                color: ${content?.color};
              `,
            }}
          >
            {content?.caption}
          </Text.H1>
        ))}

        <Text
          styles={{
            self: css`
              max-width: 300px;
              @media (max-width: 800px) {
                max-width: 240px;
              }
              @media (max-width: 640px) {
                text-align: center;
                max-width: 400px;
              }
            `,
          }}
        >
          Sequelore is the modern database platform for building, scaling, and
          shipping products with confidence.
        </Text>

        <Button variant="success">Download</Button>

        <TrustBadges>
          <TrustBadge>
            <RiShieldCheckLine size={16} />
            Secure by design
          </TrustBadge>
          <TrustBadge>
            <RiStackLine size={16} />
            Built for scale
          </TrustBadge>
          <TrustBadge>
            <RiCodeSSlashLine size={16} />
            Developer friendly
          </TrustBadge>
        </TrustBadges>
      </HeroContent>

      <HeroContent
        $style={css`
          position: absolute;
          max-width: 600px;
          right: -70px;
          top: 50%;
          transform: translateY(-50%);
          padding-top: 50px;
          padding-right: 0;

          @media (max-width: 800px) {
            max-width: 500px;
          }

          @media (max-width: 640px) {
            right: 0px;
            position: relative;
            transform: translateY(0);
          }
        `}
      >
        <Image
          src={HeroBackground}
          style={{
            width: "100%",
            height: "100%",
          }}
          alt="image application for sequelore"
        />
      </HeroContent>
    </Container>
  );
}

const HeroContent = styled.div<{ $style?: CSSProp }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  ${({ $style }) => $style}
`;

const NewBadge = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.75rem;
  background: #e8f0ea;
  border: 1px solid #d4ccba;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #2c5f3f;
  cursor: pointer;
  width: fit-content;
  transition: background 0.2s;

  &:hover {
    background: #d4e8d8;
  }

  span {
    color: #c17f3b;
  }
`;

const TrustBadges = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 640px) {
    justify-content: center;
  }
`;

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  color: #6b6b5a;
`;

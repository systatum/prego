"use client";

import { Container } from "@/components/layout/container";
import { BulletList, Text } from "@/components/layout/typography";
import { HeroBackground } from "@/public/assets";
import { Button } from "@systatum/coneto/button";
import Image from "next/image";
import styled, { css, CSSProp } from "styled-components";
import {
  RiShieldCheckLine,
  RiStackLine,
  RiCodeSSlashLine,
} from "@remixicon/react";
import { Badge } from "@systatum/coneto/badge";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const DB_LABELS = [
  { caption: "PostgreSQL", color: "#446F53" },
  { caption: "MySQL", color: "#7B6A5C" },
];

export function Hero() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShown((prev) => (prev + 1) % DB_LABELS.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const current = DB_LABELS[shown];

  return (
    <Container.Section
      styles={{
        self: css`
          @media (max-width: 768px) {
            padding: 80px 20px;
          }
          overflow: hidden;
        `,
      }}
    >
      <Container.Section.Inner
        styles={{
          self: css`
            width: 100%;
            @media (max-width: 768px) {
              flex-direction: column;
            }
          `,
        }}
      >
        <HeroContent
          $style={css`
            width: 70%;
            @media (max-width: 768px) {
              width: 100%;
              justify-content: center;
              align-items: center;
            }
          `}
        >
          <NewBadge href="#">
            <Badge
              caption="✦ New"
              backgroundColor="#627D68"
              textColor="white"
              styles={{
                self: css`
                  border-radius: 20px;
                  height: 28px;
                  cursor: pointer;
                `,
              }}
            />
            <span style={{ paddingRight: "0.7rem" }}>
              Sequelore 2.0 is now in beta →
            </span>
          </NewBadge>

          <Text.H1
            styles={{
              self: css`
                font-size: clamp(1.75rem, 3vw, 2.5rem);
                display: flex;
                flex-wrap: wrap;
                gap: 0.3em;
                flex-direction: column;
                font-size: 36px;
                @media (max-width: 768px) {
                  justify-content: center;
                  align-items: center;
                }
              `,
            }}
          >
            <span>You never used a</span>

            <RotatingWrapper aria-live="polite" aria-atomic="true">
              <AnimatePresence mode="wait">
                <motion.span
                  key={current.caption}
                  style={{
                    color: current.color,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  {current.caption}
                </motion.span>
              </AnimatePresence>
            </RotatingWrapper>

            <span>database studio</span>
            <span>this good.</span>
          </Text.H1>

          <Text
            styles={{
              self: css`
                max-width: 300px;
                @media (max-width: 800px) {
                  max-width: 240px;
                }
                @media (max-width: 768px) {
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

          <BulletList
            styles={{
              self: css`
                display: flex;
                align-items: center;
                gap: 1.5rem;
                flex-direction: row;
                flex-wrap: wrap;

                @media (max-width: 768px) {
                  justify-content: center;
                }
              `,
            }}
          >
            <BulletList.Item color="#6b6b5a">
              <RiShieldCheckLine size={16} />
              Secure by design
            </BulletList.Item>
            <BulletList.Item color="#6b6b5a">
              <RiStackLine size={16} />
              Built for scale
            </BulletList.Item>
            <BulletList.Item color="#6b6b5a">
              <RiCodeSSlashLine size={16} />
              Developer friendly
            </BulletList.Item>
          </BulletList>
        </HeroContent>

        <HeroContent
          $style={css`
            position: absolute;
            max-width: 800px;
            right: 0px;
            top: 50%;
            transform: translateX(40px) translateY(-50%);
            padding-top: 50px;
            padding-right: 0;

            @media (max-width: 1280px) {
              max-width: 700px;
              transform: translateX(70px) translateY(-50%);
            }

            @media (max-width: 1080px) {
              transform: translateX(150px) translateY(-50%);
            }

            @media (max-width: 840px) {
              transform: translateX(100px) translateY(-50%);

              max-width: 500px;
            }

            @media (max-width: 768px) {
              transform: translateX(0px) translateY(-50%);
              max-width: 600px;
              position: relative;
              transform: translateY(0);
            }
          `}
        >
          <Image
            src={HeroBackground}
            style={{ width: "100%", height: "100%" }}
            alt="image application for sequelore"
          />
        </HeroContent>
      </Container.Section.Inner>
    </Container.Section>
  );
}

const RotatingWrapper = styled.span`
  display: flex;
  position: relative;
  width: 100%;
  height: 1.2em;

  @media (max-width: 768px) {
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

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

  &:hover [aria-label="badge"] {
    background-color: #4f6656;
    transition: all 0.2s ease;
  }
`;

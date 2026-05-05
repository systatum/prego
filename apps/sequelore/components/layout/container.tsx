"use client";

import { ReactNode } from "react";
import styled, { css, CSSProp } from "styled-components";

interface InnerProps {
  $reverse?: boolean;
  $style?: CSSProp;
}

function Container({
  styles,
  children,
}: {
  styles?: { self?: CSSProp };
  children?: ReactNode;
}) {
  return <BaseContainer $style={styles?.self}>{children}</BaseContainer>;
}

const BaseContainer = styled.div<{ $style?: CSSProp }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  position: relative;

  @media (max-width: 840px) {
    gap: 0px;
  }

  ${({ $style }) => $style}
`;

function Section({
  styles,
  children,
  reverse = false,
  id,
}: {
  styles?: { self?: CSSProp };
  children?: ReactNode;
  reverse?: boolean;
  id?: string;
}) {
  return (
    <BaseSection id={id} $reverse={reverse} $style={styles?.self}>
      {children}
    </BaseSection>
  );
}

const BaseSection = styled.section<InnerProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4rem;
  position: relative;

  ${({ $reverse }) =>
    $reverse &&
    css`
      backdrop-filter: brightness(0.96) saturate(0.9);
    `}

  @media (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  @media (max-width: 640px) {
    padding: 80px 30px;
    flex-direction: column;
  }

  ${({ $style }) => $style}
`;

function Inner({
  styles,
  children,
  reverse = false,
}: {
  styles?: { self?: CSSProp };
  children?: ReactNode;
  reverse?: boolean;
}) {
  return (
    <BaseInner $reverse={reverse} $style={styles?.self}>
      {children}
    </BaseInner>
  );
}

const BaseInner = styled.div<InnerProps>`
  margin: 0 auto;
  gap: 4rem;
  align-items: center;
  max-width: 1280px;
  display: flex;
  flex-direction: row;
  position: relative;

  ${({ $reverse }) =>
    $reverse &&
    css`
      direction: rtl;
      > * {
        direction: ltr;
      }
    `}

  @media (max-width: 640px) {
    flex-direction: column;
  }

  ${({ $style }) => $style}
`;

Container.Section = Section;
Section.Inner = Inner;

export { Container };

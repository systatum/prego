"use client";

import { HTMLAttributes, ReactNode } from "react";
import styled, { css, CSSProp } from "styled-components";

interface InnerProps {
  $reverse?: boolean;
  $style?: CSSProp;
}

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  styles?: { self?: CSSProp };
  children?: ReactNode;
}

function Container({ styles, children, ...props }: ContainerProps) {
  return (
    <BaseContainer $style={styles?.self} {...props}>
      {children}
    </BaseContainer>
  );
}

const BaseContainer = styled.div<{ $style?: CSSProp }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  position: relative;

  ${({ $style }) => $style}
`;

interface SectionProps extends HTMLAttributes<HTMLElement> {
  styles?: { self?: CSSProp };
  children?: ReactNode;
  reverse?: boolean;
}

function Section({
  styles,
  children,
  reverse = false,
  ...props
}: SectionProps) {
  return (
    <BaseSection $reverse={reverse} $style={styles?.self} {...props}>
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
    padding: 60px 30px;
    flex-direction: column;
  }

  ${({ $style }) => $style}
`;

interface InnerComponentProps extends HTMLAttributes<HTMLDivElement> {
  styles?: { self?: CSSProp };
  children?: ReactNode;
  reverse?: boolean;
}

function Inner({
  styles,
  children,
  reverse = false,
  ...props
}: InnerComponentProps) {
  return (
    <BaseInner $reverse={reverse} $style={styles?.self} {...props}>
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

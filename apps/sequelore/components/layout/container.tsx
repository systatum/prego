"use client";

import { ReactNode } from "react";
import styled, { CSSProp } from "styled-components";

export function Container({
  styles,
  children,
}: {
  styles?: { self?: CSSProp };
  children?: ReactNode;
}) {
  return <Wrapper $style={styles?.self}>{children}</Wrapper>;
}

const Wrapper = styled.div<{ $style?: CSSProp }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  position: relative;

  ${({ $style }) => $style}
`;

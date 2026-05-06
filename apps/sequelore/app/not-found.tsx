"use client";

import { Container } from "@/components/layout/container";
import { ErrorSlate, ErrorSlateProps } from "@systatum/coneto/error-slate";
import { css } from "styled-components";

export default function NotFound({
  title = "Page not found",
  children = "Lost, this page is. In another system, it may be.",
  code = "404",
}: ErrorSlateProps) {
  return (
    <Container
      styles={{
        self: css`
          min-height: 100vh;
          justify-content: center;
          align-items: center;
        `,
      }}
    >
      <ErrorSlate
        styles={{
          cubeFaceStyle: css`
            border-color: #1d3b28;
            background-color: #2c5f3f;
          `,
        }}
        code={code}
        title={title}
      >
        {children}
      </ErrorSlate>
    </Container>
  );
}

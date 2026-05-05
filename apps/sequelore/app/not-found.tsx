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
      <ErrorSlate code={code} title={title}>
        {children}
      </ErrorSlate>
    </Container>
  );
}

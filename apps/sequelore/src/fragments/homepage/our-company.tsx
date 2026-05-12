import { Text } from "./../../../../../packages/components/layout/typography";
import { Container } from "./../../../../../packages/components/layout/container";
import { navigate } from "gatsby";
import React from "react";
import { css } from "styled-components";
import { applyId } from "../../../../../packages/components/tools/apply-id";

export function OurCompany() {
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
          navigate("https://systatum.com");
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
        <img
          style={{
            marginTop: "4px",
          }}
          width={60}
          height={60}
          src={"assets/systatum_256.png"}
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

import styled, { CSSProp } from "styled-components";

type TypographyProps = {
  styles?: {
    self?: CSSProp;
  };
};

function H1({ children, styles }: React.PropsWithChildren<TypographyProps>) {
  return <H1Base $style={styles?.self}>{children}</H1Base>;
}

const H1Base = styled.h1<{ $style?: CSSProp }>`
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;

  ${({ $style }) => $style}
`;

function H2({ children, styles }: React.PropsWithChildren<TypographyProps>) {
  return <H2Base $style={styles?.self}>{children}</H2Base>;
}

const H2Base = styled.h2<{ $style?: CSSProp }>`
  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;
  margin: 0;

  ${({ $style }) => $style}
`;

function H3({ children, styles }: React.PropsWithChildren<TypographyProps>) {
  return <H3Base $style={styles?.self}>{children}</H3Base>;
}

const H3Base = styled.h3<{ $style?: CSSProp }>`
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  margin: 0;

  ${({ $style }) => $style}
`;

function Text({ children, styles }: React.PropsWithChildren<TypographyProps>) {
  return <TextBase $style={styles?.self}>{children}</TextBase>;
}

const TextBase = styled.p<{ $style?: CSSProp }>`
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  margin: 0;

  ${({ $style }) => $style}
`;

Text.H1 = H1;
Text.H2 = H2;
Text.H3 = H3;

export { Text };

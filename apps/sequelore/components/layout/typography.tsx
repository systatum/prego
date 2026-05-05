import styled, { CSSProp } from "styled-components";

type TypographyProps = {
  styles?: {
    self?: CSSProp;
  };
  color?: string;
};

function H1({
  children,
  styles,
  color,
}: React.PropsWithChildren<TypographyProps>) {
  return (
    <H1Base $color={color} $style={styles?.self}>
      {children}
    </H1Base>
  );
}

const H1Base = styled.h1<{ $style?: CSSProp; $color?: string }>`
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
  font-family: "Lora", Georgia, serif;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  line-height: 1.2;
  font-weight: 700;
  color: ${({ $color }) => $color ?? "#2c5f3f"};

  ${({ $style }) => $style}
`;

function H2({
  children,
  styles,
  color,
}: React.PropsWithChildren<TypographyProps>) {
  return (
    <H2Base $style={styles?.self} $color={color}>
      {children}
    </H2Base>
  );
}

const H2Base = styled.h2<{ $style?: CSSProp; $color?: string }>`
  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;
  margin: 0;
  font-family: "Lora", Georgia, serif;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  line-height: 1.2;
  font-weight: 700;

  color: ${({ $color }) => $color ?? "#2c5f3f"};

  ${({ $style }) => $style}
`;

function H3({
  children,
  styles,
  color,
}: React.PropsWithChildren<TypographyProps>) {
  return (
    <H3Base $style={styles?.self} color={color}>
      {children}
    </H3Base>
  );
}

const H3Base = styled.h3<{ $style?: CSSProp; $color?: string }>`
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  margin: 0;
  font-family: "Lora", Georgia, serif;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  line-height: 1.2;
  font-weight: 700;
  color: ${({ $color }) => $color ?? "#2c5f3f"};

  ${({ $style }) => $style}
`;

function Text({
  children,
  styles,
  color,
}: React.PropsWithChildren<TypographyProps>) {
  return (
    <TextBase $style={styles?.self} $color={color}>
      {children}
    </TextBase>
  );
}

const TextBase = styled.p<{ $style?: CSSProp; $color?: string }>`
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  margin: 0;
  color: ${({ $color }) => $color ?? "#2c5f3f"};

  ${({ $style }) => $style}
`;

function Label({
  children,
  styles,
  color,
}: React.PropsWithChildren<TypographyProps>) {
  return (
    <BaseLabel $style={styles?.self} $color={color}>
      {children}
    </BaseLabel>
  );
}

const BaseLabel = styled.label<{ $style?: CSSProp; $color?: string }>`
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6b6b5a;
  font-family: "DM Sans", sans-serif;
`;

function BulletList({
  children,
  styles,
  color,
}: React.PropsWithChildren<TypographyProps>) {
  return (
    <BulletListBase $color={color} $style={styles?.self}>
      {children}
    </BulletListBase>
  );
}

const BulletListBase = styled.ul<{ $style?: CSSProp; $color?: string }>`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  color: ${({ $color }) => $color ?? "#2c5f3f"};

  ${({ $style }) => $style}
`;

function BulletListItem({
  children,
  styles,
  color,
}: React.PropsWithChildren<TypographyProps>) {
  return (
    <BulletListItemBase $color={color} $style={styles?.self}>
      {children}
    </BulletListItemBase>
  );
}

const BulletListItemBase = styled.li<{ $style?: CSSProp; $color?: string }>`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ $color }) => $color ?? "#2c5f3f"};

  ${({ $style }) => $style}
`;

Text.H1 = H1;
Text.H2 = H2;
Text.H3 = H3;
Text.Label = Label;

BulletList.Item = BulletListItem;

export { Text, BulletList };

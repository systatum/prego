import React from "react";
import styled from "styled-components";

interface TableField {
  name: string;
  badge?: "PK" | "FK";
}

interface TableConfig {
  x: number;
  y: number;
  width: number;
  title: string;
  fields: TableField[];
}

const tables: TableConfig[] = [
  {
    x: 68,
    y: 60,
    width: 120,
    title: "users",
    fields: [
      { name: "id", badge: "PK" },
      { name: "name" },
      { name: "email" },
      { name: "created_at" },
    ],
  },
  {
    x: 260,
    y: 48,
    width: 120,
    title: "orders",
    fields: [
      { name: "id", badge: "PK" },
      { name: "user_id", badge: "FK" },
      { name: "status" },
      { name: "total" },
    ],
  },
  {
    x: 260,
    y: 228,
    width: 130,
    title: "order_items",
    fields: [{ name: "id" }, { name: "order_id" }, { name: "product_id" }],
  },
  {
    x: 68,
    y: 228,
    width: 110,
    title: "products",
    fields: [{ name: "id" }, { name: "name" }, { name: "price" }],
  },
];

interface TableCardProps {
  cfg: TableConfig;
}

const DbTable: React.FC<TableCardProps> = ({ cfg }) => {
  const { x, y, width, title, fields } = cfg;
  const headerH = 32;
  const rowH = 27;
  const totalH = headerH + fields.length * rowH + 4;

  return (
    <>
      <TableCard x={x} y={y} width={width} height={totalH} rx="8" />
      <TableHeader x={x} y={y} width={width} height={headerH} rx="8" />
      {/* fill bottom half of rounded rect */}
      <TableHeader x={x} y={y + 16} width={width} height={16} />
      <TableHeaderText x={x + width / 2} y={y + 21}>
        {title}
      </TableHeaderText>
      <TableHeaderDivider
        x1={x}
        y1={y + headerH}
        x2={x + width}
        y2={y + headerH}
      />

      {fields.map(({ name, badge }, i) => {
        const ry = y + headerH + i * rowH;
        const isEven = i % 2 === 0;
        const textY = ry + 18;

        return (
          <React.Fragment key={name}>
            {isEven ? (
              <TableRowEven x={x + 2} y={ry} width={width - 4} height={rowH} />
            ) : (
              <TableRowOdd x={x + 2} y={ry} width={width - 4} height={rowH} />
            )}
            <FieldText x={x + 14} y={textY}>
              {name}
            </FieldText>
            {badge === "PK" && (
              <BadgePK x={x + width - 8} y={textY}>
                PK
              </BadgePK>
            )}
            {badge === "FK" && (
              <BadgeFK x={x + width - 8} y={textY}>
                FK
              </BadgeFK>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

const DesignModelIllustration: React.FC = () => (
  <SvgRoot
    viewBox="0 0 520 360"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Visual database schema designer"
  >
    <defs>
      <marker
        id="arrow"
        markerWidth="6"
        markerHeight="6"
        refX="3"
        refY="3"
        orient="auto"
      >
        <path d="M0,0 L6,3 L0,6 Z" fill="#c17f3b" />
      </marker>
      <pattern
        id="gridPattern"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M 20 0 L 0 0 0 20"
          fill="none"
          stroke="#d4ccba"
          strokeWidth="0.5"
        />
      </pattern>
    </defs>

    {/* Background */}
    <Background width="520" height="360" rx="24" />
    <rect
      width="520"
      height="360"
      rx="16"
      fill="url(#gridPattern)"
      opacity="0.4"
    />

    {/* Window */}
    <Window x="0" y="0" width="520" height="360" rx="24" />
    <circle cx="30" cy="20" r="5" fill="#e8b4a0" />
    <circle cx="46" cy="20" r="5" fill="#e8d4a0" />
    <circle cx="62" cy="20" r="5" fill="#a0c8a0" />
    <Divider x="0" y="40" width="520" height="1" />

    {/* Left sidebar icons */}
    <IconButtonActive x="20" y="55" width="28" height="28" rx="6" />
    <rect
      x="26"
      y="61"
      width="16"
      height="16"
      rx="3"
      fill="none"
      stroke="#2c5f3f"
      strokeWidth="1.5"
    />

    <IconButton x="20" y="91" width="28" height="28" rx="6" />
    <path
      d="M28 105 L40 105 M34 99 L34 111"
      stroke="#6b6b5a"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    <IconButton x="20" y="127" width="28" height="28" rx="6" />
    <circle
      cx="34"
      cy="141"
      r="6"
      fill="none"
      stroke="#6b6b5a"
      strokeWidth="1.5"
    />

    <IconButton x="20" y="163" width="28" height="28" rx="6" />
    <path
      d="M27 177 L41 177 M27 173 L41 173 M27 181 L36 181"
      stroke="#6b6b5a"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Tables */}
    {tables.map((cfg) => (
      <DbTable key={cfg.title} cfg={cfg} />
    ))}

    {/* Relationship lines */}
    <RelationPath d="M188 130 Q224 130 260 100" markerEnd="url(#arrow)" />
    <RelationPath d="M320 198 L320 228" markerEnd="url(#arrow)" />
    <RelationPath d="M178 283 Q219 283 260 298" markerEnd="url(#arrow)" />

    {/* Tooltip */}
    <TooltipBox x="370" y="130" width="110" height="36" rx="6" />
    <TooltipText x="425" y="146">
      Smart relationship
    </TooltipText>
    <TooltipSub x="425" y="159">
      detected ✓
    </TooltipSub>
    <path d="M376 148 L368 148 L376 152 Z" fill="#2c5f3f" />
  </SvgRoot>
);

const SvgRoot = styled.svg`
  width: 100%;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
`;

const Background = styled.rect`
  fill: #fdfaf4;
`;

const Window = styled.rect`
  fill: #f5f0e8;
  stroke: #d4ccba;
  stroke-width: 1.5;
`;

const Divider = styled.rect`
  fill: #d4ccba;
`;

// Toolbar icon buttons
const IconButton = styled.rect`
  fill: #f5f0e8;
`;

const IconButtonActive = styled.rect`
  fill: #e8f0ea;
`;

// Table card
const TableCard = styled.rect<{ borderColor?: string }>`
  fill: #ffffff;
  stroke: ${({ borderColor }) => borderColor ?? "#2c5f3f"};
  stroke-width: 1.5;
`;

const TableHeader = styled.rect`
  fill: #2c5f3f;
`;

const TableHeaderText = styled.text`
  fill: #ffffff;
  font-size: 12px;
  font-family: "DM Sans", sans-serif;
  font-weight: 600;
  text-anchor: middle;
`;

const TableHeaderDivider = styled.line`
  stroke: #e8f0ea;
  stroke-width: 1;
`;

const TableRowEven = styled.rect`
  fill: #f9fbf9;
`;

const TableRowOdd = styled.rect`
  fill: #ffffff;
`;

const FieldText = styled.text`
  fill: #1c1c1c;
  font-size: 11px;
  font-family: "JetBrains Mono", monospace;
`;

const BadgePK = styled.text`
  fill: #c17f3b;
  font-size: 9px;
  font-family: "DM Sans", sans-serif;
  font-weight: 600;
  text-anchor: end;
`;

const BadgeFK = styled.text`
  fill: #7ba3c7;
  font-size: 9px;
  font-family: "DM Sans", sans-serif;
  font-weight: 600;
  text-anchor: end;
`;

const RelationPath = styled.path`
  fill: none;
  stroke: #c17f3b;
  stroke-width: 1.5;
  stroke-dasharray: 5 3;
`;

// Tooltip
const TooltipBox = styled.rect`
  fill: #2c5f3f;
`;

const TooltipText = styled.text`
  fill: #ffffff;
  font-size: 10px;
  font-family: "DM Sans", sans-serif;
  text-anchor: middle;
`;

const TooltipSub = styled.text`
  fill: #a8d4b4;
  font-size: 10px;
  font-family: "DM Sans", sans-serif;
  text-anchor: middle;
`;

export default DesignModelIllustration;

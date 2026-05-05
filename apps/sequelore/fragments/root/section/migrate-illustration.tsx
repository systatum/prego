import { Button } from "@systatum/coneto/button";
import React from "react";
import styled, { css, keyframes } from "styled-components";

interface Migration {
  name: string;
  done: boolean;
}

const migrations: Migration[] = [
  { name: "2024_05_12_create_users_table", done: true },
  { name: "2024_05_12_create_orders_table", done: true },
  { name: "2024_05_12_create_products_table", done: true },
  { name: "2024_05_12_create_order_items", done: true },
  { name: "2024_05_13_add_index_to_users", done: true },
  { name: "2024_05_14_add_stripe_columns", done: false },
];

const codeLines: { color: string; text: string }[] = [
  { color: "#e8d4a0", text: "create table users {" },
  { color: "#8ec8e8", text: "  id uuid primary key," },
  { color: "#8ec8e8", text: "  name text not null," },
  { color: "#8ec8e8", text: "  email text unique," },
  { color: "#8ec8e8", text: "  created_at timestamp" },
  { color: "#a8d4b4", text: "  default now()," },
  { color: "#e8d4a0", text: "};" },
];

const MigrateIllustration: React.FC = () => (
  <Wrapper>
    <TitleBar>
      <TrafficDot color="#e8b4a0" />
      <TrafficDot color="#e8d4a0" />
      <TrafficDot color="#a0c8a0" />
      <TitleLabel>Migrations</TitleLabel>
    </TitleBar>

    <Body>
      <LeftPanel>
        <PanelTitle>Migration history</PanelTitle>
        <MigrationList>
          {migrations.map(({ name, done }) => (
            <MigrationRow key={name} $pending={!done}>
              <RowInfo>
                <MigrationName $pending={!done}>{name}</MigrationName>
                <MigrationStatus>
                  {done ? "Applied" : "Pending"}
                </MigrationStatus>
              </RowInfo>
              <StatusBadge $done={done}>
                {done ? <CheckMark>✓</CheckMark> : <PendingDot />}
              </StatusBadge>
            </MigrationRow>
          ))}
        </MigrationList>
      </LeftPanel>

      <RightPanel>
        <CodePreview>
          <CodeHeader>Preview</CodeHeader>
          <CodeBody>
            {codeLines.map(({ color, text }, i) => (
              <CodeLine key={i} $color={color}>
                {text}
              </CodeLine>
            ))}
          </CodeBody>
        </CodePreview>
        <Button
          styles={{
            containerStyle: css`
              width: 100%;
            `,
            self: css`
              border-radius: 8px;
              width: 100%;

              background-color: #2c5f3f;
              &:hover {
                background-color: #326c47;
              }
              &:active {
                background-color: #234c32;
              }
            `,
          }}
          variant="success"
          pressed
        >
          Deploy to production
        </Button>
      </RightPanel>
    </Body>
  </Wrapper>
);

const pulse = keyframes`
  0%, 100% { opacity: 0.7; }
  50%       { opacity: 0.2; }
`;

const Wrapper = styled.div`
  width: 100%;
  aspect-ratio: 520 / 360;
  background: #f5f0e8;
  border-radius: 12px;
  border: 1.5px solid #d4ccba;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: "DM Sans", sans-serif;
  border-radius: 24px;
`;

const TitleBar = styled.div`
  height: 42px;
  background: #f5f0e8;
  border-bottom: 1.5px solid #d4ccba;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 8px;
  flex-shrink: 0;
`;

const TrafficDot = styled.span<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ color }) => color};
  flex-shrink: 0;
`;

const TitleLabel = styled.span`
  flex: 1;
  text-align: center;
  font-size: 11px;
  color: #6b6b5a;
  letter-spacing: 0.02em;
  margin-right: 28px;
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  gap: 12px;
  padding: 12px;
  overflow: hidden;
`;

//  Left Panel

const LeftPanel = styled.div`
  flex: 1;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #d4ccba;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const PanelTitle = styled.div`
  padding: 10px 14px 8px;
  font-size: 12px;
  font-weight: 700;
  color: #1c1c1c;
  border-bottom: 1px solid #f0ebe0;
`;

const MigrationList = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const MigrationRow = styled.div<{ $pending?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px;
  border-bottom: 1px solid #f0ebe0;
  background: ${({ $pending }) => ($pending ? "#fff8f0" : "transparent")};
  flex: 1;
`;

const RowInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const MigrationName = styled.div<{ $pending?: boolean }>`
  font-size: 10px;
  font-family: "JetBrains Mono", monospace;
  color: ${({ $pending }) => ($pending ? "#c17f3b" : "#1c1c1c")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MigrationStatus = styled.div`
  font-size: 9px;
  color: #6b6b5a;
  margin-top: 2px;
`;

const StatusBadge = styled.div<{ $done: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${({ $done }) => ($done ? "#e8f0ea" : "#fff0e0")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const CheckMark = styled.span`
  color: #2c5f3f;
  font-size: 11px;
  line-height: 1;
  font-weight: 700;
`;

const PendingDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #c17f3b;
  display: block;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

// ─── Right Panel ──────────────────────────────────────────────────────────────

const RightPanel = styled.div`
  width: 228px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-shrink: 0;
`;

const CodePreview = styled.div`
  flex: 1;
  background: #1a2820;
  border-radius: 8px;
  border: 1px solid #2c5f3f;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const CodeHeader = styled.div`
  padding: 8px 14px;
  font-size: 11px;
  font-weight: 600;
  color: #5aa87a;
  border-bottom: 1px solid #2c5f3f;
`;

const CodeBody = styled.div`
  flex: 1;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
`;

const CodeLine = styled.div<{ $color: string }>`
  font-family: "JetBrains Mono", monospace;
  font-size: 10.5px;
  color: ${({ $color }) => $color};
  line-height: 1.7;
  white-space: pre;
`;

export default MigrateIllustration;

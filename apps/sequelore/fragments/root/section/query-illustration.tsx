import React from "react";
import styled, { keyframes } from "styled-components";

const autocompleteOptions = [
  "interval '1 day'",
  "interval '7 days'",
  "interval '30 days'",
];

const tableHeaders = ["id", "name", "email", "created_at"];

const tableRows = [
  ["1", "Alim Naufal", "alim@systatum.com", "2024-05-12"],
  ["2", "Adam Systatum", "adam@systatum.com", "2024-05-12"],
];

const QueryIllustration: React.FC = () => (
  <Wrapper>
    <TitleBar>
      <TrafficDot color="#c0665a" />
      <TrafficDot color="#c0a85a" />
      <TrafficDot color="#5aa87a" />
      <TitleLabel>SQL Editor — users</TitleLabel>
    </TitleBar>

    <EditorArea>
      <LineNumbers>
        {[1, 2, 3, 4].map((n) => (
          <LineNum key={n}>{n}</LineNum>
        ))}
      </LineNumbers>

      <CodeArea>
        {/* Line 1 */}
        <SqlLine>
          <Token $color="#e8d4a0">SELECT</Token>
          <Token $color="#a8d4b4"> * </Token>
          <Token $color="#e8d4a0">FROM</Token>
          <Token $color="#8ec8e8"> users</Token>
        </SqlLine>

        {/* Line 2 */}
        <SqlLine>
          <Token $color="#e8d4a0">WHERE</Token>
          <Token $color="#a8d4b4"> created_at </Token>
          <Token $color="#e8a0a0">&gt;</Token>
          <Token $color="#e8c87a"> now() </Token>
          <Token $color="#c4c4c4">- </Token>
          <Token $color="#f0a870">interval</Token>
          <Token $color="#b8e8a0"> '7 days'</Token>
        </SqlLine>

        {/* Line 3 */}
        <SqlLine>
          <Token $color="#e8d4a0">ORDER BY</Token>
          <Token $color="#8ec8e8"> id </Token>
          <Token $color="#e8d4a0">DESC</Token>
        </SqlLine>

        {/* Line 4 */}
        <SqlLine>
          <Token $color="#e8d4a0">LIMIT</Token>
          <Token $color="#f0a870"> 100</Token>
          <Token $color="#c4c4c4">;</Token>
          <CursorBlock />
        </SqlLine>

        {/* Autocomplete popup */}
        <AutocompletePopup>
          <AutocompleteHeaderBar>Autocomplete</AutocompleteHeaderBar>
          {autocompleteOptions.map((s, i) => (
            <AutocompleteItem key={s} $active={i === 1}>
              {s}
            </AutocompleteItem>
          ))}
        </AutocompletePopup>
      </CodeArea>
    </EditorArea>

    <ResultsDivider />

    <ResultsPanel>
      <ResultsTopBar>
        <ResultsLabel>RESULTS</ResultsLabel>
        <ResultsMeta>4 rows · 12ms</ResultsMeta>
      </ResultsTopBar>
      <Table>
        <thead>
          <tr>
            {tableHeaders.map((h) => (
              <Th key={h}>{h}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <Td key={ci}>{cell}</Td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <PerfBarWrap>
        <PerfBarBg>
          <PerfBarFill />
        </PerfBarBg>
      </PerfBarWrap>
    </ResultsPanel>
  </Wrapper>
);

const blink = keyframes`
  0%, 100% { opacity: 0.9; }
  50%       { opacity: 0; }
`;

const Wrapper = styled.div`
  width: 100%;
  aspect-ratio: 520 / 360;
  background: #1a2820;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: "DM Sans", sans-serif;
`;

const TitleBar = styled.div`
  height: 42px;
  background: #1e3028;
  border-bottom: 1px solid #2c5f3f;
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
  color: #a8c4b0;
  letter-spacing: 0.02em;
`;

const EditorArea = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
`;

const LineNumbers = styled.div`
  width: 42px;
  padding: 14px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #2c5f3f;
  flex-shrink: 0;
  gap: 0;
`;

const LineNum = styled.span`
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  color: #3d6b4f;
  line-height: 22px;
  height: 22px;
  display: block;
`;

const CodeArea = styled.div`
  flex: 1;
  padding: 14px 16px;
  position: relative;
  overflow: hidden;
`;

// Each SQL line is a flex row of tokens
const SqlLine = styled.div`
  display: flex;
  align-items: center;
  height: 22px;
  position: relative;
`;

const Token = styled.span<{ $color: string }>`
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
  color: ${({ $color }) => $color};
  white-space: pre;
`;

const CursorBlock = styled.span`
  display: inline-block;
  width: 7px;
  height: 14px;
  background: #a8d4b4;
  border-radius: 1px;
  vertical-align: text-bottom;
  animation: ${blink} 1.2s ease-in-out infinite;
`;

//  Autocomplete Popup

const AutocompletePopup = styled.div`
  position: absolute;
  top: 76px;
  left: 114px;
  width: 160px;
  background: #162218;
  border: 1px solid #2c5f3f;
  border-radius: 8px;
  overflow: hidden;
  z-index: 10;
`;

const AutocompleteHeaderBar = styled.div`
  background: #2c5f3f;
  padding: 5px 10px;
  font-size: 10px;
  font-weight: 600;
  color: #ffffff;
`;

const AutocompleteItem = styled.div<{ $active?: boolean }>`
  padding: 4px 10px;
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  color: ${({ $active }) => ($active ? "#ffffff" : "#a8d4b4")};
  background: ${({ $active }) => ($active ? "#2c5f3f" : "transparent")};
  line-height: 18px;
`;

//  Divider

const ResultsDivider = styled.div`
  height: 1px;
  background: #2c5f3f;
  flex-shrink: 0;
`;

// Results Panel

const ResultsPanel = styled.div`
  background: #162218;
  flex-shrink: 0;
  padding: 8px 16px 10px;
`;

const ResultsTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
`;

const ResultsLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #5aa87a;
  letter-spacing: 0.05em;
`;

const ResultsMeta = styled.span`
  font-size: 10px;
  color: #3d6b4f;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  font-weight: 600;
  color: #5aa87a;
  text-align: left;
  padding: 0 0 4px;
  border-bottom: 1px solid rgba(44, 95, 63, 0.5);
`;

const Td = styled.td`
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  color: #c4d4c8;
  padding: 3px 0;
`;

const PerfBarWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 6px;
`;

const PerfBarBg = styled.div`
  width: 100px;
  height: 4px;
  background: #2c5f3f;
  border-radius: 2px;
  overflow: hidden;
`;

const PerfBarFill = styled.div`
  width: 30%;
  height: 100%;
  background: #5aa87a;
  border-radius: 2px;
`;

export default QueryIllustration;

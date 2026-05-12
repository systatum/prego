import * as React from "react";
import { Section } from "../layout/section";
import { LoadingSkeleton } from "@systatum/coneto/loading-skeleton";
import styled, { css } from "styled-components";

export function PostsSkeleton() {
  return (
    <Section className="py-0">
      <LoadingSkeleton
        flashDirection="left-to-right"
        flashRate="normal"
        styles={{
          self: css`
            display: flex;
            flex-direction: column;
            gap: 40px;
            max-width: 560px;
            margin: 0 auto;

            @media (min-width: 768px) {
              max-width: 896px;
            }
          `,
        }}
      >
        {/* Breadcrumb */}
        <LoadingSkeleton.Item
          styles={{
            self: css`
              display: flex;
              gap: 8px;
              width: fit-content;
              margin: 0 auto;
              background: none;
              height: auto;
              flex-direction: row;
              align-items: center;
            `,
          }}
        >
          {[60, 40, 80].map((w, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: 8, alignItems: "center" }}
            >
              <LoadingSkeleton.Item height={12} width={w} />
              {i < 2 && (
                <LoadingSkeleton.Item
                  height={12}
                  width={12}
                  styles={{
                    self: css`
                      border-radius: 50%;
                    `,
                  }}
                />
              )}
            </div>
          ))}
        </LoadingSkeleton.Item>

        {/* Title */}
        <LoadingSkeleton.Item
          height={48}
          width={192}
          styles={{
            self: css`
              margin: 0 auto;
            `,
          }}
        />

        {/* Category badges */}
        <LoadingSkeleton.Item
          styles={{
            self: css`
              display: flex;
              flex-direction: row;
              gap: 8px;
              justify-content: center;
              background: none;
              height: auto;
            `,
          }}
        >
          {[90, 90, 90, 90].map((w, i) => (
            <LoadingSkeleton.Item
              key={i}
              height={28}
              width={w}
              styles={{
                self: css`
                  border-radius: 20px;
                `,
              }}
            />
          ))}
        </LoadingSkeleton.Item>

        <LoadingSkeleton.Item
          styles={{
            self: css`
              display: flex;
              flex-direction: column;
              gap: 12px;
              background: none;
              height: auto;
              width: 100%;
            `,
          }}
        >
          {[60, 50, 70, 55].map((maxWidth, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                width: "100%",
                padding: "2px 8px",
                gap: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 12,
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <LoadingSkeleton.Item
                  height={28}
                  width={96}
                  styles={{
                    self: css`
                      border-radius: 20px;
                      flex-shrink: 0;
                    `,
                  }}
                />
                <LoadingSkeleton.Item
                  height={20}
                  styles={{
                    self: css`
                      flex: 1;
                      max-width: ${maxWidth}%;
                    `,
                  }}
                />
              </div>
              <LoadingSkeleton.Item
                height={20}
                width={80}
                styles={{
                  self: css`
                    flex-shrink: 0;
                  `,
                }}
              />
            </div>
          ))}
        </LoadingSkeleton.Item>
      </LoadingSkeleton>
    </Section>
  );
}

export function PostSkeleton() {
  return (
    <Section className="pt-2 pb-14 px-8">
      <LoadingSkeleton
        flashDirection="left-to-right"
        flashRate="normal"
        styles={{
          self: css`
            display: flex;
            flex-direction: column;
            gap: 40px;
            max-width: 560px;
            margin: 0 auto;

            @media (min-width: 768px) {
              max-width: 896px;
            }
          `,
        }}
      >
        {/* Breadcrumb */}
        <LoadingSkeleton.Item
          styles={{
            self: css`
              display: flex;
              gap: 8px;
              width: fit-content;
              margin: 0 auto;
              background: none;
              height: auto;
              align-items: center;
            `,
          }}
        >
          {[80, 40, 60, 120].map((w, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <LoadingSkeleton.Item height={12} width={w} />
              {i < 3 && (
                <LoadingSkeleton.Item
                  height={12}
                  width={12}
                  styles={{
                    self: css`
                      border-radius: 50%;
                    `,
                  }}
                />
              )}
            </div>
          ))}
        </LoadingSkeleton.Item>

        {/* Title */}
        <LoadingSkeleton.Item
          styles={{
            self: css`
              display: flex;
              flex-direction: column;
              gap: 12px;
              align-items: center;
              background: none;
              height: auto;
              margin-top: 28px;
            `,
          }}
        >
          <LoadingSkeleton.Item height={40} width="75%" />
          <LoadingSkeleton.Item height={40} width="50%" />
        </LoadingSkeleton.Item>

        {/* Author row */}
        <LoadingSkeleton.Item
          styles={{
            self: css`
              display: flex;
              align-items: center;
              justify-content: space-between;
              max-width: 400px;
              margin: 0 auto;
              width: 100%;
              background: none;
              height: auto;
              gap: 8px;
            `,
          }}
        >
          <LoadingSkeleton.Item
            height={40}
            width={40}
            styles={{
              self: css`
                border-radius: 50%;
                flex-shrink: 0;
              `,
            }}
          />
          <LoadingSkeleton.Item height={16} width={96} />
          <LoadingSkeleton.Item
            height={16}
            width={80}
            styles={{
              self: css`
                background: #f3f4f6;
              `,
            }}
          />
          <LoadingSkeleton.Item
            height={24}
            width={64}
            styles={{
              self: css`
                border-radius: 9999px;
              `,
            }}
          />
        </LoadingSkeleton.Item>

        {/* Hero image */}
        <LoadingSkeleton.Item
          height={128}
          width={128}
          styles={{
            self: css`
              border-radius: 8px;
              margin: 0 auto;
            `,
          }}
        />

        {/* Body lines */}
        <LoadingSkeleton.Item
          styles={{
            self: css`
              display: flex;
              flex-direction: column;
              gap: 12px;
              width: 100%;
              background: none;
              height: auto;
            `,
          }}
        >
          {[100, 90, 95, 80, 100, 70, 85].map((w, i) => (
            <LoadingSkeleton.Item
              key={i}
              height={16}
              width={`${w}%`}
              styles={{
                self: css`
                  background: #f3f4f6;
                `,
              }}
            />
          ))}
        </LoadingSkeleton.Item>
      </LoadingSkeleton>
    </Section>
  );
}

export function PostError({ message }: { message: string }) {
  return (
    <ErrorWrapper>
      <ErrorMessage>{message}</ErrorMessage>
      <RetryButton onClick={() => window.location.reload()}>Retry</RetryButton>
    </ErrorWrapper>
  );
}

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 96px 32px;
  gap: 16px;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: #9ca3af;
  font-size: 14px;
  max-width: 384px;
`;

const RetryButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  background: #111827;
  color: white;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #374151;
  }
`;

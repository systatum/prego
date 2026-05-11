"use client";
import * as React from "react";
import type { Template } from "tinacms";
import { Section } from "@/fragments/layout/section";
import { sectionBlockSchemaField } from "@/fragments/layout/section";
import ReactPlayer from "react-player";

export interface VideoBlockData {
  url?: string;
  autoPlay?: boolean;
  loop?: boolean;
  color?: "default" | "tint" | "primary";
  background?: string;
}

export const Video = ({ data }: { data: VideoBlockData }) => {
  if (!data.url) {
    return null;
  }
  return (
    <Section
      background={data.background!}
      className={`aspect-video w-full ${data.color}`}
    >
      <ReactPlayer
        width="100%"
        height="100%"
        style={{ margin: "auto" }}
        playing={!!data.autoPlay}
        loop={!!data.loop}
        controls={true}
        url={data.url}
      />
    </Section>
  );
};

export const videoBlockSchema: Template = {
  name: "video",
  label: "Video",
  ui: {
    previewSrc: "/blocks/video.png",
    defaultItem: {
      url: "https://www.youtube.com/watch?v=j8egYW7Jpgk",
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" },
      ],
    },
    {
      type: "string",
      label: "Url",
      name: "url",
    },
    {
      type: "boolean",
      label: "Auto Play",
      name: "autoPlay",
    },
    {
      type: "boolean",
      label: "Loop",
      name: "loop",
    },
  ],
};

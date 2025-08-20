"use client";
import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { PostQuery } from "@/tina/__generated__/types";
import { components } from "@/components/mdx-components";
import ErrorBoundary from "@/components/error-boundary";
import { Badge } from "@systatum/coneto/badge";

interface ClientPostProps {
  data: PostQuery;
  variables: {
    relativePath: string;
  };
  query: string;
}

export default function PostClientPage(props: ClientPostProps) {
  const { data } = useTina({ ...props });
  const post = data.post;

  const date = new Date(post.date!);
  let formattedDate = "";
  if (!isNaN(date.getTime())) {
    formattedDate = format(date, "yyyy/MM/dd");
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col gap-10 py-20">
        <h2
          data-tina-field={tinaField(post, "title")}
          className={`w-full relative text-3xl md:max-w-3xl max-w-xl font-extrabold tracking-normal text-center`}
        >
          {post.title}
        </h2>
        <div
          data-tina-field={tinaField(post, "author")}
          className="flex items-center w-full justify-between mx-auto max-w-[400px] mb-16"
        >
          {post.author && (
            <>
              {post.author.avatar && (
                <div className="shrink-0 mr-4">
                  <Image
                    data-tina-field={tinaField(post.author, "avatar")}
                    priority={true}
                    className="h-14 w-14 object-cover rounded-full shadow-xs"
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={500}
                    height={500}
                  />
                </div>
              )}
              <p
                data-tina-field={tinaField(post.author, "name")}
                className="text-base font-medium text-gray-600 group-hover:text-gray-800 "
              >
                {post.author.name}
              </p>
            </>
          )}
          <p
            data-tina-field={tinaField(post, "date")}
            className="text-base text-gray-400 group-hover:text-gray-500 "
          >
            {formattedDate}
          </p>
          <Badge
            badgeStyle={{
              minWidth: "80px",
              height: "fit-content",
            }}
            caption={post.category?.name || undefined}
            withCircle
          />
        </div>
        {post.heroImg && (
          <div className="w-full">
            <div
              data-tina-field={tinaField(post, "heroImg")}
              className="relative max-w-4xl lg:max-w-5xl mx-auto"
            >
              <Image
                priority={true}
                src={post.heroImg}
                alt={post.title}
                width={1000}
                height={1000}
                className="relative z-10 mb-14 mx-auto block rounded-lg w-full h-auto opacity-100"
                style={{ maxWidth: "30vh" }}
              />
            </div>
          </div>
        )}
        <div
          data-tina-field={tinaField(post, "_body")}
          className="prose w-full flex flex-col gap-3 md:max-w-3xl max-w-xl mx-auto"
        >
          <TinaMarkdown
            content={post._body}
            components={{
              ...components,
            }}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}

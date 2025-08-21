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
import { css } from "styled-components";
import Link from "next/link";
import { Crumb } from "@systatum/coneto/crumb";
import { Section } from "@/components/layout/section";

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

  const LINK_ITEMS = [
    { label: "Systatum", path: "/" },
    { label: "Post", path: "/post" },
    { label: post.category.name, path: `/post?category=${post.category.name}` },
    { label: post.title, path: `/post/${post._sys.breadcrumbs[0]}` },
  ];

  return (
    <ErrorBoundary>
      <Section className="py-6">
        <div className="flex flex-col gap-10 py-20 md:max-w-4xl max-w-xl mx-auto">
          <Crumb
            style={css`
              font-size: 14px;
            `}
          >
            {LINK_ITEMS.map((data, index) => (
              <Crumb.Item path={data.path} key={index}>
                {data.label}
              </Crumb.Item>
            ))}
          </Crumb>
          <h2
            data-tina-field={tinaField(post, "title")}
            className={`w-full relative text-3xl font-extrabold tracking-normal text-center`}
          >
            {post.title}
          </h2>
          <div
            data-tina-field={tinaField(post, "author")}
            className="flex items-center w-full justify-between max-w-[400px] mx-auto mb-16"
          >
            {post.author && (
              <>
                {post.author.avatar && (
                  <div className="shrink-0 mr-4">
                    <img
                      data-tina-field={tinaField(post.author, "avatar")}
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={1000}
                      height={1000}
                      className="w-10 h-10 sm:w-12 sm:h-12 md:h-14 md:w-14 object-cover rounded-full"
                    />
                  </div>
                )}
                <span
                  data-tina-field={tinaField(post.author, "name")}
                  className="text-base font-medium text-gray-600 group-hover:text-gray-800 "
                >
                  {post.author.name}
                </span>
              </>
            )}
            <span
              data-tina-field={tinaField(post, "date")}
              className="text-[15px] font-medium text-gray-400 group-hover:text-gray-500 "
            >
              {formattedDate}
            </span>
            <Link href={`/post?category=${post.category.name}`}>
              <Badge
                badgeStyle={css`
                  min-width: 80px;
                  height: fit-content;
                  cursor: pointer;

                  &:hover {
                    border-color: #045e95;
                    transition: all ease-in-out 0.2s;
                  }
                `}
                caption={post.category?.name || undefined}
                withCircle
              />
            </Link>
          </div>
          {post.heroImg && (
            <div className="w-full">
              <div
                data-tina-field={tinaField(post, "heroImg")}
                className="relative max-w-4xl lg:max-w-5xl mx-auto"
              >
                <img
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
            className="prose w-full flex flex-col gap-3 mx-auto"
          >
            <TinaMarkdown
              content={post._body}
              components={{
                ...components,
              }}
            />
          </div>
        </div>
      </Section>
    </ErrorBoundary>
  );
}

import React from "react";
import { format } from "date-fns";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { PostQuery } from "@tina/__generated__/types";
import { components } from "@/fragments/mdx-components";
import ErrorBoundary from "@/fragments/error-boundary";
import { Badge } from "@systatum/coneto/badge";
import { css } from "styled-components";
import { Crumb } from "@systatum/coneto/crumb";
import { Section } from "@/fragments/layout/section";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";

export interface ClientPostProps {
  data: PostQuery;
  variables: {
    relativePath: string;
  };
  query: string;
}

export default function PostClientPage(props: ClientPostProps) {
  const { t } = useTranslation();
  const tPost = (key: string) => t(`postPage.${key}`);

  const information = tPost("info");
  const release = tPost("release");
  const event = tPost("event");

  const { data } = useTina({ ...props });
  const post = data.post;

  const date = new Date(post.date!);

  const formattedDate = !isNaN(date.getTime())
    ? format(date, "yyyy/MM/dd")
    : "";

  const categoryName = post.category?.name;

  const categoryTranslated =
    categoryName === "Info"
      ? information
      : categoryName === "Release"
        ? release
        : event;

  const LINK_ITEMS = [
    { label: "Sequelore", path: "/" },
    { label: tPost("post"), path: "/post" },
    { label: categoryTranslated, path: `/post?category=${categoryName}` },
    { label: post.title, path: "#" },
  ];

  const CATEGORY_ITEMS = {
    Info: "#3B82F6",
    Release: "#10B981",
    Event: "#F97316",
  };

  const categoryColor = categoryName
    ? CATEGORY_ITEMS[categoryName as keyof typeof CATEGORY_ITEMS]
    : undefined;

  return (
    <ErrorBoundary>
      <Section className="pt-2 pb-14">
        <div className="flex flex-col gap-10 md:max-w-4xl max-w-xl mx-auto">
          <div className="flex flex-row w-fit mx-auto">
            <Crumb
              styles={{
                self: css`
                  font-size: 14px;
                  cursor: pointer;
                `,
              }}
              maxShown={4}
            >
              {LINK_ITEMS.map((item, index) => (
                <Crumb.Item key={index} onClick={() => navigate(item.path)}>
                  {item.label}
                </Crumb.Item>
              ))}
            </Crumb>
          </div>

          <h1
            data-tina-field={tinaField(post, "title")}
            className="w-full relative mt-7 text-5xl tracking-normal text-center"
          >
            {post.title}
          </h1>

          <div className="flex items-center mb-3 w-full justify-between max-w-100 mx-auto">
            {post.author && (
              <>
                {post.author.avatar && (
                  <div className="shrink-0">
                    <img
                      data-tina-field={tinaField(post.author, "avatar")}
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full"
                    />
                  </div>
                )}

                <span
                  data-tina-field={tinaField(post.author, "name")}
                  className="text-base font-medium text-gray-600"
                >
                  {post.author.name}
                </span>
              </>
            )}

            <span className="text-[15px] font-medium text-gray-400">
              {formattedDate}
            </span>

            <Badge
              styles={{
                self: css`
                  height: fit-content;
                  cursor: pointer;
                `,
              }}
              caption={categoryTranslated}
              withCircle
              circleColor={categoryColor}
              onClick={() => navigate(`/post?category=${categoryName}`)}
            />
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
                  className="relative z-10 mb-14 mx-auto block rounded-lg w-full h-auto"
                  style={{ maxWidth: "30vh" }}
                />
              </div>
            </div>
          )}

          <div
            data-tina-field={tinaField(post, "_body")}
            className="prose w-full flex flex-col gap-3 mx-auto"
          >
            <TinaMarkdown content={post._body} components={components} />
          </div>
        </div>
      </Section>
    </ErrorBoundary>
  );
}

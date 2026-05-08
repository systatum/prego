import React, { useMemo } from "react";
import { Link, navigate } from "gatsby";
import { format } from "date-fns";
import {
  PostConnectionQuery,
  PostConnectionQueryVariables,
} from "@tina/__generated__/types";
import ErrorBoundary from "@/fragments/error-boundary";
import { Section } from "@/fragments/layout/section";
import { Badge } from "@systatum/coneto/badge";
import { css } from "styled-components";
import { Crumb } from "@systatum/coneto/crumb";
import { cn } from "@/lib/utils";
import TitleSection from "@/fragments/layout/title";
import { useTranslation } from "react-i18next";

export interface ClientPostProps {
  data: PostConnectionQuery;
  variables: PostConnectionQueryVariables;
  query: string;
}

interface PostItem {
  id: string;
  published: string;
  title: string;
  tags: string[];
  url: string;
  heroImg?: string;
  category: { name?: string };
  author: { name: string; avatar?: string };
}

function useQuery() {
  if (typeof window === "undefined") return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

export function PostsClientPage(props: ClientPostProps) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  const tPost = (key: string) => t(`postPage.${key}`);

  const all = tPost("all");
  const information = tPost("info");
  const release = tPost("release");
  const event = tPost("event");

  const query = useQuery();
  const categoryPost = query.get("category");

  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  const isPostPage = pathname.startsWith("/post");

  const posts: PostItem[] = (props.data?.postConnection.edges ?? [])
    .filter((edge) => edge?.node?._sys?.relativePath?.startsWith(locale))

    .map((postData) => {
      const post = postData?.node;
      if (!post) return null;

      const date = new Date(post.date ?? "");
      const formattedDate = !isNaN(date.getTime())
        ? format(date, "yyyy/MM/dd")
        : "";

      const relativePath = post._sys.relativePath.split(".");

      return {
        id: post.id,
        published: formattedDate,
        title: post.title,
        tags: post.tags?.map((tag) => tag?.tag?.name) || [],
        url: `/post/${relativePath[0]}`,
        excerpt:
          post.excerpt && typeof post.excerpt !== "string"
            ? post.excerpt.children?.[0]?.children?.[0]?.text
            : typeof post.excerpt === "string"
              ? post.excerpt
              : "",
        heroImg: post.heroImg,
        category: {
          name: post.category?.name,
        },
        author: {
          name: post.author?.name || "Anonymous",
          avatar: post.author?.avatar,
        },
      };
    })
    .filter(Boolean) as PostItem[];

  const CATEGORY_ITEMS = [
    { label: all, path: "/post" },
    {
      label: information,
      path: "/post?category=Info",
      color: "#3B82F6",
    },
    {
      label: release,
      path: "/post?category=Release",
      color: "#10B981",
    },
    {
      label: event,
      path: "/post?category=Event",
      color: "#F97316",
    },
  ];

  const LINK_ITEMS = [
    { label: "Systatum", path: "/" },
    { label: tPost("post"), path: "/post" },
    categoryPost
      ? {
          label:
            categoryPost === "Info"
              ? information
              : categoryPost === "Release"
                ? release
                : event,
          path: `/post?category=${categoryPost}`,
        }
      : null,
  ].filter(Boolean) as { label: string; path: string }[];

  const POSTS_FILTERED = useMemo(() => {
    if (!posts) return [];
    return categoryPost
      ? posts.filter((p) => p.category.name === categoryPost)
      : posts;
  }, [posts, categoryPost]);

  return (
    <ErrorBoundary>
      <Section
        className={cn(
          isPostPage ? "py-2" : "py-20 px-0 mx-0 w-full max-w-full",
        )}
      >
        {isPostPage && (
          <div className="mx-auto w-fit flex">
            <Crumb
              styles={{
                self: css`
                  font-size: 14px;
                  cursor: pointer;
                `,
              }}
            >
              {LINK_ITEMS.map((item, index) => (
                <Crumb.Item key={index} onClick={() => navigate(item.path)}>
                  {item.label}
                </Crumb.Item>
              ))}
            </Crumb>
          </div>
        )}

        <div
          className={cn(
            "flex flex-col gap-10",
            isPostPage
              ? "py-10 md:max-w-4xl mx-auto max-w-xl"
              : "max-w-full w-full",
          )}
        >
          {isPostPage ? (
            <h2 className="w-full relative text-5xl text-center">
              {tPost("title")}
            </h2>
          ) : (
            <TitleSection className="text-black">{tPost("title")}</TitleSection>
          )}

          {isPostPage && (
            <div className="flex flex-row gap-2 items-center justify-center">
              {CATEGORY_ITEMS.map((item, index) => (
                <Badge
                  key={index}
                  circleColor={item?.color}
                  styles={{
                    self: css`
                      min-width: 90px;
                      height: fit-content;
                      cursor: pointer;

                      &:hover {
                        border-color: #045e95;
                        transition: all ease-in-out 0.2s;
                      }
                    `,
                  }}
                  caption={item.label}
                  onClick={(e) => {
                    e?.preventDefault();
                    e?.stopPropagation();
                    navigate(item.path);
                  }}
                  withCircle={item.label !== tPost("all")}
                />
              ))}
            </div>
          )}

          {POSTS_FILTERED.length > 0 ? (
            <div className={cn("flex flex-col w-full", !isPostPage && "px-8")}>
              {POSTS_FILTERED.map((post, index) => {
                const categoryTranslated =
                  post.category.name === "Info"
                    ? information
                    : post.category.name === "Release"
                      ? release
                      : event;

                return (
                  <Link
                    key={index}
                    to={post.url}
                    className="flex cursor-pointer px-2 py-0.5 rounded-xs gap-2 justify-between flex-row w-full"
                  >
                    <div className="flex flex-row gap-3 w-fit">
                      <Badge
                        styles={{
                          self: css`
                            min-width: 100px;
                            height: fit-content;
                            cursor: pointer;
                            font-size: 16px;
                          `,
                        }}
                        circleColor={
                          CATEGORY_ITEMS.find(
                            (item) =>
                              item.path ===
                              `/post?category=${post.category.name}`,
                          )?.color
                        }
                        caption={categoryTranslated}
                        onClick={(e) => {
                          e?.preventDefault();
                          e?.stopPropagation();
                          navigate(`/post?category=${post.category.name}`);
                        }}
                        withCircle
                      />
                      <div
                        className={cn(
                          "text-lg w-full flex flex-row",
                          !isPostPage && "font-medium",
                        )}
                      >
                        {post.title}
                      </div>
                    </div>

                    <span
                      className={cn("text-lg", !isPostPage && "font-medium")}
                    >
                      {post.published}
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className={cn(!isPostPage && "px-10")}>
              <span
                className={cn(
                  "text-gray-400 text-sm italic w-full border-2 border-dashed px-10 border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-center",
                  isPostPage ? "py-50" : "py-25",
                )}
              >
                {tPost("emptyContent")}
              </span>
            </div>
          )}
        </div>
      </Section>
    </ErrorBoundary>
  );
}

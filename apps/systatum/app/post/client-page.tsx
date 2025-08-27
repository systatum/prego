"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  PostConnectionQuery,
  PostConnectionQueryVariables,
} from "@/tina/__generated__/types";
import ErrorBoundary from "@/components/error-boundary";
import { Section } from "@/components/layout/section";
import { Badge } from "@systatum/coneto/badge";
import { css } from "styled-components";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Crumb } from "@systatum/coneto/crumb";
import { cn } from "@/lib/utils";
import TitleSection from "@/components/layout/title";
import { ExcerptType } from "@/constants/GetMetaData";
import { useTranslations } from "next-intl";

interface ClientPostProps {
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
  excerpt?: ExcerptType;
  heroImg?: string;
  category: { name?: string };
  author: { name: string; avatar?: string };
}

export default function PostsClientPage(props: ClientPostProps) {
  const t = useTranslations("postPage");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryPost = searchParams.get("category");

  const posts: PostItem[] = props.data?.postConnection.edges
    ?.map((postData) => {
      const post = postData?.node;
      if (!post) return null;
      const date = new Date(post.date ?? "");
      const formattedDate = !isNaN(date.getTime())
        ? format(date, "yyyy/MM/dd")
        : "";

      const relativePath = post._sys.relativePath.split(".");

      return {
        id: post?.id,
        published: formattedDate,
        title: post?.title,
        tags: post?.tags?.map((tag) => tag?.tag?.name) || [],
        url: `/post/${relativePath[0]}`,
        excerpt:
          post.excerpt && typeof post.excerpt !== "string"
            ? post.excerpt.children[0]?.children[0]?.text
            : typeof post.excerpt === "string" && post.excerpt,
        heroImg: post?.heroImg,
        category: {
          name: post?.category?.name,
        },
        author: {
          name: post?.author?.name || "Anonymous",
          avatar: post?.author?.avatar,
        },
      };
    })
    .filter(Boolean) as NonNullable<typeof posts>[0][];

  const CATEGORY_ITEMS = [
    { label: t("all"), path: "/post" },
    { label: t("info"), path: "/post?category=Info" },
    { label: t("release"), path: "/post?category=Release" },
    { label: t("event"), path: "/post?category=Event" },
  ];

  const LINK_ITEMS = [
    { label: "Systatum", path: "/" },
    { label: "Post", path: "/post" },
    categoryPost
      ? { label: categoryPost, path: `/post?category=${categoryPost}` }
      : null,
  ].filter(Boolean);

  const POSTS_FILTERED = useMemo(() => {
    if (!posts) return [];

    return categoryPost
      ? posts.filter((data) => data.category.name === categoryPost)
      : posts;
  }, [posts, categoryPost]);

  const isPostPage = pathname.startsWith("/post");

  return (
    <ErrorBoundary>
      <Section className={cn(isPostPage ? "py-2" : "py-20 px-0 max-w-7xl")}>
        {isPostPage && (
          <div className="mx-auto w-fit flex">
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
          </div>
        )}
        <div
          className={cn(
            "flex flex-col gap-10 mx-auto",
            isPostPage ? "py-10 md:max-w-4xl max-w-xl" : "max-w-7xl"
          )}
        >
          {isPostPage ? (
            <h2 className="w-full relative text-5xl text-center">
              {t("title")}
            </h2>
          ) : (
            <TitleSection className="text-black">{t("title")}</TitleSection>
          )}

          {isPostPage && (
            <div className="flex flex-row gap-2 items-center justify-center">
              {CATEGORY_ITEMS.map((data, index) => (
                <Badge
                  key={index}
                  badgeStyle={css`
                    ${data.label !== "All" &&
                    css`
                      min-width: 80px;
                    `}
                    height: fit-content;
                    cursor: pointer;

                    &:hover {
                      border-color: #045e95;
                      transition: all ease-in-out 0.2s;
                    }
                  `}
                  caption={data.label ?? data.label}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    router.push(data.path);
                  }}
                  withCircle={data.label !== "All"}
                />
              ))}
            </div>
          )}

          {POSTS_FILTERED?.length > 0 ? (
            <div className={cn("flex flex-col w-full", !isPostPage && "px-8")}>
              {POSTS_FILTERED.map((post, index) => {
                const categoryTranslated =
                  post.category.name === "Info"
                    ? t("info")
                    : post.category.name === "Release"
                      ? t("release")
                      : t("event");

                return (
                  <Link
                    key={index}
                    className="flex cursor-pointer px-2 py-[2px] rounded-xs gap-2 justify-between flex-row w-full"
                    href={post.url}
                  >
                    <div className="flex flex-row gap-3 w-fit">
                      <Badge
                        badgeStyle={css`
                          min-width: 80px;
                          height: fit-content;
                          cursor: pointer;
                          font-size: 16px;
                          ${!isPostPage &&
                          css`
                            font-weight: 500;
                          `}
                        `}
                        caption={categoryTranslated || categoryTranslated}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          router.push(`/post?category=${post.category.name}`);
                        }}
                        withCircle
                      />
                      <div
                        className={cn(
                          "text-lg w-full flex flex-row",
                          !isPostPage && "font-medium"
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
                  isPostPage ? "py-[200px]" : "py-[100px]"
                )}
              >
                No content available
              </span>
            </div>
          )}
        </div>
      </Section>
    </ErrorBoundary>
  );
}

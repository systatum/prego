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
  excerpt?: string;
  heroImg?: string;
  category: { name?: string };
  author: { name: string; avatar?: string };
}

export default function PostsClientPage(props: ClientPostProps) {
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

      return {
        id: post?.id,
        published: formattedDate,
        title: post?.title,
        tags: post?.tags?.map((tag) => tag?.tag?.name) || [],
        url: `/post/${post?._sys.breadcrumbs.join("/")}`,
        excerpt: post?.excerpt,
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
    { label: "All", path: "/post" },
    { label: "Info", path: "/post?category=Info" },
    { label: "Release", path: "/post?category=Release" },
    { label: "Event", path: "/post?category=Event" },
  ];

  const LINK_ITEMS = [
    { label: "Systatum", path: "/" },
    { label: "Post", path: "/post" },
    categoryPost
      ? { label: categoryPost, path: `/post?category=${categoryPost}` }
      : {},
  ];

  const POSTS_FILTERED = useMemo(() => {
    if (!posts) return [];

    return categoryPost
      ? posts.filter((data) => data.category.name === categoryPost)
      : posts;
  }, [posts, categoryPost]);

  return (
    <ErrorBoundary>
      <Section className={cn(pathname === "post" ? "py-6" : "py-20")}>
        {pathname === "/post" && (
          <div className="px-2">
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
            "flex flex-col gap-10 md:max-w-4xl max-w-xl mx-auto",
            pathname === "/post" ? "py-20" : ""
          )}
        >
          <div className="text-center">
            <h2 className="w-full relative text-3xl font-extrabold tracking-normal text-center">
              Systatum Post
            </h2>
          </div>

          {pathname === "/post" && (
            <div className="flex flex-row gap-2 items-center justify-center">
              {CATEGORY_ITEMS.map((data, index) => (
                <Badge
                  key={index}
                  badgeStyle={css`
                    min-width: 80px;
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
                  withCircle
                />
              ))}
            </div>
          )}

          {POSTS_FILTERED?.length > 0 ? (
            <div className="flex flex-col w-full">
              {POSTS_FILTERED.map((post, index) => (
                <Link
                  key={index}
                  className="flex cursor-pointer px-2 py-[2px] rounded-xs hover:bg-gray-100 gap-2 justify-between flex-row w-full"
                  href={post.url}
                >
                  <div className="flex flex-row gap-3 w-fit items-center">
                    <span className="text-sm font-semibold">
                      {post.published}
                    </span>
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
                      caption={post.category.name ?? post.category.name}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        router.push(`/post?category=${post.category.name}`);
                      }}
                      withCircle
                    />
                  </div>
                  <div className="font-medium w-full flex flex-row justify-end font-mono">
                    {post.title}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="w-full py-[200px] p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-center space-y-4">
              <p className="text-gray-400 text-sm italic">
                No content available
              </p>
            </div>
          )}
        </div>
      </Section>
    </ErrorBoundary>
  );
}

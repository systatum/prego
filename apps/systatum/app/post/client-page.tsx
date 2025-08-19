"use client";
import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  PostConnectionQuery,
  PostConnectionQueryVariables,
} from "@/tina/__generated__/types";
import ErrorBoundary from "@/components/error-boundary";
import { Section } from "@/components/layout/section";

import { Badge } from "@systatum/coneto/badge";

interface ClientPostProps {
  data: PostConnectionQuery;
  variables: PostConnectionQueryVariables;
  query: string;
}

export default function PostsClientPage(props: ClientPostProps) {
  const posts = props.data?.postConnection.edges!.map((postData) => {
    const post = postData!.node!;
    const date = new Date(post?.date!);
    let formattedDate = "";
    if (!isNaN(date.getTime())) {
      formattedDate = format(date, "yyyy/MM/dd");
    }

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
  });

  return (
    <ErrorBoundary>
      <Section>
        <div className="flex flex-col gap-10 min-h-[400px]">
          <div className="text-center">
            <h2 className="w-full relative text-3xl font-extrabold tracking-normal text-center">
              Systatum Blog
            </h2>
          </div>

          {posts?.length > 0 ? (
            <div className="flex flex-col">
              {posts.map((post, index) => (
                <Link
                  key={index}
                  className="flex cursor-pointer gap-2 flex-row w-full"
                  href={post.url}
                >
                  <div>{post.published}</div>
                  <Badge
                    badgeStyle={{
                      minWidth: "80px",
                      height: "fit-content",
                    }}
                    caption={post.category.name ? post.category.name : ""}
                    withCircle
                  />
                  <div>{post.title}</div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="w-full max-w-sm mx-auto p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-center space-y-4">
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

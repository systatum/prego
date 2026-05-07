import React from "react";
import { ClientPostProps, PostsClientPage } from "@/fragments/post/client-page";

export default function PostSection(props: ClientPostProps) {
  return <PostsClientPage {...props} />;
}

import React from "react";
import { ClientPostProps, PostsClientPage } from "@/pages/post/client-page";

export default function PostSection(props: ClientPostProps) {
  return <PostsClientPage {...props} />;
}

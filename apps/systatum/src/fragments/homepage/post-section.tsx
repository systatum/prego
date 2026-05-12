import { PostsClientPage } from "@/fragments/post/client-page";
import { fetchPosts } from "@/services/posts";
import React from "react";
import { PostsSkeleton } from "../../../../../packages/components/loading-skeleton";

export default function PostSection() {
  const [tinaData, setTinaData] = React.useState<any>(null);

  React.useEffect(() => {
    fetchPosts().then((res) => {
      setTinaData(res.props?.tinaData);
    });
  }, []);

  if (!tinaData) return <PostsSkeleton />;

  return <PostsClientPage {...tinaData} />;
}

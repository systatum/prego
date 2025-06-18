import { defineConfig } from "tinacms";
import BlogWorkaty from "../apps/workaty/tina/collection/blog";
import GlobalWorkaty from "./../apps/workaty/tina/collection/global";
import AuthorWorkaty from "./../apps/workaty/tina/collection/author";
import PageWorkaty from "./../apps/workaty/tina/collection/page";
import TagWorkaty from "./../apps/workaty/tina/collection/tag";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH! ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF! ||
  process.env.HEAD! ||
  "main";

const useProject = process.env.ACTIVE_PROJECT || "workaty";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  token: process.env.TINA_TOKEN!,
  build: {
    outputFolder: "admin",
    publicFolder: useProject === "workaty" ? "apps/workaty/public" : "",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: useProject === "workaty" ? "apps/workaty/public" : "",
    },
  },
  schema: {
    collections:
      useProject === "workaty"
        ? [PageWorkaty, AuthorWorkaty, BlogWorkaty, TagWorkaty, GlobalWorkaty]
        : [],
  },
});

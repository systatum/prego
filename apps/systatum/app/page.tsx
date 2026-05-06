import { Collaborator } from "@/components/fragments/homepage/collaborator-section";
import dynamic from "next/dynamic";

const Hero = dynamic(
  () => import("@/components/fragments/homepage/hero-section"),
  { ssr: true },
);

const Reason = dynamic(
  () => import("@/components/fragments/homepage/reason-section"),
  { ssr: true },
);

const Product = dynamic(
  () => import("@/components/fragments/homepage/product-section"),
  { ssr: true },
);

const Post = dynamic(
  () => import("@/components/fragments/homepage/post-section"),
  { ssr: true },
);

const CollaborateAndEmail = dynamic(
  () => import("@/components/fragments/homepage/collaborate-and-email-section"),
  { ssr: true },
);

export default function HomepageContent() {
  return (
    <div className="mx-auto w-full items-center justify-center gap-10">
      <Hero />
      <div className="md:ml-[220px] lg:ml-[300px]">
        <Reason />
        <Product />
        <Post />
        <Collaborator />
      </div>
      <CollaborateAndEmail />
    </div>
  );
}

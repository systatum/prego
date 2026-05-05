import dynamic from "next/dynamic";
import { Container } from "@/components/layout/container";

const Hero = dynamic(() =>
  import("@/fragments/root/hero").then((mod) => mod.Hero),
);

const Features = dynamic(() =>
  import("@/fragments/root/features").then((mod) => mod.Features),
);

const TrustedBy = dynamic(() =>
  import("@/fragments/root/trusted-by").then((mod) => mod.TrustedBy),
);

const OurCompany = dynamic(() =>
  import("@/fragments/root/our-company").then((mod) => mod.OurCompany),
);

const DownloadApps = dynamic(() =>
  import("@/fragments/root/download-apps").then((mod) => mod.DownloadApps),
);

export default function Home() {
  return (
    <Container>
      <Hero />
      <Features />
      <TrustedBy />
      <DownloadApps />
      <OurCompany />
    </Container>
  );
}

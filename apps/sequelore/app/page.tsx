import { Container } from "@/components/layout/container";
import { Features } from "@/fragments/root/features";
import { Hero } from "@/fragments/root/hero";
import TrustedBy from "@/fragments/root/trusted-by";

export default function Home() {
  return (
    <Container>
      <Hero />
      <Features />
      <TrustedBy />
    </Container>
  );
}

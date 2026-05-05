import { Container } from "@/components/layout/container";
import Navbar from "@/components/layout/navbar";
import { Features } from "@/fragments/root/features";
import { Hero } from "@/fragments/root/hero";
import TrustedBy from "@/fragments/root/trusted-by";

export default function Home() {
  return (
    <Container>
      <Navbar />
      <Hero />
      <Features />
      <TrustedBy />
    </Container>
  );
}

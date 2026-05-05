import { Container } from "@/components/layout/container";
import { Navbar } from "@/fragments/root/navbar";
import { Features } from "@/fragments/root/features";
import { Footer } from "@/fragments/root/footer";
import { Hero } from "@/fragments/root/hero";
import { TrustedBy } from "@/fragments/root/trusted-by";

export default function Home() {
  return (
    <Container>
      <Navbar />
      <Hero />
      <Features />
      <TrustedBy />
      <Footer />
    </Container>
  );
}

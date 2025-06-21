import HeroSection from "@/components/fragments/homepage/section/hero-section";
import PlaceholderSection from "@/components/fragments/homepage/section/placeholder-section";
import ScrollToTopButton from "../../../packages/components/tools/scroll-to-top-button";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[1400px] items-center justify-center gap-10 px-4 py-10 md:px-6">
      <HeroSection />
      <PlaceholderSection />
      <ScrollToTopButton />
    </div>
  );
}

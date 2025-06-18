import HeroSection from "@/components/fragments/homepage/section/HeroSection";
import PlaceholderSection from "@/components/fragments/homepage/section/PlaceholderSection";
import ScrollToTopButton from "@/components/tools/ScrollToTopButton";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[1400px] items-center justify-center gap-10 px-4 py-10 md:px-6">
      <HeroSection />
      <PlaceholderSection />
      <ScrollToTopButton />
    </div>
  );
}

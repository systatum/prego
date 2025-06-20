"use client";

import Collaborator from "@/components/fragments/homepage/collaborator-section";
import Footer from "@/components/fragments/homepage/footer-section";
import Hero from "@/components/fragments/homepage/hero-section";
import Product from "@/components/fragments/homepage/product-section";
import Reason from "@/components/fragments/homepage/reason-section";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="mx-auto w-full items-center justify-center gap-10">
      <Hero />
      <Reason />
      <Product />
      <Collaborator />
      <Footer />
    </div>
  );
}

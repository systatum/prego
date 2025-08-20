import dynamic from "next/dynamic";
import React from "react";

// Dynamically import Mermaid renderer, no SSR
const MermaidElement = dynamic(() => import("../mermaid-renderer"), {
  ssr: false,
  loading: () => <div>Loading diagram...</div>,
});

interface MermaidProps {
  value?: string | null;
}

export function mermaid(props?: MermaidProps) {
  if (!props?.value) return null;
  return <MermaidElement value={props.value} />;
}

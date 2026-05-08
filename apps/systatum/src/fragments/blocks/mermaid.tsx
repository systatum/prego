import React from "react";
import MermaidElement from "../mermaid-renderer";

interface MermaidProps {
  value?: string | null;
}

export function mermaid(props?: MermaidProps) {
  if (!props?.value) return null;
  return <MermaidElement value={props.value} />;
}

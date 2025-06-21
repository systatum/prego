import { useIntersectionObserver } from "usehooks-ts";
import mermaid from "mermaid";

export default function MermaidElement({ value }) {
  const { ref } = useIntersectionObserver({
    threshold: 0.01,
    freezeOnceVisible: true,
    onChange(isIntersecting, entry) {
      if (isIntersecting) {
        mermaid.initialize({
          startOnLoad: false,
          theme: "default",
          themeVariables: {
            background: "#ffffff",
            mainBkg: "#f9fafb",
            primaryColor: "#e5e7eb",
            primaryBorderColor: "#6b7280",
            lineColor: "#9ca3af",
            textColor: "#111827",
            taskTextColor: "#1f2937",
            taskBorderColor: "#9ca3af",
            taskColor: "#fde68a",
            gridColor: "#e5e7eb",
          },
        });
        mermaid.run({ nodes: [entry.target as HTMLElement] });
      }
    },
  });

  return (
    <div contentEditable={false}>
      <pre ref={ref} suppressHydrationWarning className="bg-gray-200">
        {value}
      </pre>
    </div>
  );
}

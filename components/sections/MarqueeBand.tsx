"use client";

const TERMS_A = [
  "Neural Networks",
  "·",
  "Computer Vision",
  "·",
  "Edge AI",
  "·",
  "Transformers",
  "·",
  "PyTorch",
  "·",
  "Self-Supervised Learning",
  "·",
  "TensorRT",
  "·",
  "Diffusion Models",
  "·",
  "YOLOv8",
  "·",
];

const TERMS_B = [
  "Deep Learning",
  "·",
  "ONNX",
  "·",
  "Medical Imaging",
  "·",
  "Knowledge Graphs",
  "·",
  "CUDA",
  "·",
  "Model Quantisation",
  "·",
  "RAG",
  "·",
  "LangChain",
  "·",
  "STM32",
  "·",
];

function Track({ terms, reverse = false }: { terms: string[]; reverse?: boolean }) {
  /* Triple the list so the seamless loop works at any viewport width */
  const repeated = [...terms, ...terms, ...terms];

  return (
    <div
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        display: "flex",
      }}
    >
      <div
        className={reverse ? "marquee-rev" : "marquee-fwd"}
        style={{ display: "inline-flex", gap: "2rem", willChange: "transform" }}
      >
        {repeated.map((t, i) => (
          <span
            key={i}
            style={{
              fontFamily: t === "·" ? "var(--font-body)" : "var(--font-serif)",
              fontStyle: t === "·" ? "normal" : "italic",
              fontWeight: t === "·" ? 400 : 400,
              fontSize: t === "·" ? "0.6rem" : "0.82rem",
              letterSpacing: t === "·" ? "0.1em" : "0.04em",
              color: t === "·" ? "var(--text-3)" : "var(--text-2)",
              flexShrink: 0,
              lineHeight: 1,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function MarqueeBand() {
  return (
    <div
      aria-hidden="true"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "1rem 0",
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
        overflow: "hidden",
        background: "var(--surface)",
      }}
    >
      <Track terms={TERMS_A} />
      <Track terms={TERMS_B} reverse />
    </div>
  );
}

"use client";

/* Per-letter vertical roll on hover — replicated from
   obsidianassembly.com nav links. Each character is stacked twice;
   on hover the column rolls up (translate -100%) so the second copy
   takes its place, cascading 0.028s per character with --f-cubic. */
export function RollText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`roll-link ${className}`.trim()} aria-label={text}>
      {text.split("").map((ch, i) =>
        ch === " " ? (
          <span key={i} className="roll-space" aria-hidden="true" />
        ) : (
          <span
            key={i}
            className="roll-char"
            aria-hidden="true"
            style={{ ["--ci" as string]: String(i) } as React.CSSProperties}
          >
            <span>{ch}</span>
            <span>{ch}</span>
          </span>
        )
      )}
    </span>
  );
}

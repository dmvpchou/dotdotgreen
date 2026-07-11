import React from "react";
import { Dot } from "../foundation/Dot.jsx";

/**
 * 區塊標題 — eyebrow 小標(帶色點) + 主標。點點綠標題前綴一律用分類/品牌色點。
 */
export function SectionHeader({
  eyebrow,
  title,
  dotCategory = "food",
  align = "left",
  invert = false,
  style,
  ...rest
}) {
  const strong = invert ? "var(--text-invert)" : "var(--text-strong)";
  const muted = invert ? "color-mix(in srgb, var(--paper) 70%, transparent)" : "var(--text-muted)";
  return (
    <header
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: align === "center" ? "center" : "flex-start",
        textAlign: align,
        ...style,
      }}
      {...rest}
    >
      {eyebrow ? (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--font-body)",
            fontSize: "var(--fs-sm)",
            fontWeight: 500,
            letterSpacing: "var(--ls-wide)",
            color: muted,
          }}
        >
          <Dot category={dotCategory} size="sm" />
          {eyebrow}
        </span>
      ) : null}
      <h2
        style={{
          margin: 0,
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "var(--fs-h2)",
          lineHeight: "var(--lh-snug)",
          letterSpacing: "var(--ls-tight)",
          color: strong,
        }}
      >
        {title}
      </h2>
    </header>
  );
}

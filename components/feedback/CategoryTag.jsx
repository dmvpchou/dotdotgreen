import React from "react";

/**
 * 分類標籤 — 色點 + 分類名，pill 底。用於品牌卡、篩選結果。
 */
const LABELS = { food: "食品蔬果", craft: "手作", tribe: "部落", weekday: "週間攤車" };
const DOT = {
  food: "var(--cat-food)", craft: "var(--cat-craft)",
  tribe: "var(--cat-tribe)", weekday: "var(--cat-weekday)",
};
const BG = {
  food: "var(--cat-food-bg)", craft: "var(--cat-craft-bg)",
  tribe: "var(--cat-tribe-bg)", weekday: "var(--cat-weekday-bg)",
};

export function CategoryTag({ category = "food", label, solid = false, style, ...rest }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        padding: "4px 12px 4px 10px",
        fontFamily: "var(--font-body)",
        fontSize: "var(--fs-xs)",
        fontWeight: 500,
        color: "var(--text-strong)",
        background: solid ? BG[category] : "transparent",
        border: solid ? "none" : "1px solid var(--border)",
        borderRadius: "var(--r-pill)",
        ...style,
      }}
      {...rest}
    >
      <span style={{ width: 8, height: 8, borderRadius: 999, background: DOT[category], flex: "none" }} />
      {label || LABELS[category]}
    </span>
  );
}

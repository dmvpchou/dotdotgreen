import React from "react";

/**
 * 分類色點 — 點點綠的簽名視覺元素。
 * category: food | craft | tribe | weekday 對應四個分類色。
 * 也可用 color 直接指定顏色。size 走 token (--dot-*)。
 */
const CAT = {
  food:    "var(--cat-food)",
  craft:   "var(--cat-craft)",
  tribe:   "var(--cat-tribe)",
  weekday: "var(--cat-weekday)",
};
const SIZE = { xs: 8, sm: 12, md: 20, lg: 48, xl: 120 };

export function Dot({ category = "food", color, size = "sm", ring = false, style, ...rest }) {
  const dim = typeof size === "number" ? size : (SIZE[size] || 12);
  const fill = color || CAT[category] || "var(--leaf)";
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: dim,
        height: dim,
        borderRadius: "999px",
        background: fill,
        boxShadow: ring ? `0 0 0 ${Math.max(2, dim * 0.14)}px color-mix(in srgb, ${fill} 22%, transparent)` : "none",
        flex: "none",
        ...style,
      }}
      {...rest}
    />
  );
}

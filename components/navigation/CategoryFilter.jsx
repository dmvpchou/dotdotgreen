import React from "react";

/**
 * 分類篩選 — 品牌牆的 React island (client:load)。
 * chip 帶分類色點，選中時填入分類色。全部/food/craft/tribe/weekday。
 */
const OPTIONS = [
  { key: "all", label: "全部", dot: "var(--ink)" },
  { key: "food", label: "食品蔬果", dot: "var(--cat-food)" },
  { key: "craft", label: "手作", dot: "var(--cat-craft)" },
  { key: "tribe", label: "部落", dot: "var(--cat-tribe)" },
  { key: "weekday", label: "週間攤車", dot: "var(--cat-weekday)" },
];

export function CategoryFilter({ value = "all", onChange, counts = {}, style, ...rest }) {
  return (
    <div
      role="tablist"
      aria-label="品牌分類篩選"
      style={{ display: "flex", flexWrap: "wrap", gap: 10, ...style }}
      {...rest}
    >
      {OPTIONS.map((o) => {
        const active = value === o.key;
        return (
          <button
            key={o.key}
            role="tab"
            aria-selected={active}
            onClick={() => onChange && onChange(o.key)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "8px 16px",
              fontFamily: "var(--font-body)", fontSize: "var(--fs-sm)", fontWeight: 500,
              color: active ? "var(--paper)" : "var(--text-strong)",
              background: active ? "var(--ink)" : "var(--surface-card)",
              border: `1.5px solid ${active ? "var(--ink)" : "var(--border)"}`,
              borderRadius: "var(--r-pill)",
              cursor: "pointer",
              transition: "background .16s ease, color .16s ease, border-color .16s ease",
            }}
          >
            <span style={{
              width: 9, height: 9, borderRadius: 999, flex: "none",
              background: active && o.key === "all" ? "var(--honey)" : o.dot,
            }} />
            {o.label}
            {counts[o.key] != null ? (
              <span style={{ fontSize: 12, opacity: 0.6, fontVariantNumeric: "tabular-nums" }}>{counts[o.key]}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

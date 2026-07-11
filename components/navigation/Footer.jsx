import React from "react";

/**
 * 全站頁尾 — 深林綠底。散點裝飾 + 導覽 + 姊妹市集 + 協會連結。
 */
const COLS = [
  { title: "逛市集", links: [["品牌牆", "/brands"], ["市集資訊", "/info"], ["本週出攤", "https://ddg.gdg.asia/"]] },
  { title: "認識我們", links: [["關於點點綠", "/about"], ["加入我們", "/join"], ["FB 粉專", "https://www.facebook.com/dotgreenmarket/"]] },
];

export function Footer({ style, ...rest }) {
  return (
    <footer
      style={{
        position: "relative",
        background: "var(--surface-ink)",
        color: "var(--text-invert)",
        fontFamily: "var(--font-body)",
        padding: "56px 24px 32px",
        overflow: "hidden",
        ...style,
      }}
      {...rest}
    >
      {/* 散點裝飾 */}
      <span style={{ position: "absolute", top: -30, right: 40, width: 120, height: 120, borderRadius: 999, background: "color-mix(in srgb, var(--honey) 22%, transparent)" }} />
      <span style={{ position: "absolute", bottom: 40, right: 160, width: 40, height: 40, borderRadius: 999, background: "color-mix(in srgb, var(--leaf) 30%, transparent)" }} />

      <div style={{ position: "relative", maxWidth: "var(--container)", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 48, justifyContent: "space-between" }}>
        <div style={{ maxWidth: 320 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ display: "inline-flex", gap: 4 }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--cat-food)" }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--cat-tribe)" }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--cat-craft)" }} />
            </span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 22 }}>點點綠</span>
          </div>
          <p style={{ margin: 0, fontSize: "var(--fs-sm)", lineHeight: 1.7, color: "color-mix(in srgb, var(--paper) 75%, transparent)" }}>
            每個點都有一個永續的故事。<br />
            雙連捷運站週末市集 · 士林／石牌站週間小農攤車。<br />
            水花園有機農學市集的姊妹市集。
          </p>
        </div>

        {COLS.map((col) => (
          <div key={col.title} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span style={{ fontSize: "var(--fs-xs)", letterSpacing: "0.1em", color: "var(--honey)", fontWeight: 500 }}>{col.title}</span>
            {col.links.map(([label, href]) => (
              <a key={label} href={href} style={{ fontSize: "var(--fs-sm)", color: "color-mix(in srgb, var(--paper) 82%, transparent)", textDecoration: "none" }}>{label}</a>
            ))}
          </div>
        ))}
      </div>

      <div style={{ position: "relative", maxWidth: "var(--container)", margin: "40px auto 0", paddingTop: 20, borderTop: "1px solid color-mix(in srgb, var(--paper) 16%, transparent)", display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", fontSize: "var(--fs-xs)", color: "color-mix(in srgb, var(--paper) 55%, transparent)" }}>
        <span>© 2026 點點綠市集 · 台北市文化探索協會</span>
        <span>與 <a href="https://ddg.gdg.asia/" style={{ color: "inherit" }}>協會官網</a> 共存互連</span>
      </div>
    </footer>
  );
}

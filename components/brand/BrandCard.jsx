import React from "react";
import { CategoryTag } from "../feedback/CategoryTag.jsx";

/**
 * 品牌卡 — 品牌牆的基本單位（「櫥窗」）。
 * 圖片區用佔位條紋（上線前替換攤友授權照）。角落分類色點，外連社群。
 */
const DOT = {
  food: "var(--cat-food)", craft: "var(--cat-craft)",
  tribe: "var(--cat-tribe)", weekday: "var(--cat-weekday)",
};

function Social({ href, children }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 30, height: 30, borderRadius: 999,
        border: "1px solid var(--border)", color: "var(--text-muted)",
        fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700,
        textDecoration: "none", background: "var(--surface-card)",
      }}
    >
      {children}
    </a>
  );
}

export function BrandCard({
  name,
  tagline,
  category = "food",
  image,
  facebook,
  instagram,
  line,
  website,
  attendDays,
  featured = false,
  flipping = false,
  style,
  ...rest
}) {
  const accent = DOT[category];
  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-card)",
        overflow: "hidden",
        boxShadow: "var(--shadow-sm)",
        transformStyle: "preserve-3d",
        transform: flipping ? "perspective(1000px) rotateY(90deg)" : "perspective(1000px) rotateY(0deg)",
        transition: "box-shadow .2s ease, transform .34s cubic-bezier(.5,0,.5,1)",
        ...style,
      }}
      onMouseEnter={(e) => { if (flipping) return; e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.transform = "perspective(1000px) translateY(-3px)"; }}
      onMouseLeave={(e) => { if (flipping) return; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.transform = "perspective(1000px) rotateY(0deg)"; }}
      {...rest}
    >
      {/* 影像區 (佔位) */}
      <div
        style={{
          position: "relative",
          aspectRatio: "4 / 3",
          background: image
            ? `center/cover no-repeat url(${image})`
            : `repeating-linear-gradient(135deg, var(--paper-lo) 0 10px, var(--paper-hi) 10px 20px)`,
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          padding: 12,
        }}
      >
        {!image ? (
          <span style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.04em",
          }}>brand photo</span>
        ) : null}
        {/* 簽名色點 */}
        <span style={{
          position: "absolute", top: 12, left: 12,
          width: 16, height: 16, borderRadius: 999, background: accent,
          boxShadow: "0 0 0 4px color-mix(in srgb, var(--paper) 65%, transparent)",
        }} />
        {featured ? (
          <span style={{
            position: "absolute", top: 10, right: 10,
            padding: "3px 9px", borderRadius: 999,
            background: "var(--ink)", color: "var(--paper)",
            fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 500,
          }}>精選</span>
        ) : null}
      </div>

      {/* 內容 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "16px 16px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <h3 style={{
            margin: 0, fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "var(--fs-h3)", color: "var(--text-strong)", lineHeight: 1.25,
          }}>{name}</h3>
          <CategoryTag category={category} />
        </div>
        <p style={{
          margin: 0, fontFamily: "var(--font-body)", fontWeight: 300,
          fontSize: "var(--fs-sm)", lineHeight: 1.65, color: "var(--text-body)",
        }}>{tagline}</p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
          <div style={{ display: "flex", gap: 6 }}>
            <Social href={facebook}>f</Social>
            <Social href={instagram}>IG</Social>
            <Social href={line}>L</Social>
            <Social href={website}>↗</Social>
          </div>
          {attendDays && attendDays.length ? (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontFamily: "var(--font-body)", fontSize: "var(--fs-xs)", color: "var(--text-muted)",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: accent }} />
              出攤 {attendDays.join("・")}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

import React, { useEffect, useState } from "react";
import { CategoryTag } from "../feedback/CategoryTag.jsx";
import { Button } from "../buttons/Button.jsx";

/**
 * 品牌詳情 — 桌機置中彈窗 / 手機底部 sheet。點品牌卡開啟，放長介紹與全部社群。
 */
const DOT = { food: "var(--cat-food)", craft: "var(--cat-craft)", tribe: "var(--cat-tribe)", weekday: "var(--cat-weekday)" };
const SOCIALS = [
  ["facebook", "Facebook", "f"], ["instagram", "Instagram", "IG"],
  ["line", "LINE", "LINE"], ["website", "官網", "↗"],
];

function useIsMobile() {
  const [m, setM] = useState(typeof window !== "undefined" && window.innerWidth < 640);
  useEffect(() => {
    const on = () => setM(window.innerWidth < 640);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return m;
}

export function BrandSheet({ brand, open, onClose }) {
  const isMobile = useIsMobile();
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !brand) return null;
  const accent = DOT[brand.category] || "var(--leaf)";
  const links = SOCIALS.filter(([k]) => brand[k]);

  const panel = isMobile
    ? { position: "fixed", left: 0, right: 0, bottom: 0, borderRadius: "20px 20px 0 0", maxHeight: "88vh", animation: "sheetUp .28s cubic-bezier(.2,.8,.2,1)" }
    : { position: "relative", width: "min(460px, 92vw)", borderRadius: "var(--r-lg)", maxHeight: "88vh", animation: "sheetIn .22s ease" };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "color-mix(in srgb, var(--ink-900) 42%, transparent)",
        display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center",
        padding: isMobile ? 0 : 24, fontFamily: "var(--font-body)",
      }}
    >
      <style>{`@keyframes sheetUp{from{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes sheetIn{from{transform:translateY(12px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ ...panel, background: "var(--surface-card)", overflow: "auto", boxShadow: "var(--shadow-lg)" }}
      >
        {/* 影像頭 */}
        <div style={{ position: "relative", height: 168, background: brand.image ? `center/cover url(${brand.image})` : "repeating-linear-gradient(135deg, var(--paper-lo) 0 12px, var(--paper-hi) 12px 24px)" }}>
          {isMobile ? <span style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 40, height: 4, borderRadius: 999, background: "color-mix(in srgb, var(--ink) 25%, transparent)" }} /> : null}
          <span style={{ position: "absolute", left: 20, bottom: -18, width: 40, height: 40, borderRadius: 999, background: accent, boxShadow: "0 0 0 5px var(--surface-card)" }} />
          {!brand.image ? <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>brand photo</span> : null}
        </div>

        <div style={{ padding: "30px 24px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
            <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "var(--fs-h1)", color: "var(--text-strong)" }}>{brand.name}</h2>
            <CategoryTag category={brand.category} solid />
          </div>

          {brand.attendDays && brand.attendDays.length ? (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16, fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: accent }} />
              出攤日　週{brand.attendDays.join("・")}
            </div>
          ) : null}

          <p style={{ margin: "0 0 22px", fontSize: "var(--fs-body)", fontWeight: 300, lineHeight: 1.85, color: "var(--text-body)" }}>
            {brand.about || brand.tagline}
          </p>

          {links.length ? (
            <>
              <div style={{ fontSize: "var(--fs-xs)", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: 10 }}>追蹤這個品牌</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 22 }}>
                {links.map(([k, label, glyph]) => (
                  <a key={k} href={brand[k]} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", border: "1px solid var(--border)", borderRadius: "var(--r-pill)", fontSize: "var(--fs-sm)", color: "var(--text-strong)", textDecoration: "none" }}>
                    <span style={{ fontWeight: 700, fontSize: 12, color: accent }}>{glyph}</span>{label}
                  </a>
                ))}
              </div>
            </>
          ) : null}

          <Button variant="primary" fullWidth dot as="a" href={brand.facebook || brand.instagram || brand.website || "#"} target="_blank" rel="noopener noreferrer">前往品牌社群</Button>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";

/**
 * 全站導覽列 — 文字 wordmark（logo 待上傳）+ 三色點簇 + 頁面連結 + CTA。
 * 簽名：wordmark 前的三色點簇 (food/tribe/craft)。
 * 手機（≤760px）收合為漢堡選單。
 */
const NAV = [
  { label: "品牌牆", href: "/brands" },
  { label: "關於", href: "/about" },
  { label: "市集資訊", href: "/info" },
  { label: "加入我們", href: "/join" },
];

function useNarrow(bp = 760) {
  const [n, setN] = useState(typeof window !== "undefined" && window.innerWidth <= bp);
  useEffect(() => {
    const on = () => setN(window.innerWidth <= bp);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, [bp]);
  return n;
}

export function Navbar({ current = "/", brand = "點點綠", cta = "本週出攤", ctaHref = "/calendar", onNavigate, style, ...rest }) {
  const narrow = useNarrow();
  const [open, setOpen] = useState(false);
  const go = (href) => (e) => { setOpen(false); if (onNavigate) { e.preventDefault(); onNavigate(href); } };

  const ctaLink = (
    <a
      href={ctaHref}
      onClick={go(ctaHref)}
      style={{
        padding: "10px 20px",
        fontSize: "var(--fs-sm)", fontWeight: 500,
        color: "var(--paper)", background: "var(--ink)",
        borderRadius: "var(--r-pill)", textDecoration: "none",
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--honey)" }} />
      {cta}
    </a>
  );

  return (
    <header
      style={{
        position: "sticky", top: 0, zIndex: 50,
        height: "var(--header-h)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px",
        background: "color-mix(in srgb, var(--paper) 88%, transparent)",
        backdropFilter: "saturate(1.1) blur(10px)",
        borderBottom: "1px solid var(--border)",
        fontFamily: "var(--font-body)",
        ...style,
      }}
      {...rest}
    >
      {/* Wordmark（logo 佔位） */}
      <a href="/" onClick={go("/")} style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <span style={{ display: "inline-flex", gap: 4 }}>
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--cat-food)" }} />
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--cat-tribe)" }} />
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--cat-craft)" }} />
        </span>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 22, color: "var(--ink)", letterSpacing: "0.02em" }}>
          {brand}
        </span>
      </a>

      {narrow ? (
        /* 漢堡按鈕 */
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="選單"
          aria-expanded={open}
          style={{
            width: 42, height: 42, borderRadius: "var(--r-pill)",
            border: "1px solid var(--border)", background: "var(--surface-card)",
            display: "inline-flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
            cursor: "pointer", padding: 0,
          }}
        >
          <span style={{ width: 17, height: 2, borderRadius: 2, background: "var(--ink)", transition: "transform .2s", transform: open ? "translateY(6px) rotate(45deg)" : "none" }} />
          <span style={{ width: 17, height: 2, borderRadius: 2, background: "var(--ink)", opacity: open ? 0 : 1, transition: "opacity .2s" }} />
          <span style={{ width: 17, height: 2, borderRadius: 2, background: "var(--ink)", transition: "transform .2s", transform: open ? "translateY(-6px) rotate(-45deg)" : "none" }} />
        </button>
      ) : (
        /* 桌機水平選單 */
        <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {NAV.map((n) => {
            const active = current === n.href;
            return (
              <a
                key={n.href}
                href={n.href}
                onClick={go(n.href)}
                style={{
                  position: "relative",
                  padding: "8px 14px",
                  fontSize: "var(--fs-sm)", fontWeight: active ? 700 : 400,
                  color: active ? "var(--ink)" : "var(--text-body)",
                  textDecoration: "none", borderRadius: "var(--r-pill)",
                }}
              >
                {n.label}
                {active ? (
                  <span style={{ position: "absolute", left: "50%", bottom: 2, transform: "translateX(-50%)", width: 6, height: 6, borderRadius: 999, background: "var(--leaf)" }} />
                ) : null}
              </a>
            );
          })}
          <span style={{ marginLeft: 10 }}>{ctaLink}</span>
        </nav>
      )}

      {/* 手機下拉面板 */}
      {narrow && open ? (
        <div
          style={{
            position: "absolute", top: "var(--header-h)", left: 0, right: 0,
            background: "var(--surface-card)", borderBottom: "1px solid var(--border)",
            boxShadow: "var(--shadow-md)",
            padding: "12px 24px 20px",
            display: "flex", flexDirection: "column", gap: 4,
            animation: "navdrop .2s ease",
          }}
        >
          <style>{`@keyframes navdrop{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>
          {NAV.map((n) => {
            const active = current === n.href;
            return (
              <a
                key={n.href}
                href={n.href}
                onClick={go(n.href)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "14px 8px",
                  fontSize: "var(--fs-lg)", fontWeight: active ? 700 : 400,
                  color: active ? "var(--ink)" : "var(--text-body)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: 999, background: active ? "var(--leaf)" : "var(--border-strong)" }} />
                {n.label}
              </a>
            );
          })}
          <div style={{ marginTop: 12 }}>{ctaLink}</div>
        </div>
      ) : null}
    </header>
  );
}

import React, { useState } from "react";
import { Navbar } from "../../components/navigation/Navbar.jsx";
import { Footer } from "../../components/navigation/Footer.jsx";
import { SectionHeader } from "../../components/layout/SectionHeader.jsx";
import { BrandCard } from "../../components/brand/BrandCard.jsx";
import { BrandSheet } from "../../components/brand/BrandSheet.jsx";
import { Button } from "../../components/buttons/Button.jsx";
import { BRANDS, MARKETS } from "./data.js";

const wrap = { maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" };

function ScatterDot({ top, left, right, bottom, size, color, o = 1 }) {
  return <span style={{ position: "absolute", top, left, right, bottom, width: size, height: size, borderRadius: 999, background: color, opacity: o }} />;
}

export function Home({ onNavigate = () => {} }) {
  const featured = BRANDS.filter((b) => b.featured).slice(0, 4);
  const [sel, setSel] = useState(null);
  const [flip, setFlip] = useState(null);
  const openBrand = (b) => { setFlip(b.name); setTimeout(() => { setSel(b); setFlip(null); }, 340); };
  return (
    <div style={{ background: "var(--paper)", fontFamily: "var(--font-body)", color: "var(--text-body)" }}>
      <Navbar current="/" onNavigate={onNavigate} />

      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", padding: "80px 0 72px" }}>
        <ScatterDot top={70} right={120} size={140} color="color-mix(in srgb, var(--honey) 26%, transparent)" />
        <ScatterDot top={220} right={330} size={44} color="var(--leaf)" o={0.5} />
        <ScatterDot bottom={40} right={80} size={24} color="var(--clay)" o={0.7} />
        <ScatterDot top={140} left={60} size={18} color="var(--leaf)" o={0.6} />
        <div style={{ ...wrap, position: "relative" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: "var(--fs-sm)", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: 22 }}>
            <span style={{ display: "inline-flex", gap: 4 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--cat-food)" }} />
              <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--cat-tribe)" }} />
              <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--cat-craft)" }} />
            </span>
            雙連捷運站 · 台北的雙市集
          </span>
          <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(40px, 6vw, 68px)", lineHeight: 1.12, letterSpacing: "-0.01em", color: "var(--ink)", maxWidth: 720, textWrap: "balance" }}>
            每個點都有一個<br />永續的故事
          </h1>
          <p style={{ margin: "22px 0 0", fontSize: "var(--fs-lg)", fontWeight: 300, lineHeight: 1.8, maxWidth: 520 }}>
            無毒、環保、永續，台灣優質小農商品的櫥窗。搭捷運也能買菜，一出捷運就到。
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 34, flexWrap: "wrap" }}>
            <Button variant="primary" size="lg" onClick={() => onNavigate("/brands")}>逛品牌牆</Button>
            <Button variant="secondary" size="lg" dot dotColor="var(--leaf)" onClick={() => onNavigate("/info")}>市集資訊</Button>
          </div>
        </div>
      </section>

      {/* 雙市集 */}
      <section style={{ ...wrap, padding: "40px 24px 8px" }}>
        <SectionHeader eyebrow="台灣獨特的雙市集" title="週末逛市集，週間找攤車" dotCategory="tribe" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 22, marginTop: 28 }}>
          {MARKETS.map((m) => (
            <article key={m.key} style={{ position: "relative", overflow: "hidden", background: "var(--surface-card)", border: "1px solid var(--border)", borderRadius: "var(--r-card)", padding: "28px 26px" }}>
              <span style={{ position: "absolute", top: -20, right: -20, width: 96, height: 96, borderRadius: 999, background: m.category === "food" ? "var(--cat-food-bg)" : "var(--cat-weekday-bg)" }} />
              <span style={{ position: "relative", display: "inline-block", width: 18, height: 18, borderRadius: 999, background: `var(--cat-${m.category})`, marginBottom: 16 }} />
              <h3 style={{ position: "relative", margin: "0 0 14px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--fs-h2)", color: "var(--text-strong)" }}>{m.title}</h3>
              <dl style={{ position: "relative", margin: 0, display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px 16px", fontSize: "var(--fs-body)" }}>
                <dt style={{ color: "var(--text-muted)" }}>地點</dt><dd style={{ margin: 0, color: "var(--text-strong)" }}>{m.where}</dd>
                <dt style={{ color: "var(--text-muted)" }}>時間</dt><dd style={{ margin: 0, color: "var(--text-strong)" }}>{m.when}</dd>
              </dl>
              <p style={{ position: "relative", margin: "16px 0 0", fontSize: "var(--fs-sm)", color: "var(--text-muted)", lineHeight: 1.7 }}>{m.note}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 精選品牌 */}
      <section style={{ ...wrap, padding: "56px 24px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <SectionHeader eyebrow="品牌牆" title="每個點背後都有努力的人" dotCategory="food" />
          <Button variant="ghost" onClick={() => onNavigate("/brands")}>看全部品牌 →</Button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 22, marginTop: 28 }}>
          {featured.map((b) => <BrandCard key={b.name} {...b} flipping={flip === b.name} style={{ cursor: "pointer" }} onClick={() => openBrand(b)} />)}
        </div>
      </section>

      {/* 加入我們 band */}
      <section style={{ position: "relative", overflow: "hidden", background: "var(--surface-ink)", color: "var(--text-invert)", padding: "72px 0" }}>
        <ScatterDot top={-30} left={60} size={120} color="color-mix(in srgb, var(--honey) 24%, transparent)" />
        <ScatterDot bottom={30} right={120} size={60} color="color-mix(in srgb, var(--leaf) 34%, transparent)" />
        <div style={{ ...wrap, position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 560 }}>
            <SectionHeader eyebrow="加入我們" title="成為下一個點" dotCategory="tribe" invert />
            <p style={{ margin: "16px 0 0", fontSize: "var(--fs-lg)", fontWeight: 300, lineHeight: 1.8, color: "color-mix(in srgb, var(--paper) 78%, transparent)" }}>
              小農的微型店面網絡，正在雙連、士林、石牌長出來。歡迎友善耕作、部落與手作夥伴一起擺攤。
            </p>
          </div>
          <Button variant="onInk" size="lg" dot onClick={() => onNavigate("/join")}>了解如何加入</Button>
        </div>
      </section>

      <Footer />
      <BrandSheet brand={sel} open={!!sel} onClose={() => setSel(null)} />
    </div>
  );
}

import React, { useState, useMemo } from "react";
import { Navbar } from "../../components/navigation/Navbar.jsx";
import { Footer } from "../../components/navigation/Footer.jsx";
import { SectionHeader } from "../../components/layout/SectionHeader.jsx";
import { BrandCard } from "../../components/brand/BrandCard.jsx";
import { CategoryFilter } from "../../components/navigation/CategoryFilter.jsx";
import { BrandSheet } from "../../components/brand/BrandSheet.jsx";
import { BRANDS } from "./data.js";

const wrap = { maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" };

export function Brands({ onNavigate = () => {} }) {
  const [cat, setCat] = useState("all");
  const [sel, setSel] = useState(null);
  const [flip, setFlip] = useState(null);
  const openBrand = (b) => {
    setFlip(b.name);
    setTimeout(() => { setSel(b); setFlip(null); }, 340);
  };
  const counts = useMemo(() => {
    const c = { all: BRANDS.length };
    for (const b of BRANDS) c[b.category] = (c[b.category] || 0) + 1;
    return c;
  }, []);
  const list = cat === "all" ? BRANDS : BRANDS.filter((b) => b.category === cat);

  return (
    <div style={{ background: "var(--paper)", fontFamily: "var(--font-body)", color: "var(--text-body)", minHeight: "100vh" }}>
      <Navbar current="/brands" onNavigate={onNavigate} />

      {/* Header */}
      <section style={{ position: "relative", overflow: "hidden", padding: "56px 0 8px" }}>
        <span style={{ position: "absolute", top: 30, right: 90, width: 90, height: 90, borderRadius: 999, background: "color-mix(in srgb, var(--leaf) 20%, transparent)" }} />
        <div style={{ ...wrap, position: "relative" }}>
          <SectionHeader eyebrow="台灣優質小農商品的櫥窗" title="品牌牆" dotCategory="food" />
          <p style={{ margin: "14px 0 0", fontSize: "var(--fs-lg)", fontWeight: 300, maxWidth: 560, lineHeight: 1.8 }}>
            每個點背後都有努力的人。點進色點，認識這些友善耕作、部落與手作的夥伴，直接連上他們的社群。
          </p>
        </div>
      </section>

      {/* Filter */}
      <section style={{ ...wrap, position: "sticky", top: "var(--header-h)", zIndex: 20, padding: "20px 24px", background: "color-mix(in srgb, var(--paper) 92%, transparent)", backdropFilter: "blur(8px)" }}>
        <CategoryFilter value={cat} onChange={setCat} counts={counts} />
      </section>

      {/* Grid */}
      <section style={{ ...wrap, padding: "12px 24px 64px" }}>
        <p style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)", margin: "0 0 20px" }}>
          {list.length} 個品牌
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(248px, 1fr))", gap: 22 }}>
          {list.map((b) => <BrandCard key={b.name} {...b} flipping={flip === b.name} style={{ cursor: "pointer" }} onClick={() => openBrand(b)} />)}
        </div>

        {/* 收集攤友資料的提示卡 */}
        <div style={{ marginTop: 28, padding: "22px 24px", border: "1.5px dashed var(--border-strong)", borderRadius: "var(--r-card)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)", lineHeight: 1.7 }}>
            品牌照與社群連結持續向攤友收集中，部分卡片先以佔位呈現。
          </span>
          <a href="https://forms.gle/ERn1sAgP4shYkeKB8" target="_blank" rel="noopener noreferrer" style={{ fontSize: "var(--fs-sm)", fontWeight: 500, color: "var(--ink)", textDecoration: "none", whiteSpace: "nowrap" }}>是攤友？補上資料 →</a>
        </div>
      </section>

      <Footer />
      <BrandSheet brand={sel} open={!!sel} onClose={() => setSel(null)} />
    </div>
  );
}

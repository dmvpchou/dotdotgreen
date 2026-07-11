import React from "react";
import { Navbar } from "../../components/navigation/Navbar.jsx";
import { Footer } from "../../components/navigation/Footer.jsx";
import { SectionHeader } from "../../components/layout/SectionHeader.jsx";
import { Button } from "../../components/buttons/Button.jsx";

const wrap = { maxWidth: "var(--container-narrow)", margin: "0 auto", padding: "0 24px" };

const TIMELINE = [
  { year: "2024.05", dot: "var(--cat-tribe)", text: "台北捷運公司與台北市文化探索協會首度合作，宣布 6 月起試營運。" },
  { year: "2024.06", dot: "var(--cat-food)", text: "定位為 ESG 環保友善市集，產地直送在地小農，使用國產木材打造環保攤車。" },
  { year: "2025.01", dot: "var(--cat-craft)", text: "綠媒體專題報導「搭捷運也能買菜」，雙市集模式完整曝光。" },
];

const PRESS = [
  { outlet: "台北市政府新聞稿", note: "捷運 × 文化探索協會首度合作 · 2024/05", href: "#" },
  { outlet: "綠媒體 Green Media", note: "捷運站邂逅高山蔬果 · 2025/01", href: "#" },
  { outlet: "綠媒體 Green Media", note: "捷運站遇見綠色好味道 · 2025/01", href: "#" },
];

export function About({ onNavigate = () => {} }) {
  return (
    <div style={{ background: "var(--paper)", fontFamily: "var(--font-body)", color: "var(--text-body)" }}>
      <Navbar current="/about" onNavigate={onNavigate} />

      {/* Hero quote */}
      <section style={{ position: "relative", overflow: "hidden", padding: "72px 0 48px", background: "var(--surface-sunken)" }}>
        <span style={{ position: "absolute", top: 40, right: 80, width: 120, height: 120, borderRadius: 999, background: "color-mix(in srgb, var(--honey) 22%, transparent)" }} />
        <span style={{ position: "absolute", bottom: 30, left: 100, width: 40, height: 40, borderRadius: 999, background: "color-mix(in srgb, var(--leaf) 32%, transparent)" }} />
        <div style={{ ...wrap, position: "relative", textAlign: "center" }}>
          <span style={{ fontSize: "var(--fs-sm)", letterSpacing: "0.08em", color: "var(--text-muted)" }}>關於點點綠</span>
          <p style={{ margin: "18px auto 0", fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(28px, 4.5vw, 44px)", lineHeight: 1.3, color: "var(--ink)", maxWidth: 620, textWrap: "balance" }}>
            「搭捷運也能買菜」——<br />把在地小農，帶到你回家的路上。
          </p>
        </div>
      </section>

      {/* 起源 */}
      <section style={{ ...wrap, padding: "56px 24px" }}>
        <SectionHeader eyebrow="起源故事" title="從一次捷運上的合作開始" dotCategory="tribe" />
        <p style={{ margin: "18px 0 0", fontSize: "var(--fs-lg)", fontWeight: 300, lineHeight: 1.9 }}>
          點點綠市集是台北捷運公司與台北市文化探索協會的合作。以 ESG 環保友善為定位，讓在地小農產地直送，
          用國產木材打造的環保攤車，出現在你每天經過的捷運站出口。
        </p>
        <div style={{ marginTop: 34, display: "flex", flexDirection: "column", gap: 0 }}>
          {TIMELINE.map((t, i) => (
            <div key={t.year} style={{ display: "grid", gridTemplateColumns: "88px 28px 1fr", alignItems: "flex-start", gap: 14 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-muted)", paddingTop: 2, textAlign: "right" }}>{t.year}</span>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ width: 14, height: 14, borderRadius: 999, background: t.dot, marginTop: 3 }} />
                {i < TIMELINE.length - 1 ? <span style={{ width: 2, flex: 1, minHeight: 40, background: "var(--border)" }} /> : null}
              </div>
              <p style={{ margin: "0 0 26px", fontSize: "var(--fs-body)", lineHeight: 1.8 }}>{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 雙市集 + 姊妹市集 */}
      <section style={{ background: "var(--surface-sunken)", padding: "56px 0" }}>
        <div style={wrap}>
          <SectionHeader eyebrow="台灣獨特的雙市集" title="週末的市集，週間的微型店面網絡" dotCategory="food" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginTop: 26 }}>
            <div style={{ background: "var(--surface-card)", border: "1px solid var(--border)", borderRadius: "var(--r-card)", padding: "24px" }}>
              <span style={{ display: "inline-block", width: 14, height: 14, borderRadius: 999, background: "var(--cat-food)", marginBottom: 12 }} />
              <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--fs-h3)", color: "var(--text-strong)" }}>假日市集</h3>
              <p style={{ margin: 0, fontSize: "var(--fs-sm)", lineHeight: 1.8, color: "var(--text-body)" }}>雙連站週末聚集的完整市集，逛得到食品蔬果、部落與手作。</p>
            </div>
            <div style={{ background: "var(--surface-card)", border: "1px solid var(--border)", borderRadius: "var(--r-card)", padding: "24px" }}>
              <span style={{ display: "inline-block", width: 14, height: 14, borderRadius: 999, background: "var(--cat-weekday)", marginBottom: 12 }} />
              <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--fs-h3)", color: "var(--text-strong)" }}>週間攤車</h3>
              <p style={{ margin: 0, fontSize: "var(--fs-sm)", lineHeight: 1.8, color: "var(--text-body)" }}>散落在雙連、士林、石牌的小農攤車，是小農的微型店面網絡。</p>
            </div>
          </div>
          <p style={{ margin: "24px 0 0", fontSize: "var(--fs-body)", color: "var(--text-muted)", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--leaf)" }} />
            點點綠是水花園有機農學市集的姊妹市集。
          </p>
        </div>
      </section>

      {/* 媒體報導 */}
      <section style={{ ...wrap, padding: "56px 24px" }}>
        <SectionHeader eyebrow="媒體報導" title="第三方怎麼說" dotCategory="craft" />
        <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 22 }}>
          {PRESS.map((p) => (
            <a key={p.outlet + p.note} href={p.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "18px 4px", borderTop: "1px solid var(--border)", textDecoration: "none", color: "var(--text-strong)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--clay)" }} />
                <span style={{ fontWeight: 500 }}>{p.outlet}</span>
                <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>{p.note}</span>
              </span>
              <span style={{ color: "var(--text-muted)" }}>↗</span>
            </a>
          ))}
        </div>
        <div style={{ marginTop: 40, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Button variant="primary" onClick={() => onNavigate("/join")}>加入我們</Button>
          <Button variant="secondary" as="a" href="https://ddg.gdg.asia/" target="_blank" rel="noopener noreferrer">協會官網</Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

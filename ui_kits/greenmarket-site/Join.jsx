import React from "react";
import { Navbar } from "../../components/navigation/Navbar.jsx";
import { Footer } from "../../components/navigation/Footer.jsx";
import { SectionHeader } from "../../components/layout/SectionHeader.jsx";
import { Button } from "../../components/buttons/Button.jsx";

const wrap = { maxWidth: "var(--container-narrow)", margin: "0 auto", padding: "0 24px" };

const VALUES = [
  { dot: "var(--cat-food)", title: "友善耕作", text: "無毒、環保、永續，是我們對每個攤位的期待。" },
  { dot: "var(--cat-tribe)", title: "產地直送", text: "從你的田到捷運站出口，中間不多繞路。" },
  { dot: "var(--cat-craft)", title: "微型店面網絡", text: "週間攤車讓你有穩定的客群與露出，不只是一次性擺攤。" },
];

const STEPS = [
  { n: "01", title: "認識點點綠", text: "先看看品牌牆與市集資訊，確認我們的調性與你合拍。" },
  { n: "02", title: "讀招募說明", text: "攤位規則、費用與環保攤車配置，都在 Canva 招募說明裡。", link: { label: "看招募說明（Canva）", href: "https://greenfarmersmarket.my.canva.site/" } },
  { n: "03", title: "填申請表單", text: "新夥伴填申請表，我們會與你聯繫安排；舊夥伴走報名表。", link: { label: "新夥伴申請表", href: "https://forms.gle/ERn1sAgP4shYkeKB8" } },
];

export function Join({ onNavigate = () => {} }) {
  return (
    <div style={{ background: "var(--paper)", fontFamily: "var(--font-body)", color: "var(--text-body)" }}>
      <Navbar current="/join" onNavigate={onNavigate} />

      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", background: "var(--surface-ink)", color: "var(--text-invert)", padding: "76px 0" }}>
        <span style={{ position: "absolute", top: -30, right: 80, width: 140, height: 140, borderRadius: 999, background: "color-mix(in srgb, var(--honey) 22%, transparent)" }} />
        <span style={{ position: "absolute", bottom: 20, left: 120, width: 46, height: 46, borderRadius: 999, background: "color-mix(in srgb, var(--leaf) 34%, transparent)" }} />
        <span style={{ position: "absolute", top: 90, left: 60, width: 20, height: 20, borderRadius: 999, background: "color-mix(in srgb, var(--clay) 60%, transparent)" }} />
        <div style={{ ...wrap, position: "relative" }}>
          <SectionHeader eyebrow="加入我們" title="成為下一個點" dotCategory="tribe" invert />
          <p style={{ margin: "18px 0 0", fontSize: "var(--fs-lg)", fontWeight: 300, lineHeight: 1.85, maxWidth: 520, color: "color-mix(in srgb, var(--paper) 80%, transparent)" }}>
            每個點背後都有努力的人。如果你正在友善耕作、做部落好物或手作，歡迎成為點點綠的一份子。
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 30, flexWrap: "wrap" }}>
            <Button variant="onInk" size="lg" dot as="a" href="https://forms.gle/ERn1sAgP4shYkeKB8" target="_blank" rel="noopener noreferrer">新夥伴申請</Button>
            <Button variant="ghost" size="lg" as="a" href="https://forms.gle/5fJdZomZ396gduh49" target="_blank" rel="noopener noreferrer" style={{ color: "var(--paper)" }}>舊夥伴報名 →</Button>
          </div>
        </div>
      </section>

      {/* 為什麼加入 */}
      <section style={{ ...wrap, padding: "56px 24px" }}>
        <SectionHeader eyebrow="為什麼加入" title="不只是擺攤，是一個網絡" dotCategory="food" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginTop: 28 }}>
          {VALUES.map((v) => (
            <div key={v.title} style={{ background: "var(--surface-card)", border: "1px solid var(--border)", borderRadius: "var(--r-card)", padding: "24px" }}>
              <span style={{ display: "inline-block", width: 16, height: 16, borderRadius: 999, background: v.dot, marginBottom: 14 }} />
              <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--fs-h3)", color: "var(--text-strong)" }}>{v.title}</h3>
              <p style={{ margin: 0, fontSize: "var(--fs-sm)", lineHeight: 1.8, color: "var(--text-body)" }}>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 三步驟 */}
      <section style={{ background: "var(--surface-sunken)", padding: "56px 0" }}>
        <div style={wrap}>
          <SectionHeader eyebrow="怎麼加入" title="三步驟，我們一起準備" dotCategory="craft" />
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 28 }}>
            {STEPS.map((s) => (
              <div key={s.n} style={{ display: "flex", gap: 20, alignItems: "flex-start", background: "var(--surface-card)", border: "1px solid var(--border)", borderRadius: "var(--r-card)", padding: "22px 24px" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 28, color: "var(--leaf)", lineHeight: 1, flex: "none" }}>{s.n}</span>
                <div>
                  <h3 style={{ margin: "0 0 6px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--fs-h3)", color: "var(--text-strong)" }}>{s.title}</h3>
                  <p style={{ margin: 0, fontSize: "var(--fs-body)", lineHeight: 1.8 }}>{s.text}</p>
                  {s.link ? (
                    <a href={s.link.href} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 12, fontSize: "var(--fs-sm)", fontWeight: 500, color: "var(--ink)", textDecoration: "none" }}>
                      <span style={{ width: 7, height: 7, borderRadius: 999, background: "var(--honey)" }} />{s.link.label} ↗
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 表單導流 */}
      <section style={{ ...wrap, padding: "56px 24px 72px", textAlign: "center" }}>
        <span style={{ display: "inline-flex", gap: 6, marginBottom: 18 }}>
          <span style={{ width: 12, height: 12, borderRadius: 999, background: "var(--cat-food)" }} />
          <span style={{ width: 12, height: 12, borderRadius: 999, background: "var(--cat-tribe)" }} />
          <span style={{ width: 12, height: 12, borderRadius: 999, background: "var(--cat-craft)" }} />
        </span>
        <h2 style={{ margin: "0 0 10px", fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "var(--fs-h1)", color: "var(--ink)" }}>準備好了嗎？</h2>
        <p style={{ margin: "0 auto 26px", fontSize: "var(--fs-lg)", fontWeight: 300, maxWidth: 460, lineHeight: 1.8 }}>
          填一份表單，讓我們認識你的品牌。有任何問題，也可以先到粉專私訊我們。
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Button variant="primary" size="lg" as="a" href="https://forms.gle/ERn1sAgP4shYkeKB8" target="_blank" rel="noopener noreferrer">前往申請表單</Button>
          <Button variant="secondary" size="lg" as="a" href="https://www.facebook.com/dotgreenmarket/" target="_blank" rel="noopener noreferrer">FB 粉專私訊</Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

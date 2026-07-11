import React, { useState } from "react";
import { Navbar } from "../../components/navigation/Navbar.jsx";
import { Footer } from "../../components/navigation/Footer.jsx";
import { SectionHeader } from "../../components/layout/SectionHeader.jsx";
import { BrandCard } from "../../components/brand/BrandCard.jsx";
import { BrandSheet } from "../../components/brand/BrandSheet.jsx";
import { Button } from "../../components/buttons/Button.jsx";
import { MARKETS, STATIONS, brandsAtStation } from "./data.js";

const wrap = { maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" };

export function Info({ onNavigate = () => {} }) {
  const [station, setStation] = useState(STATIONS[0].key);
  const [sel, setSel] = useState(null);
  const [flip, setFlip] = useState(null);
  const openBrand = (b) => { setFlip(b.name); setTimeout(() => { setSel(b); setFlip(null); }, 340); };

  const active = STATIONS.find((s) => s.key === station) || STATIONS[0];
  const vendors = brandsAtStation(station);

  return (
    <div style={{ background: "var(--paper)", fontFamily: "var(--font-body)", color: "var(--text-body)" }}>
      <Navbar current="/info" onNavigate={onNavigate} />

      <section style={{ position: "relative", overflow: "hidden", padding: "56px 0 8px" }}>
        <span style={{ position: "absolute", top: 20, right: 100, width: 100, height: 100, borderRadius: 999, background: "color-mix(in srgb, var(--honey) 20%, transparent)" }} />
        <div style={{ ...wrap, position: "relative" }}>
          <SectionHeader eyebrow="搭捷運也能買菜" title="市集資訊" dotCategory="food" />
          <p style={{ margin: "14px 0 0", fontSize: "var(--fs-lg)", fontWeight: 300, maxWidth: 560, lineHeight: 1.8 }}>
            一出捷運就到的有機早市。以下時間地點供參考，每日出攤店家名單以協會官網為準。
          </p>
        </div>
      </section>

      {/* 雙市集時間卡 */}
      <section style={{ ...wrap, padding: "36px 24px 8px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 22 }}>
          {MARKETS.map((m) => (
            <article key={m.key} style={{ position: "relative", overflow: "hidden", background: "var(--surface-card)", border: "1px solid var(--border)", borderRadius: "var(--r-card)", padding: "28px 26px" }}>
              <span style={{ position: "absolute", top: -24, right: -24, width: 100, height: 100, borderRadius: 999, background: m.category === "food" ? "var(--cat-food-bg)" : "var(--cat-weekday-bg)" }} />
              <span style={{ position: "relative", display: "inline-block", width: 18, height: 18, borderRadius: 999, background: `var(--cat-${m.category})`, marginBottom: 16 }} />
              <h3 style={{ position: "relative", margin: "0 0 16px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--fs-h2)", color: "var(--text-strong)" }}>{m.title}</h3>
              <dl style={{ position: "relative", margin: 0, display: "grid", gridTemplateColumns: "auto 1fr", gap: "10px 18px", fontSize: "var(--fs-body)" }}>
                <dt style={{ color: "var(--text-muted)" }}>時間</dt><dd style={{ margin: 0, color: "var(--text-strong)", fontWeight: 500 }}>{m.when}</dd>
                <dt style={{ color: "var(--text-muted)" }}>地點</dt><dd style={{ margin: 0, color: "var(--text-strong)" }}>{m.where}</dd>
              </dl>
              <p style={{ position: "relative", margin: "18px 0 0", padding: "12px 14px", background: "var(--surface-sunken)", borderRadius: "var(--r-md)", fontSize: "var(--fs-sm)", color: "var(--text-body)", lineHeight: 1.7, display: "flex", gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--honey)", flex: "none", marginTop: 6 }} />
                {m.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 盛夏調整提醒 band */}
      <section style={{ ...wrap, padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", background: "var(--cat-tribe-bg)", borderRadius: "var(--r-card)", fontSize: "var(--fs-body)", color: "var(--text-strong)" }}>
          <span style={{ width: 12, height: 12, borderRadius: 999, background: "var(--honey)", flex: "none" }} />
          盛夏 7–8 月，假日市集時段調整為 08:00–13:00，請提早來逛。
        </div>
      </section>

      {/* 週間攤車 · 各站攤商 */}
      <section style={{ background: "var(--surface-sunken)", padding: "52px 0", marginTop: 20 }}>
        <div style={wrap}>
          <SectionHeader eyebrow="週間攤車" title="每站，不一樣的攤商" dotCategory="weekday" />
          <p style={{ margin: "14px 0 0", fontSize: "var(--fs-body)", color: "var(--text-muted)", maxWidth: 560, lineHeight: 1.8 }}>
            三個站點各有固定的週間攤商陣容。選一個站，看看那裡出沒的小農。
          </p>

          {/* 站點分頁 */}
          <div role="tablist" aria-label="週間攤車站點" style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "24px 0 8px" }}>
            {STATIONS.map((s) => {
              const on = s.key === station;
              return (
                <button
                  key={s.key}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setStation(s.key)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 9,
                    padding: "10px 18px",
                    fontFamily: "var(--font-body)", fontSize: "var(--fs-body)", fontWeight: 500,
                    color: on ? "var(--paper)" : "var(--text-strong)",
                    background: on ? "var(--ink)" : "var(--surface-card)",
                    border: `1.5px solid ${on ? "var(--ink)" : "var(--border)"}`,
                    borderRadius: "var(--r-pill)", cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "background .16s ease, color .16s ease",
                  }}
                >
                  <span style={{ width: 10, height: 10, borderRadius: 999, background: s.dot, flex: "none" }} />
                  {s.name}
                  <span style={{ fontSize: 12, opacity: 0.6, fontVariantNumeric: "tabular-nums" }}>{brandsAtStation(s.key).length}</span>
                </button>
              );
            })}
          </div>

          {/* 站點資訊列 */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", padding: "14px 0 22px", fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)" }}>{active.line}</span>
            <span>·</span>
            <span>{active.days}</span>
            <span>·</span>
            <span>{active.note}</span>
          </div>

          {/* 該站攤商 */}
          {vendors.length ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 22 }}>
              {vendors.map((b) => <BrandCard key={b.name} {...b} flipping={flip === b.name} style={{ cursor: "pointer" }} onClick={() => openBrand(b)} />)}
            </div>
          ) : (
            <p style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>這一站的攤商名單整理中。</p>
          )}

          <p style={{ margin: "22px 0 0", fontSize: "var(--fs-xs)", color: "var(--text-muted)", display: "inline-flex", alignItems: "center", gap: 7 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--honey)" }} />
            實際出攤以協會官網每日名單為準；站點陸續增加中。
          </p>
        </div>
      </section>

      {/* 交通 / 站點 */}
      <section style={{ ...wrap, padding: "52px 24px 8px" }}>
        <SectionHeader eyebrow="交通" title="站點都在淡水信義線上" dotCategory="tribe" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18, marginTop: 26 }}>
          {STATIONS.map((s) => (
            <div key={s.key} style={{ background: "var(--surface-card)", border: "1px solid var(--border)", borderRadius: "var(--r-card)", padding: "22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ width: 14, height: 14, borderRadius: 999, background: s.dot }} />
                <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--fs-h3)", color: "var(--text-strong)" }}>{s.name}</h3>
              </div>
              <p style={{ margin: "0 0 4px", fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>{s.line}</p>
              <p style={{ margin: 0, fontSize: "var(--fs-sm)", color: "var(--text-body)", lineHeight: 1.7 }}>{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 地圖佔位 */}
      <section style={{ ...wrap, padding: "28px 24px 64px" }}>
        <div style={{ position: "relative", height: 280, borderRadius: "var(--r-card)", border: "1px solid var(--border)", background: "repeating-linear-gradient(135deg, var(--paper-lo) 0 12px, var(--paper-hi) 12px 24px)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <span style={{ position: "absolute", top: "40%", left: "30%", width: 20, height: 20, borderRadius: 999, background: "var(--cat-food)", boxShadow: "0 0 0 6px color-mix(in srgb, var(--paper) 60%, transparent)" }} />
          <span style={{ position: "absolute", top: "26%", left: "60%", width: 16, height: 16, borderRadius: 999, background: "var(--cat-weekday)", boxShadow: "0 0 0 6px color-mix(in srgb, var(--paper) 60%, transparent)" }} />
          <span style={{ position: "absolute", top: "64%", left: "72%", width: 16, height: 16, borderRadius: 999, background: "var(--cat-tribe)", boxShadow: "0 0 0 6px color-mix(in srgb, var(--paper) 60%, transparent)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>map · 雙連 / 士林 / 石牌</span>
        </div>
        <div style={{ marginTop: 28 }}>
          <Button variant="primary" as="a" href="https://ddg.gdg.asia/" target="_blank" rel="noopener noreferrer" dot>看本週出攤名單</Button>
        </div>
      </section>

      <Footer />
      <BrandSheet brand={sel} open={!!sel} onClose={() => setSel(null)} />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/navigation/Navbar.jsx";
import { Footer } from "../../components/navigation/Footer.jsx";
import { SectionHeader } from "../../components/layout/SectionHeader.jsx";
import { CategoryTag } from "../../components/feedback/CategoryTag.jsx";
import { BrandSheet } from "../../components/brand/BrandSheet.jsx";
import { BRANDS, WEEKDAY_LABELS, brandsOnWeekday, stationName } from "./data.js";

const wrap = { maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" };
const DOT = { food: "var(--cat-food)", craft: "var(--cat-craft)", tribe: "var(--cat-tribe)", weekday: "var(--cat-weekday)" };
const LEGEND = [["food", "食品蔬果"], ["tribe", "部落"], ["craft", "手作"]];

export function Calendar({ onNavigate = () => {} }) {
  const today = new Date();
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [sel, setSel] = useState({ y: today.getFullYear(), m: today.getMonth(), d: today.getDate() });
  const [brand, setBrand] = useState(null);
  const [narrow, setNarrow] = useState(typeof window !== "undefined" && window.innerWidth <= 640);
  useEffect(() => {
    const on = () => setNarrow(window.innerWidth <= 640);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);

  const first = new Date(view.y, view.m, 1).getDay();
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const shift = (delta) => {
    let m = view.m + delta, y = view.y;
    if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; }
    setView({ y, m });
  };

  const isSel = (d) => sel && sel.y === view.y && sel.m === view.m && sel.d === d;
  const isToday = (d) => today.getFullYear() === view.y && today.getMonth() === view.m && today.getDate() === d;

  const pick = (y, m, d) => { setSel({ y, m, d }); setView({ y, m }); };

  // 本週（週日起）
  const weekStart = new Date(today); weekStart.setDate(today.getDate() - today.getDay());
  const week = Array.from({ length: 7 }, (_, i) => { const dt = new Date(weekStart); dt.setDate(weekStart.getDate() + i); return dt; });
  const sameDay = (dt, s) => s && dt.getFullYear() === s.y && dt.getMonth() === s.m && dt.getDate() === s.d;

  const selDayNum = sel ? new Date(sel.y, sel.m, sel.d).getDay() : null;
  const selBrands = sel ? brandsOnWeekday(selDayNum) : [];
  const selWeekend = selDayNum === 0 || selDayNum === 6;

  return (
    <div style={{ background: "var(--paper)", fontFamily: "var(--font-body)", color: "var(--text-body)", minHeight: "100vh" }}>
      <Navbar current="/calendar" onNavigate={onNavigate} />

      <section style={{ position: "relative", overflow: "hidden", padding: "56px 0 8px" }}>
        <span style={{ position: "absolute", top: 24, right: 90, width: 96, height: 96, borderRadius: 999, background: "color-mix(in srgb, var(--honey) 20%, transparent)" }} />
        <div style={{ ...wrap, position: "relative" }}>
          <SectionHeader eyebrow="出攤資訊" title="本週出攤" dotCategory="weekday" />
          <p style={{ margin: "14px 0 0", fontSize: "var(--fs-lg)", fontWeight: 300, maxWidth: 580, lineHeight: 1.8 }}>
            這一週誰在哪天出攤，一眼看完。週末是完整的假日市集，週間是輪替的小農攤車。想提前規劃，往下看整月行事曆。
          </p>
        </div>
      </section>

      {/* 本週出攤 週條 */}
      <section style={{ ...wrap, padding: "8px 24px 0" }}>
        <div style={{
          display: narrow ? "flex" : "grid",
          gridTemplateColumns: narrow ? undefined : "repeat(7, minmax(0,1fr))",
          gap: 10,
          overflowX: narrow ? "auto" : "visible",
          scrollSnapType: narrow ? "x mandatory" : "none",
          margin: narrow ? "0 -24px" : 0,
          padding: narrow ? "0 24px 6px" : 0,
          WebkitOverflowScrolling: "touch",
        }}>
          {week.map((dt, i) => {
            const dow = dt.getDay();
            const weekend = dow === 0 || dow === 6;
            const bs = brandsOnWeekday(dow);
            const tday = dt.toDateString() === today.toDateString();
            const selected = sameDay(dt, sel);
            return (
              <button
                key={i}
                onClick={() => pick(dt.getFullYear(), dt.getMonth(), dt.getDate())}
                style={{
                  display: "flex", flexDirection: "column", gap: 10, minHeight: 132,
                  flex: narrow ? "0 0 116px" : "initial",
                  scrollSnapAlign: narrow ? "start" : "none",
                  padding: "12px 12px 14px", cursor: "pointer", textAlign: "left",
                  borderRadius: "var(--r-card)",
                  border: selected ? "1.5px solid var(--ink)" : "1px solid var(--border)",
                  background: weekend ? "var(--cat-food-bg)" : "var(--surface-card)",
                  boxShadow: selected ? "var(--shadow-md)" : "var(--shadow-sm)",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontSize: "var(--fs-xs)", color: weekend ? "var(--leaf)" : "var(--text-muted)" }}>週{WEEKDAY_LABELS[dow]}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 20, color: "var(--text-strong)" }}>{dt.getDate()}</span>
                  {tday ? <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--honey)" }} /> : null}
                </div>
                {bs.length ? (
                  <>
                    <span style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: "auto" }}>
                      {bs.slice(0, 8).map((b, j) => <span key={j} style={{ width: 8, height: 8, borderRadius: 999, background: DOT[b.category] }} />)}
                    </span>
                    <span style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>{weekend ? "假日市集" : bs.length + " 攤"}</span>
                  </>
                ) : (
                  <span style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", marginTop: "auto" }}>休市</span>
                )}
              </button>
            );
          })}
        </div>
        <p style={{ margin: "12px 0 0", fontSize: "var(--fs-xs)", color: "var(--text-muted)", display: "inline-flex", alignItems: "center", gap: 7 }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--honey)" }} />
          每日實際名單以協會官網為準，臨時異動不另通知。
        </p>
      </section>

      {/* Legend */}
      <section style={{ ...wrap, padding: "36px 24px 0" }}>
        <SectionHeader eyebrow="提前規劃" title="整月行事曆" dotCategory="food" />
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center", marginTop: 16 }}>
        {LEGEND.map(([c, l]) => (
          <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: "var(--fs-sm)", color: "var(--text-body)" }}>
            <span style={{ width: 10, height: 10, borderRadius: 999, background: DOT[c] }} />{l}
          </span>
        ))}
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>
          <span style={{ width: 14, height: 14, borderRadius: 4, background: "var(--cat-food-bg)" }} />週末＝假日市集
        </span>
        </div>
      </section>

      <section style={{ ...wrap, padding: "24px 24px 64px", display: "flex", gap: 28, flexWrap: "wrap", alignItems: "flex-start" }}>
        {/* 月曆 */}
        <div style={{ flex: "1 1 460px", minWidth: 300 }}>
          {/* 月份切換 */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "var(--fs-h2)", color: "var(--text-strong)" }}>{view.y} 年 {view.m + 1} 月</h3>
            <div style={{ display: "flex", gap: 8 }}>
              {[["‹", -1], ["›", 1]].map(([g, d]) => (
                <button key={d} onClick={() => shift(d)} aria-label={d < 0 ? "上個月" : "下個月"} style={{ width: 38, height: 38, borderRadius: 999, border: "1px solid var(--border)", background: "var(--surface-card)", color: "var(--ink)", fontSize: 18, cursor: "pointer", lineHeight: 1 }}>{g}</button>
              ))}
            </div>
          </div>

          {/* 星期表頭 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6, marginBottom: 6 }}>
            {WEEKDAY_LABELS.map((w, i) => (
              <div key={w} style={{ textAlign: "center", fontSize: "var(--fs-xs)", fontWeight: 500, color: (i === 0 || i === 6) ? "var(--leaf)" : "var(--text-muted)", padding: "4px 0" }}>{w}</div>
            ))}
          </div>

          {/* 日格 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6 }}>
            {cells.map((d, i) => {
              if (d === null) return <div key={i} />;
              const dow = new Date(view.y, view.m, d).getDay();
              const weekend = dow === 0 || dow === 6;
              const bs = brandsOnWeekday(dow);
              const selected = isSel(d);
              return (
                <button
                  key={i}
                  onClick={() => setSel({ y: view.y, m: view.m, d })}
                  style={{
                    aspectRatio: "1 / 1", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4,
                    padding: "7px 8px", cursor: "pointer", textAlign: "left",
                    borderRadius: "var(--r-md)",
                    border: selected ? "1.5px solid var(--ink)" : "1px solid var(--border)",
                    background: selected ? "var(--surface-card)" : weekend ? "var(--cat-food-bg)" : "var(--surface-card)",
                    boxShadow: selected ? "var(--shadow-md)" : "none",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "var(--fs-sm)", fontWeight: isToday(d) ? 700 : 400, color: "var(--text-strong)" }}>
                    {isToday(d) ? <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--honey)" }} /> : null}
                    {d}
                  </span>
                  <span style={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: "auto" }}>
                    {bs.slice(0, 6).map((b, j) => (
                      <span key={j} style={{ width: 7, height: 7, borderRadius: 999, background: DOT[b.category] }} />
                    ))}
                    {bs.length > 6 ? <span style={{ fontSize: 9, color: "var(--text-muted)", lineHeight: "7px" }}>+{bs.length - 6}</span> : null}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 當日名單 */}
        <aside style={{ flex: "1 1 300px", minWidth: 280, position: "sticky", top: "calc(var(--header-h) + 16px)", background: "var(--surface-card)", border: "1px solid var(--border)", borderRadius: "var(--r-card)", padding: "22px 22px 24px" }}>
          {sel ? (
            <>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "var(--fs-h1)", color: "var(--ink)" }}>{sel.m + 1}/{sel.d}</span>
                <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>週{WEEKDAY_LABELS[selDayNum]}</span>
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 12px", borderRadius: "var(--r-pill)", background: selWeekend ? "var(--cat-food-bg)" : "var(--cat-weekday-bg)", fontSize: "var(--fs-sm)", color: "var(--text-strong)", marginBottom: 18 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: selWeekend ? "var(--cat-food)" : "var(--cat-weekday)" }} />
                {selWeekend ? "假日市集 · 雙連站" : "週間攤車 · 雙連/士林/石牌"}
              </div>

              {selBrands.length ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <div style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", marginBottom: 6 }}>{selBrands.length} 個攤位出攤</div>
                  {selBrands.map((b) => (
                    <button key={b.name} onClick={() => setBrand(b)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "11px 8px", border: "none", borderTop: "1px solid var(--border)", background: "transparent", cursor: "pointer", textAlign: "left", width: "100%" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ width: 10, height: 10, borderRadius: 999, background: DOT[b.category], flex: "none" }} />
                        <span style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                          <span style={{ fontWeight: 500, color: "var(--text-strong)" }}>{b.name}</span>
                          {!selWeekend && b.stations && b.stations.length ? (
                            <span style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>{b.stations.map(stationName).join("・")}</span>
                          ) : null}
                        </span>
                      </span>
                      <CategoryTag category={b.category} />
                    </button>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)", lineHeight: 1.7, margin: "8px 0 0" }}>這天沒有排定出攤。週一通常是休市日。</p>
              )}

              <p style={{ margin: "18px 0 0", paddingTop: 14, borderTop: "1px solid var(--border)", fontSize: "var(--fs-xs)", color: "var(--text-muted)", lineHeight: 1.7 }}>
                每日實際名單以協會官網為準，臨時異動不另通知。
              </p>
            </>
          ) : null}
        </aside>
      </section>

      <Footer />
      <BrandSheet brand={brand} open={!!brand} onClose={() => setBrand(null)} />
    </div>
  );
}

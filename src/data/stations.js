// 週間攤車站點 — 之後要加站，只要在這裡新增一筆，再把攤商 frontmatter 的 stations 標到 key 即可。
export const STATIONS = [
  { key: "shuanglian", name: "雙連站", line: "淡水信義線 R12", days: "週一～週五輪替", dot: "var(--cat-food)", note: "2 號出口票閘外；假日市集則在 1 號出口廣場。" },
  { key: "shilin",     name: "士林站", line: "淡水信義線 R16", days: "週一～週五輪替", dot: "var(--cat-weekday)", note: "1 號出口外的週間小農攤車站點。" },
  { key: "shipai",     name: "石牌站", line: "淡水信義線 R19", days: "週一～週五輪替", dot: "var(--cat-tribe)", note: "1 號出口外的週間小農攤車站點。" },
  { key: "beitou",     name: "北投站", line: "淡水信義線 R22", days: "週一～週五依公告", dot: "var(--honey)", note: "1 號出口外；2026 年 7 月 1 日初登場，出攤日以當週公告為準。" },
];

export function stationName(key) {
  const s = STATIONS.find((x) => x.key === key);
  return s ? s.name : "";
}

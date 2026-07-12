// 週間攤車站點 — 之後要加站，只要在這裡新增一筆，再把攤商 frontmatter 的 stations 標到 key 即可。
export const STATIONS = [
  { key: "shuanglian", name: "雙連站", line: "淡水信義線 R13", days: "週二～週五", dot: "var(--cat-food)", note: "1 號出口廣場，假日市集主場，週間也有攤車。" },
  { key: "shilin",     name: "士林站", line: "淡水信義線 R15", days: "週二～週五", dot: "var(--cat-weekday)", note: "週間小農攤車輪替站點。" },
  { key: "shipai",     name: "石牌站", line: "淡水信義線 R17", days: "週二～週五", dot: "var(--cat-tribe)", note: "週間小農攤車輪替站點。" },
];

export function stationName(key) {
  const s = STATIONS.find((x) => x.key === key);
  return s ? s.name : "";
}

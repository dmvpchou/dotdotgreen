// 點點綠 UI Kit — 示範資料。
// 品牌名取自《網路公開資訊彙整》綠媒體報導所列週間攤車與粉專。
// tagline / about 為視覺示範用草稿（上線前替換為粉專現成文案）；photo 一律佔位（待攤友授權照）。
// attendDays 用中文星期字元：一二三四五六日。

export const BRANDS = [
  { name: "吉果園", category: "food", tagline: "高山果園直送，甜度是海拔給的。", about: "位在中海拔的家庭果園，只採當季、當日現摘。從梨、桃到柑橘，甜度靠的是海拔與日夜溫差，不是催熟。週末在雙連站等你試吃。", featured: true, attendDays: ["六","日"], facebook: "#", instagram: "#" },
  { name: "樂穠", category: "food", tagline: "友善耕作的當季蔬菜，帶著土的溫度。", about: "堅持友善耕作、不用除草劑的小農園。菜單跟著節氣走，長什麼就賣什麼，帶著剛從田裡拔出來的土味。", featured: true, attendDays: ["三","六","日"], facebook: "#" },
  { name: "瑞田", category: "food", tagline: "一畝好田，種出安心的米與雜糧。", about: "專種稻米與雜糧的老農家，一期一會的新米、紅藜與黑豆。現碾現賣，讓你聞得到米香。", attendDays: ["六","日"], facebook: "#", line: "#" },
  { name: "部落e購", category: "tribe", tagline: "把部落的好物，帶到捷運站出口。", about: "串連多個原鄉部落的小農合作平台，把山上的小米、香菇、段木木耳帶下山。每一樣都寫得出是哪個部落、哪位族人種的。", featured: true, attendDays: ["二","四"], stations: ["shilin"], facebook: "#", instagram: "#" },
  { name: "輝要", category: "food", tagline: "阿輝的當令青蔬，要新鮮就找他。", about: "一人顧一攤的葉菜達人阿輝。清晨採收、中午前售完，主打最不耐放、最需要新鮮的葉菜類。", attendDays: ["三","五"], stations: ["shuanglian"], facebook: "#" },
  { name: "小潘", category: "food", tagline: "手工烘焙點心，剛出爐最好吃。", about: "沒有店面的家庭烘焙，用在地食材做司康、磅蛋糕與餅乾。數量有限，賣完為止。", attendDays: ["六","日"], instagram: "#" },
  { name: "清淨母語", category: "tribe", tagline: "循古法製作，留住部落的味道。", about: "以族語命名的部落品牌，循古法製作醃漬與發酵食物。想留住的不只是味道，還有一種說話的方式。", featured: true, attendDays: ["二","四"], stations: ["shipai","shilin"], facebook: "#", website: "#" },
  { name: "御品園", category: "food", tagline: "無毒栽培的溫室好果，甜而不膩。", about: "溫室無毒栽培的番茄與草莓，安心到可以直接放進嘴裡。甜而不膩，孩子最買單。", attendDays: ["五","六"], stations: ["shilin"], facebook: "#" },
  { name: "人山艸", category: "craft", tagline: "野地採集的花草茶，一杯就是一片山。", about: "手工採集、日曬乾燥的台灣原生花草茶。一杯泡開，是一整片山的氣味。也做香草小盆栽。", attendDays: ["六","日"], instagram: "#", website: "#" },
  { name: "永昇甘蔗", category: "food", tagline: "現壓甘蔗汁，古早味的清涼。", about: "現削現壓的紅甘蔗汁，不加水不加糖。夏天限定的古早味，市集裡最解渴的一攤。", attendDays: ["六","日"], facebook: "#" },
  { name: "文獻", category: "craft", tagline: "手感陶作與生活器物，慢慢用。", about: "獨立陶藝工作室，做碗盤杯壺這些每天會用到的器物。手感的溫度，值得慢慢用。", attendDays: ["日"], instagram: "#" },
  { name: "雅芯", category: "craft", tagline: "天然手工皂，洗去一週的疲憊。", about: "冷製法手工皂，用植物油與精油慢慢皂化。洗的是身體，也洗去一週的疲憊。", attendDays: ["六"], facebook: "#", line: "#" },
  { name: "Wagi", category: "tribe", tagline: "來自山上的蜂蜜與小米，純粹如初。", about: "部落青年返鄉的養蜂與小米農園。純粹的龍眼蜜與紅藜小米，是山上原本就有的味道。", featured: true, attendDays: ["二","四"], stations: ["shuanglian"], instagram: "#" },
  { name: "太魯閣767", category: "tribe", tagline: "峽谷海拔的高冷蔬果，脆甜有勁。", about: "來自太魯閣峽谷海拔 767 的高冷蔬果。溫差養出來的高麗菜與番茄，脆甜有勁。", attendDays: ["四","五"], stations: ["shipai"], facebook: "#" },
  { name: "清晨豆坊", category: "food", tagline: "非基改黃豆，每天現磨的溫豆漿。", about: "凌晨開工的豆製品小攤，非基改黃豆、每天現磨。豆漿、豆花、板豆腐，趁溫熱最好。", attendDays: ["六","日"], instagram: "#" },
  { name: "山邊麵包", category: "craft", tagline: "天然酵母慢發酵，麥香紮實。", about: "用自養天然酵母、長時間低溫發酵的歐式麵包。麥香紮實、越嚼越香，適合當一週的早餐。", attendDays: ["六","日"], facebook: "#", instagram: "#" },
];

export const CATEGORY_META = {
  all:     { label: "全部",     dot: "var(--ink)" },
  food:    { label: "食品蔬果", dot: "var(--cat-food)" },
  craft:   { label: "手作",     dot: "var(--cat-craft)" },
  tribe:   { label: "部落",     dot: "var(--cat-tribe)" },
  weekday: { label: "週間攤車", dot: "var(--cat-weekday)" },
};

// 中文星期 → JS getDay()（0=日）
export const WEEKDAY_INDEX = { "日": 0, "一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6 };
export const WEEKDAY_LABELS = ["日", "一", "二", "三", "四", "五", "六"];

// 回傳某個 JS 星期數（0=日）出攤的品牌
export function brandsOnWeekday(dayNum) {
  return BRANDS.filter((b) => (b.attendDays || []).some((d) => WEEKDAY_INDEX[d] === dayNum));
}

// 週間攤車站點 — 之後要加站，只要在這裡新增一筆，再把攤商標到 stations 即可。
export const STATIONS = [
  { key: "shuanglian", name: "雙連站", line: "淡水信義線 R13", days: "週二～週五", dot: "var(--cat-food)", note: "1 號出口廣場，假日市集主場，週間也有攤車。" },
  { key: "shilin",     name: "士林站", line: "淡水信義線 R15", days: "週二～週五", dot: "var(--cat-weekday)", note: "週間小農攤車輪替站點。" },
  { key: "shipai",     name: "石牌站", line: "淡水信義線 R17", days: "週二～週五", dot: "var(--cat-tribe)", note: "週間小農攤車輪替站點。" },
];

// 某站的攤商（一個攤商可出現在多站）
export function brandsAtStation(key) {
  return BRANDS.filter((b) => (b.stations || []).includes(key));
}
export function stationName(key) {
  const s = STATIONS.find((x) => x.key === key);
  return s ? s.name : "";
}

// 雙市集（規格書 /info）
export const MARKETS = [
  {
    key: "weekend", category: "food", title: "假日市集",
    where: "雙連捷運站 1 號出口廣場",
    when: "每週六、日 09:00–15:00",
    note: "盛夏 7–8 月調整為 08:00–13:00，避開午後高溫。",
  },
  {
    key: "weekday", category: "weekday", title: "週間小農攤車",
    where: "雙連站 / 士林站 / 石牌站",
    when: "週二至週五 依站點輪替",
    note: "每日出攤店家名單以協會官網為準。",
  },
];

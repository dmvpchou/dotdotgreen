# 開發日誌

紀錄這個專案的重大決策與變更，方便回顧「為什麼」而不只是「改了什麼」（git log 已經有後者）。

## 2026-07-12

- **從 Claude Design 匯入設計系統**：從 Claude Design 專案（「Design system from documents」）匯入點點綠市集的設計 tokens（`tokens/*.css`）、可複用元件庫，以及官網六頁 UI Kit（首頁／品牌牆／本週出攤／關於／市集資訊／加入我們）。內容原生即為繁體中文，來源文件是《greenmarket-規格書v1》與《點點綠-網路公開資訊彙整》。
- **UI Kit 原始形式是 React + 瀏覽器端 Babel**：`ui_kits/greenmarket-site/index.html` 靠 CDN 載入 React/ReactDOM/Babel，即時 fetch 並轉譯所有 `.jsx` 檔案渲染，純粹是設計預覽用途（`DESIGN_DOC.md` 原文即註明「視覺／互動參考，不是最終實作碼」）。
- **改寫為純靜態網站**：使用者評估後認為此網站功能單純（幾頁行銷內容 + 篩選/月曆/詳情彈窗等基本互動），不需要 React 的執行效能成本，因此整個網站改寫為純 HTML/CSS + 原生 JS（`assets/site.css`、`assets/data.js`、`assets/site.js`、`assets/mouse-trail.js`、`assets/calendar.js`），六個頁面各自是獨立的靜態 `.html` 檔，開 `file://` 雙擊即可預覽，不需要任何 build 流程或本機伺服器。原本的 React/JSX 展示碼（`components/`、`ui_kits/`）已移除。
- **部署規劃**：預計部署到 Cloudflare（可能是 Cloudflare Pages），網址尚未確定，確定後即可上線 demo。因為是零 build 的純靜態站，Cloudflare Pages 設定上 build command 留空、output directory 設為 `/` 即可。
- **導入 Astro**：品牌資料之後會交給非工程師的其他人維護，原本 `assets/data.js` 裡手寫的 JS 陣列不適合交接，因此導入 Astro：16 個品牌改成 `src/content/brands/*.md`（一個品牌一個 markdown 檔，frontmatter 放分類/出攤日/社群連結等結構化欄位，內文直接寫「about」介紹文字，不需要碰 YAML 字串跳脫），透過 Content Collections（`src/content/config.ts` 的 zod schema）管理。同時把重複貼了 6 次的 header/footer/品牌卡拆成 `.astro` 元件（`src/components/`、`src/layouts/BaseLayout.astro`）。CSS 沿用原本手寫的 `tokens/*.css`／`site.css`（移到 `src/styles/`），沒有改用 Tailwind；互動邏輯（篩選、詳情彈窗、站點分頁、月曆、滑鼠軌跡）維持原生 JS（移到 `public/scripts/`），沒有改用 React island——這兩點都是因為上一次改寫成純靜態站的理由（效能、簡單）依然成立，Astro 只負責解決「內容需要交給別人維護」這個新問題。`BaseLayout.astro` 在 build time 把 Content Collection 的品牌資料序列化成一段 inline `<script>`（`window.DDG_DATA`），`public/scripts/data-bridge.js` 再組成跟舊版 `assets/data.js`一模一樣的 `window.DDG` 介面，所以三支原生 JS 檔案完全不用改。<br>**代價**：Astro 的 build 輸出用的是「網站根目錄」相對路徑，不能再像上次那樣直接雙擊 `index.html` 開（file:// 沒有「根目錄」的概念），本機預覽需要 `npm run dev` 或 `npm run preview`；但正式部署到 Cloudflare Pages 不受影響，因為那邊本來就是真正的網站根目錄。

## 2026-07-14

- **Codex 接手與公開資料校正**：完整核對規格書、網路資料彙整、Claude Design 交接壓縮包與現有 Astro 實作，確認專案可直接續做。新增 `docs/市集公開資料彙整.md` 作為來源與可信度入口。
- **修正營業資訊**：依協會現行頁面把假日市集改為週六 14:00–20:00、週日 14:00–19:00；週間攤車改為週一至週五 14:00–19:00，並修正雙連／士林／石牌站號為 R12／R16／R19。
- **停止把示範排班當公告**：既有 `attendDays` 與 `stations` 是 UI Kit 示範分配，無法代表每週異動；本週出攤頁暫改導向官方粉專，市集資訊頁也不再顯示未核實的固定站點攤商。
- **品牌資料加上來源**：將公開文章可核對的 14 個品牌改寫為有來源的名稱與品項描述，移除 `#` 社群佔位；`清晨豆坊`、`山邊麵包` 保留但標為 draft，待主辦方確認後再公開。
- **查核 Facebook 與北投上線**：以公開粉專頁面確認北投站已在 2026-07-01 初登場，7/13–7/17 週公告把雙連、士林、石牌、北投四站並列；網站與公開資料彙整同步改成四站，並保留北投仍屬活躍試點的營運判斷。
- **完成營運與科技研究**：新增 `docs/點點綠完整研究與營運科技藍圖.md`，整理 2024–2026 時間軸、媒體報導、管理責任、北投量測、新北擴站 Gate／評分卡、其他業務、資料模型、KPI 與 90 天路線圖。

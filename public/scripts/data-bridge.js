// 把 Astro build time 產生的 window.DDG_DATA（純資料）組成 window.DDG
// （資料 + helper functions），維持跟舊版 assets/data.js 一模一樣的介面，
// 讓 site.js / calendar.js / mouse-trail.js 完全不用改。
(function () {
  var d = window.DDG_DATA || { BRANDS: [], MARKETS: [], STATIONS: [], CATEGORY_META: {}, WEEKDAY_INDEX: {}, WEEKDAY_LABELS: [] };

  function brandsOnWeekday(dayNum) {
    return d.BRANDS.filter(function (b) {
      return (b.attendDays || []).some(function (day) { return d.WEEKDAY_INDEX[day] === dayNum; });
    });
  }
  function brandsAtStation(key) {
    return d.BRANDS.filter(function (b) { return (b.stations || []).indexOf(key) !== -1; });
  }
  function stationName(key) {
    var s = d.STATIONS.filter(function (x) { return x.key === key; })[0];
    return s ? s.name : "";
  }
  function brandByName(name) {
    return d.BRANDS.filter(function (b) { return b.name === name; })[0] || null;
  }

  window.DDG = {
    BRANDS: d.BRANDS,
    CATEGORY_META: d.CATEGORY_META,
    WEEKDAY_INDEX: d.WEEKDAY_INDEX,
    WEEKDAY_LABELS: d.WEEKDAY_LABELS,
    STATIONS: d.STATIONS,
    MARKETS: d.MARKETS,
    brandsOnWeekday: brandsOnWeekday,
    brandsAtStation: brandsAtStation,
    stationName: stationName,
    brandByName: brandByName,
  };
})();

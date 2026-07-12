// 點點綠 — 本週出攤 / 整月行事曆頁面專用邏輯。
// 「本週」「本月」隨當天日期變動，無法純靜態，於載入時用原生 JS 動態建立畫面。
(function () {
  var DOT_CLASS = { food: "cat-food", craft: "cat-craft", tribe: "cat-tribe", weekday: "cat-weekday" };

  var today = new Date();
  var view = { y: today.getFullYear(), m: today.getMonth() };
  var sel = { y: today.getFullYear(), m: today.getMonth(), d: today.getDate() };

  var weekStripEl = document.querySelector("[data-week-strip]");
  var calHeadEl = document.querySelector("[data-cal-head]");
  var calGridEl = document.querySelector("[data-cal-grid]");
  var asideEl = document.querySelector("[data-cal-aside]");

  function sameDay(dt, s) {
    return s && dt.getFullYear() === s.y && dt.getMonth() === s.m && dt.getDate() === s.d;
  }

  function dotsHtml(brands, max) {
    return brands.slice(0, max).map(function (b) {
      return '<span class="dot ' + DOT_CLASS[b.category] + '"></span>';
    }).join("");
  }

  function renderWeekStrip() {
    var weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    var html = "";
    for (var i = 0; i < 7; i++) {
      var dt = new Date(weekStart);
      dt.setDate(weekStart.getDate() + i);
      var dow = dt.getDay();
      var weekend = dow === 0 || dow === 6;
      var bs = DDG.brandsOnWeekday(dow);
      var tday = dt.toDateString() === today.toDateString();
      var selected = sameDay(dt, sel);
      html += '<button type="button" class="week-day' + (weekend ? " weekend" : "") + (selected ? " selected" : "") +
        '" data-week-date="' + dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate() + '">' +
        '<div class="week-day-head"><span class="week-day-label">週' + DDG.WEEKDAY_LABELS[dow] + '</span>' +
        '<span class="week-day-num">' + dt.getDate() + "</span>" +
        (tday ? '<span class="week-day-today"></span>' : "") + "</div>" +
        (bs.length
          ? '<span class="week-day-dots">' + dotsHtml(bs, 8) + '</span><span class="week-day-count">' + (weekend ? "假日市集" : bs.length + " 攤") + "</span>"
          : '<span class="week-day-count" style="margin-top:auto">休市</span>') +
        "</button>";
    }
    weekStripEl.innerHTML = html;
  }

  function renderMonth() {
    calHeadEl.textContent = view.y + " 年 " + (view.m + 1) + " 月";
    var first = new Date(view.y, view.m, 1).getDay();
    var days = new Date(view.y, view.m + 1, 0).getDate();
    var cells = [];
    for (var i = 0; i < first; i++) cells.push(null);
    for (var d = 1; d <= days; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);

    var html = "";
    cells.forEach(function (d) {
      if (d === null) { html += "<div></div>"; return; }
      var dow = new Date(view.y, view.m, d).getDay();
      var weekend = dow === 0 || dow === 6;
      var bs = DDG.brandsOnWeekday(dow);
      var selected = sel && sel.y === view.y && sel.m === view.m && sel.d === d;
      var isToday = today.getFullYear() === view.y && today.getMonth() === view.m && today.getDate() === d;
      var more = bs.length > 6 ? '<span class="cal-cell-more">+' + (bs.length - 6) + "</span>" : "";
      html += '<button type="button" class="cal-cell' + (weekend ? " weekend" : "") + (selected ? " selected" : "") + (isToday ? " today" : "") +
        '" data-cal-date="' + d + '">' +
        '<span class="cal-cell-num">' + (isToday ? '<span class="today-dot"></span>' : "") + d + "</span>" +
        '<span class="cal-cell-dots">' + dotsHtml(bs, 6) + more + "</span>" +
        "</button>";
    });
    calGridEl.innerHTML = html;
  }

  function renderAside() {
    if (!sel) { asideEl.innerHTML = ""; return; }
    var selDayNum = new Date(sel.y, sel.m, sel.d).getDay();
    var selBrands = DDG.brandsOnWeekday(selDayNum);
    var selWeekend = selDayNum === 0 || selDayNum === 6;

    var vendorsHtml = selBrands.length
      ? '<div class="cal-aside-count">' + selBrands.length + ' 個攤位出攤</div><div class="cal-vendor-list">' +
        selBrands.map(function (b) {
          var stationHtml = (!selWeekend && b.stations && b.stations.length)
            ? '<span class="cal-vendor-station">' + b.stations.map(DDG.stationName).join("・") + "</span>"
            : "";
          return '<button type="button" class="cal-vendor-row" data-brand="' + b.name + '">' +
            '<span class="cal-vendor-main"><span class="dot ' + DOT_CLASS[b.category] + '"></span>' +
            '<span class="cal-vendor-name-col"><span class="cal-vendor-name">' + b.name + "</span>" + stationHtml + "</span></span>" +
            '<span class="tag ' + DOT_CLASS[b.category] + '"><span class="tag-dot"></span>' + DDG.CATEGORY_META[b.category].label + "</span>" +
            "</button>";
        }).join("") + "</div>"
      : '<p class="cal-aside-empty">這天沒有排定出攤。週一通常是休市日。</p>';

    asideEl.innerHTML =
      '<div class="cal-aside-date"><span class="num">' + (sel.m + 1) + "/" + sel.d + '</span><span class="dow">週' + DDG.WEEKDAY_LABELS[selDayNum] + "</span></div>" +
      '<div class="cal-aside-badge ' + (selWeekend ? "weekend" : "weekday") + '"><span class="dot" style="background:' + (selWeekend ? "var(--cat-food)" : "var(--cat-weekday)") + '"></span>' +
      (selWeekend ? "假日市集 · 雙連站" : "週間攤車 · 雙連/士林/石牌") + "</div>" +
      vendorsHtml +
      '<p class="cal-aside-footnote">每日實際名單以協會官網為準，臨時異動不另通知。</p>';
  }

  function renderAll() { renderWeekStrip(); renderMonth(); renderAside(); }

  function shiftMonth(delta) {
    var m = view.m + delta, y = view.y;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    view = { y: y, m: m };
    renderMonth();
  }

  document.addEventListener("click", function (e) {
    var wd = e.target.closest("[data-week-date]");
    if (wd) {
      var parts = wd.getAttribute("data-week-date").split("-").map(Number);
      sel = { y: parts[0], m: parts[1], d: parts[2] };
      view = { y: parts[0], m: parts[1] };
      renderAll();
      return;
    }
    var cell = e.target.closest("[data-cal-date]");
    if (cell) {
      sel = { y: view.y, m: view.m, d: Number(cell.getAttribute("data-cal-date")) };
      renderMonth();
      renderWeekStrip();
      renderAside();
      return;
    }
    if (e.target.closest("[data-cal-prev]")) { shiftMonth(-1); return; }
    if (e.target.closest("[data-cal-next]")) { shiftMonth(1); return; }
  });

  renderAll();
})();

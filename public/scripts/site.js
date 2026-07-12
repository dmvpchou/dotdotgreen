// 點點綠 — 共用互動邏輯（漢堡選單、品牌卡點擊→翻頁→詳情面板、分類篩選、站點分頁）。
// 純原生 JS、事件委派在 document 上，不需要任何框架。
(function () {
  var SOCIALS = [
    ["facebook", "Facebook", "f"],
    ["instagram", "Instagram", "IG"],
    ["line", "LINE", "LINE"],
    ["website", "官網", "↗"]
  ];

  function openBrandSheet(brand) {
    var overlay = document.querySelector(".sheet-overlay");
    if (!overlay || !brand) return;
    var panel = overlay.querySelector(".sheet-panel");

    var socialsHtml = "";
    SOCIALS.forEach(function (s) {
      if (brand[s[0]]) {
        socialsHtml += '<a class="sheet-social-link" href="' + brand[s[0]] + '" target="_blank" rel="noopener noreferrer">' +
          '<span class="glyph">' + s[2] + "</span>" + s[1] + "</a>";
      }
    });

    var daysHtml = (brand.attendDays && brand.attendDays.length)
      ? '<div class="sheet-days">出攤日　週' + brand.attendDays.join("・") + "</div>"
      : "";

    var ctaHref = brand.facebook || brand.instagram || brand.website || "#";
    var meta = DDG.CATEGORY_META[brand.category];

    panel.className = "sheet-panel cat-" + brand.category;
    panel.innerHTML =
      '<div class="sheet-photo"><span class="sheet-drag-handle"></span><span class="sheet-photo-dot"></span></div>' +
      '<div class="sheet-body">' +
        '<div class="sheet-title-row"><h2 class="sheet-title">' + brand.name + '</h2>' +
        '<span class="tag tag-solid"><span class="tag-dot"></span>' + meta.label + "</span></div>" +
        daysHtml +
        '<p class="sheet-about">' + (brand.about || brand.tagline) + "</p>" +
        (socialsHtml ? '<div class="sheet-socials-label">追蹤這個品牌</div><div class="sheet-socials">' + socialsHtml + "</div>" : "") +
        '<a class="btn btn-primary btn-full btn-dot" href="' + ctaHref + '" target="_blank" rel="noopener noreferrer">前往品牌社群</a>' +
      "</div>";

    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeBrandSheet() {
    var overlay = document.querySelector(".sheet-overlay");
    if (!overlay) return;
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.addEventListener("click", function (e) {
    // 手機漢堡選單開關
    var burger = e.target.closest(".hamburger");
    if (burger) {
      var panel = document.querySelector(".mobile-panel");
      var expanded = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!expanded));
      if (panel) panel.classList.toggle("open", !expanded);
      return;
    }
    if (e.target.closest(".mobile-panel a")) {
      var burger2 = document.querySelector(".hamburger");
      var panel2 = document.querySelector(".mobile-panel");
      if (burger2) burger2.setAttribute("aria-expanded", "false");
      if (panel2) panel2.classList.remove("open");
      return;
    }

    // 分類篩選 chips（品牌牆）
    var chip = e.target.closest(".chip[data-filter]");
    if (chip) {
      var row = chip.closest(".filter-row");
      row.querySelectorAll(".chip").forEach(function (c) {
        c.setAttribute("aria-selected", c === chip ? "true" : "false");
      });
      var val = chip.getAttribute("data-filter");
      var grid = document.querySelector("[data-card-grid]");
      if (grid) {
        var visible = 0;
        grid.querySelectorAll(".brand-card").forEach(function (card) {
          var show = val === "all" || card.getAttribute("data-category") === val;
          card.style.display = show ? "" : "none";
          if (show) visible++;
        });
        var countEl = document.querySelector("[data-visible-count]");
        if (countEl) countEl.textContent = visible + " 個品牌";
      }
      return;
    }

    // 站點分頁（市集資訊頁）
    var tab = e.target.closest(".station-tab");
    if (tab) {
      var key = tab.getAttribute("data-station");
      document.querySelectorAll(".station-tab").forEach(function (t) {
        t.setAttribute("aria-selected", t === tab ? "true" : "false");
      });
      document.querySelectorAll("[data-station-key]").forEach(function (el) {
        el.classList.toggle("active", el.getAttribute("data-station-key") === key);
      });
      return;
    }

    // 社群連結：讓它正常外連，不觸發卡片開啟
    if (e.target.closest(".social-btn")) return;

    // 品牌卡 / 當日名單列點擊 → 開詳情面板（品牌卡多一段翻頁動畫）
    var trigger = e.target.closest("[data-brand]");
    if (trigger) {
      var brand = DDG.brandByName(trigger.getAttribute("data-brand"));
      if (!brand) return;
      if (trigger.classList.contains("brand-card")) {
        trigger.classList.add("flipping");
        setTimeout(function () {
          openBrandSheet(brand);
          trigger.classList.remove("flipping");
        }, 340);
      } else {
        openBrandSheet(brand);
      }
      return;
    }

    // 點擊詳情面板背景遮罩關閉
    var overlay = e.target.closest(".sheet-overlay");
    if (overlay && e.target === overlay) { closeBrandSheet(); }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeBrandSheet(); return; }
    if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("brand-card")) {
      e.preventDefault();
      e.target.click();
    }
  });
})();

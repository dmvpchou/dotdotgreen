// ──── 滑動水波紋：單一綠點跟隨指尖/滑鼠，帶淺淺漣漪，停下優雅淡出 ────
(function () {
  var canvas = document.getElementById("dot-trail");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var LEAF = "87,160,95"; // --leaf #57A05F
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var pos = null;      // 目前顯示位置（緩慢跟隨）
  var target = null;   // 指尖/滑鼠位置
  var energy = 0;      // 0..1 移動能量，決定點的可見度
  var ripples = [];    // 漣漪圈
  var lastRipple = 0, running = false, lastMoveT = 0;

  function resize() {
    canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  addEventListener("resize", resize);

  function wake() { if (!running) { running = true; requestAnimationFrame(tick); } }

  function onMove(x, y) {
    target = { x: x, y: y };
    if (!pos) pos = { x: x, y: y };
    lastMoveT = performance.now();
    wake();
  }

  addEventListener("touchmove", function (e) {
    var t = e.touches[0]; if (t) onMove(t.clientX, t.clientY);
  }, { passive: true });
  addEventListener("touchstart", function (e) {
    var t = e.touches[0]; if (t) onMove(t.clientX, t.clientY);
  }, { passive: true });
  addEventListener("mousemove", function (e) { onMove(e.clientX, e.clientY); }, { passive: true });

  function tick(now) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    var moving = now - lastMoveT < 120;
    // 能量：移動時升起，停下後緩慢消散（優雅結束）
    energy += ((moving ? 1 : 0) - energy) * (moving ? 0.14 : 0.035);

    if (pos && target) {
      // 點緩慢跟隨，像浮在水面
      pos.x += (target.x - pos.x) * 0.16;
      pos.y += (target.y - pos.y) * 0.16;

      // 週期性放出漣漪（移動中較密，停下後放完最後一圈）
      if (energy > 0.05 && now - lastRipple > (moving ? 260 : 900)) {
        ripples.push({ x: pos.x, y: pos.y, r: 6, max: 44 + Math.random() * 18, life: 1 });
        lastRipple = now;
      }

      // 漣漪：淡描邊圓圈向外擴散
      for (var i = ripples.length - 1; i >= 0; i--) {
        var rp = ripples[i];
        rp.life -= 0.012;
        rp.r += (rp.max - rp.r) * 0.045;
        if (rp.life <= 0) { ripples.splice(i, 1); continue; }
        var e = rp.life * rp.life * (3 - 2 * rp.life);
        ctx.globalAlpha = e * 0.28;
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "rgba(" + LEAF + ",1)";
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 單一綠點：柔光暈 + 實心
      if (energy > 0.01) {
        var g = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 22);
        g.addColorStop(0, "rgba(" + LEAF + "," + (0.30 * energy) + ")");
        g.addColorStop(1, "rgba(" + LEAF + ",0)");
        ctx.globalAlpha = 1;
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2); ctx.fill();

        ctx.globalAlpha = 0.9 * energy;
        ctx.fillStyle = "rgba(" + LEAF + ",1)";
        ctx.beginPath(); ctx.arc(pos.x, pos.y, 5.5, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.globalAlpha = 1;

    if (energy > 0.01 || ripples.length) { requestAnimationFrame(tick); }
    else { running = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
  }
})();

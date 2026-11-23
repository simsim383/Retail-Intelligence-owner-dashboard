/* studio_motion.js (23 Nov 2026): the studio's Motion add-on for every site.
   Uses Motion (motion.dev, MIT). Everything here is opt-in by class or data attribute and
   does nothing under prefers-reduced-motion or if Motion failed to load.
   .press springy press (and lift on hover) · [data-drop] · [data-pop] · [data-stagger] > *
   video[data-inview] · studioMorph(update, a, b) · studioLightbox(selector)
*/
(() => {
  const M = window.Motion || {};
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ok = !!(M.animate && !reduce);
  const S = {press: {type: 'spring', stiffness: 520, damping: 14}, settle: {type: 'spring', stiffness: 420, damping: 22},
             drop: {type: 'spring', stiffness: 220, damping: 14}, pop: {type: 'spring', stiffness: 300, damping: 18}};
  window.STUDIO_SPRING = S;
  function init(root = document) {
    if (!ok) { root.querySelectorAll('[data-drop],[data-pop],[data-stagger]>*').forEach(e => e.style.opacity = ''); return; }
    if (M.press) M.press(root.querySelectorAll('.press'), el => { M.animate(el, {scale: .96}, S.settle); return () => M.animate(el, {scale: 1}, S.press); });
    if (M.hover) M.hover(root.querySelectorAll('.press'), el => { M.animate(el, {y: -2}, S.settle); return () => M.animate(el, {y: 0}, S.settle); });
    root.querySelectorAll('[data-drop]').forEach(el => { el.style.opacity = 0; const d = +el.dataset.drop || 120;
      M.inView(el, () => { M.animate(el, {y: [-d, 0], rotate: [-8, 0], opacity: [0, 1]}, S.drop); }, {amount: .5}); });
    root.querySelectorAll('[data-pop]').forEach(el => { el.style.opacity = 0;
      M.inView(el, () => { M.animate(el, {scale: [.85, 1], opacity: [0, 1]}, S.pop); }, {amount: .4}); });
    root.querySelectorAll('[data-stagger]').forEach(p => { const kids = [...p.children]; kids.forEach(k => k.style.opacity = 0);
      M.inView(p, () => { M.animate(kids, {y: [24, 0], opacity: [0, 1]}, {...S.pop, delay: M.stagger(.06)}); }, {amount: .25}); });
    root.querySelectorAll('video[data-inview]').forEach(v => M.inView(v, () => { v.play().catch(() => {}); return () => v.pause(); }, {amount: .5}));
  }
  window.studioMorph = (update, a, b, opts = {}) => {
    if (ok && M.animateView && document.startViewTransition && a && b)
      return M.animateView(update, {type: 'spring', visualDuration: .45, bounce: .15, ...opts}).add(a, b);
    update();
  };
  window.studioMotionInit = init;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init()); else init();
})();

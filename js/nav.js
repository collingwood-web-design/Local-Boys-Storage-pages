document.querySelectorAll("[data-year]").forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

(function () {
  var toTop = document.querySelector(".to-top");
  if (toTop) {
    var onScroll = function () {
      toTop.classList.toggle("show", window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();

(function () {
  var items = document.querySelectorAll("[data-parallax]");
  if (!items.length) return;

  var speed = 0.3;
  var desktop = window.matchMedia("(min-width: 981px)");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  var ticking = false;

  var update = function () {
    ticking = false;
    var active = desktop.matches && !reduced.matches;
    var vh = window.innerHeight;
    items.forEach(function (el) {
      var img = el.querySelector(":scope > img, :scope > picture > img");
      if (!img) return;
      if (!active) {
        el.style.removeProperty("--parallax-extra");
        img.style.transform = "";
        return;
      }
      var rect = el.getBoundingClientRect();
      el.style.setProperty("--parallax-extra", Math.ceil(speed * vh) + "px");
      if (rect.bottom < 0 || rect.top > vh) return;
      img.style.transform = "translate3d(0," + (-rect.top * speed).toFixed(1) + "px,0)";
    });
  };

  var request = function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  };

  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request);
  update();
})();

(function () {
  var targets = document.querySelectorAll(".footer-contact, .footer-rule");
  if (!targets.length || !("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  targets.forEach(function (el) {
    el.classList.add("animate-ready");
    observer.observe(el);
  });
})();

(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();

/* Tiệm Bánh Mây — progressive enhancement */
(function () {
  "use strict";

  /* Header shadow after scrolling */
  var header = document.querySelector(".site-header");
  if (header) {
    var onHeaderScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onHeaderScroll();
    window.addEventListener("scroll", onHeaderScroll, { passive: true });
  }

  /* Mobile chip nav: reveal after hero + highlight current section */
  var chipNav = document.querySelector(".section-nav");
  if (chipNav) {
    var hero = document.querySelector(".hero");
    var chipInner = chipNav.querySelector(".section-nav__inner");
    var chips = Array.prototype.slice.call(chipNav.querySelectorAll("a[href^='#']"));
    var chipTargets = chips
      .map(function (chip) {
        var id = chip.getAttribute("href").slice(1);
        return { chip: chip, target: document.getElementById(id) };
      })
      .filter(function (item) {
        return item.target;
      });

    var centerChip = function (chip) {
      if (!chipInner) return;
      var left = chip.offsetLeft - (chipInner.clientWidth - chip.offsetWidth) / 2;
      var maxLeft = chipInner.scrollWidth - chipInner.clientWidth;
      left = Math.max(0, Math.min(left, maxLeft));
      if ("scrollTo" in chipInner) {
        chipInner.scrollTo({ left: left, behavior: "smooth" });
      } else {
        chipInner.scrollLeft = left;
      }
    };

    var currentChip = null;
    var syncChipNav = function () {
      var revealAt = hero
        ? hero.offsetTop + hero.offsetHeight * 0.6
        : window.innerHeight * 0.6;
      chipNav.classList.toggle("is-visible", window.scrollY > revealAt);

      var line = 150;
      var current = chipTargets[0];
      chipTargets.forEach(function (item) {
        if (item.target.getBoundingClientRect().top <= line) current = item;
      });
      chipTargets.forEach(function (item) {
        var isCurrent = item === current;
        item.chip.classList.toggle("is-active", isCurrent);
        if (isCurrent) {
          item.chip.setAttribute("aria-current", "true");
        } else {
          item.chip.removeAttribute("aria-current");
        }
      });

      if (current && current.chip !== currentChip) {
        currentChip = current.chip;
        centerChip(current.chip);
      }
    };

    var chipTicking = false;
    var requestChipSync = function () {
      if (chipTicking) return;
      chipTicking = true;
      window.requestAnimationFrame(function () {
        chipTicking = false;
        syncChipNav();
      });
    };

    syncChipNav();
    window.addEventListener("scroll", requestChipSync, { passive: true });
    window.addEventListener("resize", requestChipSync);
  }

  /* FAQ: keep one answer open at a time (fallback for browsers without name=) */
  var faqList = document.querySelector(".faq__list");
  if (faqList) {
    faqList.addEventListener("click", function (event) {
      var summary = event.target.closest("summary");
      if (!summary) return;
      var current = summary.parentElement;
      window.setTimeout(function () {
        if (!current.open) return;
        faqList.querySelectorAll("details").forEach(function (detail) {
          if (detail !== current) detail.open = false;
        });
      }, 0);
    });
  }

  /* Footer year */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* Zalo: copy a ready-to-send message before the chat opens */
  var toast = document.querySelector(".toast");
  var toastTimer;
  var showToast = function (text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 4500);
  };

  var copyMessage = function (link) {
    var message = link.getAttribute("data-zalo-message");
    if (!message) return;
    if (!navigator.clipboard || !window.isSecureContext) return;
    navigator.clipboard.writeText(message).then(
      function () {
        showToast("Đã copy tin nhắn đặt bánh. Dán vào Zalo và gửi nhé!");
      },
      function () {
        /* Clipboard blocked: the chat still opens, user can type normally. */
      }
    );
  };

  document.querySelectorAll("a[data-zalo-message]").forEach(function (link) {
    /* Copy on pointerdown so the page is still focused on desktop. */
    link.addEventListener("pointerdown", function (event) {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      copyMessage(link);
    });

    /* Keyboard activation fires click without pointerdown. */
    link.addEventListener("click", function (event) {
      if (event.detail === 0) copyMessage(link);
    });
  });

  /* Optional analytics hook for Zalo clicks */
  document.querySelectorAll("[data-zalo]").forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.dataLayer) {
        window.dataLayer.push({ event: "zalo_click", location: link.dataset.zalo });
      }
    });
  });
})();

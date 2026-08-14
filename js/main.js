// Paula's Hair & Beauty Salon — shared site behaviour
(function () {
  "use strict";

  // Mobile navigation toggle
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll-reveal for elements marked .reveal
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  // FAQ accordion
  document.querySelectorAll(".accordion-item").forEach(function (item) {
    var trigger = item.querySelector(".accordion-trigger");
    var panel = item.querySelector(".accordion-panel");
    if (!trigger || !panel) return;
    trigger.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".accordion-item.open").forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".accordion-panel").style.maxHeight = null;
        }
      });
      item.classList.toggle("open", !isOpen);
      panel.style.maxHeight = !isOpen ? panel.scrollHeight + "px" : null;
    });
  });

  // Booking date field: minimum = today, and block Sunday/Monday (closed days)
  var dateInput = document.querySelector('input[type="date"]');
  if (dateInput) {
    var today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);

    var closedNote = document.createElement("span");
    closedNote.className = "field-hint";
    closedNote.style.color = "#e3b3b3";
    closedNote.style.display = "none";
    closedNote.textContent = "We're closed Sundays and Mondays — please pick Tue\u2013Sat.";
    dateInput.insertAdjacentElement("afterend", closedNote);

    dateInput.addEventListener("change", function () {
      if (!dateInput.value) return;
      // Parse as local date, not UTC, to avoid off-by-one day issues
      var parts = dateInput.value.split("-").map(Number);
      var picked = new Date(parts[0], parts[1] - 1, parts[2]);
      var day = picked.getDay(); // 0 = Sunday, 1 = Monday
      if (day === 0 || day === 1) {
        closedNote.style.display = "block";
        dateInput.value = "";
      } else {
        closedNote.style.display = "none";
      }
    });
  }
})();

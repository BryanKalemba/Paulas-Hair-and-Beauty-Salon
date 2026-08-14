// Generic Formspree AJAX handler.
// Attach to any <form data-formspree> — submits via fetch so the visitor
// never leaves the page, and shows an inline success/error message.
(function () {
  "use strict";

  document.querySelectorAll("form[data-formspree]").forEach(function (form) {
    var status = form.querySelector(".form-status");
    var submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Honeypot spam trap — if filled in, silently pretend to succeed.
      var honeypot = form.querySelector('input[name="_gotcha"]');
      if (honeypot && honeypot.value) {
        showStatus("success");
        form.reset();
        return;
      }

      var endpoint = form.getAttribute("action");
      if (!endpoint || endpoint.indexOf("YOUR_FORM_ID") !== -1) {
        showStatus(
          "error",
          "Booking form isn't connected yet — add your Formspree endpoint in the form's action attribute."
        );
        return;
      }

      setLoading(true);

      fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            showStatus("success");
            form.reset();
          } else {
            return response.json().then(function (data) {
              var message =
                data && data.errors
                  ? data.errors.map(function (e) { return e.message; }).join(", ")
                  : "Something went wrong. Please try again or call us directly.";
              showStatus("error", message);
            });
          }
        })
        .catch(function () {
          showStatus("error", "Network error — please check your connection and try again.");
        })
        .finally(function () {
          setLoading(false);
        });
    });

    function setLoading(isLoading) {
      if (!submitBtn) return;
      submitBtn.disabled = isLoading;
      submitBtn.textContent = isLoading
        ? "Sending…"
        : submitBtn.getAttribute("data-label") || submitBtn.textContent;
      if (!isLoading) return;
      submitBtn.setAttribute("data-label", submitBtn.getAttribute("data-label") || submitBtn.textContent);
    }

    function showStatus(type, message) {
      if (!status) return;
      status.className = "form-status " + type;
      status.textContent =
        message ||
        (type === "success"
          ? "Thank you — your request has been sent. We'll be in touch shortly to confirm."
          : "Something went wrong. Please try again.");
      status.style.display = "block";
      status.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
})();

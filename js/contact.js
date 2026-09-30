(function () {
  var form = document.getElementById("contact-form");
  var dialog = document.getElementById("sent-dialog");
  if (!form || !dialog || typeof dialog.showModal !== "function") return;

  form.addEventListener("cwd-contact:success", function () {
    form.reset();
    dialog.showModal();
  });

  dialog.querySelector("[data-close]").addEventListener("click", function () {
    dialog.close();
  });

  dialog.addEventListener("click", function (e) {
    if (e.target === dialog) dialog.close();
  });
})();

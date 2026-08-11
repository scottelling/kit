/* KIT vanilla — dialog behavior: open by id, close from inside. Esc works natively. */
(function () {
  document.addEventListener("click", function (event) {
    var opener = event.target.closest("[data-kit-dialog-open]")
    if (opener) {
      var dialog = document.getElementById(opener.getAttribute("data-kit-dialog-open"))
      if (dialog && typeof dialog.showModal === "function") dialog.showModal()
      return
    }
    var closer = event.target.closest("[data-kit-dialog-close]")
    if (closer) {
      var open = closer.closest("dialog")
      if (open) open.close()
    }
  })
})();

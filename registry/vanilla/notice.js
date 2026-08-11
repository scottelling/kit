/* KIT vanilla — notice behavior: dismiss removes the notice. */
(function () {
  document.addEventListener("click", function (event) {
    var dismiss = event.target.closest(".kit-notice [data-kit-dismiss]")
    if (dismiss) {
      var notice = dismiss.closest(".kit-notice")
      if (notice) notice.remove()
    }
  })
})();

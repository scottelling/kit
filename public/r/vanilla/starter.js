(function () {
  var views = Array.prototype.slice.call(document.querySelectorAll("[data-view]"))
  var viewButtons = Array.prototype.slice.call(document.querySelectorAll("[data-starter-view]"))
  var systemPicker = document.getElementById("system-picker")
  var tokenLink = document.getElementById("kit-tokens")
  var appearance = document.getElementById("appearance-toggle")
  var form = document.getElementById("starter-form")
  var success = document.getElementById("starter-success")

  function showView(name) {
    views.forEach(function (view) { view.hidden = view.getAttribute("data-view") !== name })
    viewButtons.forEach(function (button) { button.setAttribute("aria-pressed", button.getAttribute("data-starter-view") === name ? "true" : "false") })
  }

  document.addEventListener("click", function (event) {
    var viewButton = event.target.closest("[data-starter-view]")
    if (viewButton) showView(viewButton.getAttribute("data-starter-view"))
  })

  systemPicker.addEventListener("change", function () {
    tokenLink.setAttribute("href", systemPicker.value)
  })

  appearance.addEventListener("click", function () {
    var dark = document.documentElement.classList.toggle("dark")
    appearance.setAttribute("aria-pressed", dark ? "true" : "false")
    appearance.textContent = dark ? "Light" : "Dark"
  })

  form.addEventListener("submit", function (event) {
    event.preventDefault()
    success.hidden = false
  })
})();

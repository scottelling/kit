/* KIT vanilla — tabs behavior: click + Left/Right/Home/End keys. */
(function () {
  function activate(tabs, tab) {
    var list = tabs.querySelectorAll('[role="tab"]')
    list.forEach(function (t) {
      var selected = t === tab
      t.setAttribute("aria-selected", selected ? "true" : "false")
      t.tabIndex = selected ? 0 : -1
      var panel = document.getElementById(t.getAttribute("aria-controls"))
      if (panel) panel.hidden = !selected
    })
    tab.focus()
  }

  document.addEventListener("click", function (event) {
    var tab = event.target.closest('[data-kit-tabs] [role="tab"]')
    if (tab) activate(tab.closest("[data-kit-tabs]"), tab)
  })

  document.addEventListener("keydown", function (event) {
    var tab = event.target.closest('[data-kit-tabs] [role="tab"]')
    if (!tab) return
    var tabs = tab.closest("[data-kit-tabs]")
    var list = Array.prototype.slice.call(tabs.querySelectorAll('[role="tab"]'))
    var index = list.indexOf(tab)
    var next = null
    if (event.key === "ArrowRight") next = list[(index + 1) % list.length]
    if (event.key === "ArrowLeft") next = list[(index - 1 + list.length) % list.length]
    if (event.key === "Home") next = list[0]
    if (event.key === "End") next = list[list.length - 1]
    if (next) {
      event.preventDefault()
      activate(tabs, next)
    }
  })
})();

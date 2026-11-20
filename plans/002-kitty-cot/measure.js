// Step through the Kitty Cot measurements. Nothing is saved: a refresh
// starts again at the first measurement, and the numbers belong on paper.
(function () {
  const items = Array.from(document.querySelectorAll("#steps li"));
  const status = document.getElementById("step-status");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const dotsEl = document.getElementById("dots");
  const printButton = document.getElementById("print-log");
  let index = 0;

  const dots = items.map(function (item, itemIndex) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "dot";
    button.setAttribute("aria-label", item.querySelector("h3").textContent);
    button.addEventListener("click", function () {
      show(itemIndex);
    });
    dotsEl.appendChild(button);
    return button;
  });

  function show(nextIndex) {
    index = nextIndex;
    items.forEach(function (item, itemIndex) {
      item.classList.toggle("is-quiet", itemIndex !== index);
    });
    const title = items[index].querySelector("h3").textContent;
    status.textContent = "Measurement " + (index + 1) + " of " + items.length + ". " + title + ".";
    prev.disabled = index === 0;
    next.textContent = index === items.length - 1 ? "Start over" : "Next";
    dots.forEach(function (dot, dotIndex) {
      if (dotIndex === index) dot.setAttribute("aria-current", "step");
      else dot.removeAttribute("aria-current");
    });
  }

  function forward() {
    show(index === items.length - 1 ? 0 : index + 1);
  }

  function back() {
    if (index > 0) show(index - 1);
  }

  prev.addEventListener("click", back);
  next.addEventListener("click", forward);
  printButton.addEventListener("click", function () {
    window.print();
  });
  printButton.hidden = false;

  document.addEventListener("keydown", function (event) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      forward();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      back();
    }
  });

  show(0);
})();

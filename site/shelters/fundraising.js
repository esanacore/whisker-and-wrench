const estimator = document.querySelector("#fundraising-estimator");
const form = document.querySelector("#fundraising-form");
const costs = document.querySelector("#project-cost");
const fees = document.querySelector("#project-fees");
const pledges = document.querySelector("#project-pledges");
const result = document.querySelector("#project-target");
const dollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

form.addEventListener("input", () => {
  result.value = "";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.checkValidity()) return;

  const target = Math.max(0, costs.valueAsNumber + fees.valueAsNumber - pledges.valueAsNumber);
  result.value = `Estimated amount to raise: ${dollars.format(target)}`;
});

estimator.hidden = false;

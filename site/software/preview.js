const status = document.querySelector("#case-status");
const advance = document.querySelector("#advance-case");
const handoff = document.querySelector("#intake-handoff");

const stages = [
  {
    status: "Reported. Dispatch has received the call.",
    action: "Assign to field officer",
  },
  {
    status: "Assigned. A field officer is responding to the call.",
    action: "Record dog secured",
  },
  {
    status: "Dog secured. The officer is bringing the dog to the shelter.",
    action: "Complete shelter handoff",
  },
  {
    status: "Handed off. Shelter staff can review the intake summary below.",
    action: "Restart sample call",
  },
];

let stage = 0;

function renderCase() {
  const current = stages[stage];
  status.textContent = `Status: ${current.status}`;
  advance.textContent = current.action;
  handoff.hidden = stage !== stages.length - 1;
}

advance.addEventListener("click", () => {
  stage = (stage + 1) % stages.length;
  renderCase();
});
renderCase();
advance.disabled = false;

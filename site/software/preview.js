const status = document.querySelector("#case-status");
const advance = document.querySelector("#advance-case");
const delay = document.querySelector("#delay-case");
const decline = document.querySelector("#decline-receipt");
const delaySummary = document.querySelector("#intake-delay");
const handoff = document.querySelector("#intake-handoff");

const stages = {
  reported: {
    status: "Reported. Dispatch has received the call.",
    action: "Assign to field officer",
    next: "assigned",
  },
  assigned: {
    status: "Assigned. A field officer is responding to the call.",
    action: "Record dog secured",
    next: "secured",
  },
  secured: {
    status: "Dog secured. The field officer is confirming shelter intake.",
    action: "Mark ready for intake",
    next: "awaitingReceipt",
  },
  awaitingReceipt: {
    status: "Awaiting receipt. The field officer retains custody until shelter intake confirms.",
    action: "Confirm shelter receipt",
    next: "handedOff",
  },
  delayed: {
    status: "Intake delayed. The field officer retains custody while dispatch coordinates intake.",
    action: "Retry shelter intake",
    next: "secured",
  },
  handedOff: {
    status: "Handed off. Shelter staff can review the intake summary below.",
    action: "Restart sample call",
    next: "reported",
  },
};

let stage = "reported";

function showStage(nextStage) {
  stage = nextStage;
  const current = stages[stage];
  status.textContent = `Status: ${current.status}`;
  advance.textContent = current.action;
  delay.hidden = stage !== "secured";
  decline.hidden = stage !== "awaitingReceipt";
  delaySummary.hidden = stage !== "delayed";
  handoff.hidden = stage !== "handedOff";
}

advance.addEventListener("click", () => showStage(stages[stage].next));
function deferIntake() {
  showStage("delayed");
  advance.focus();
}

delay.addEventListener("click", deferIntake);
decline.addEventListener("click", deferIntake);
advance.disabled = false;

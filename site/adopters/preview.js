const status = document.querySelector("#adopter-status");
const next = document.querySelector("#next-topic");
const summary = document.querySelector("#adopter-summary");

const topics = [
  {
    id: "topic-food",
    status: "Topic 1 of 5. Food for the first days.",
    action: "Next topic",
  },
  {
    id: "topic-groom",
    status: "Topic 2 of 5. Grooming questions.",
    action: "Next topic",
  },
  {
    id: "topic-prevention",
    status: "Topic 3 of 5. Prevention questions.",
    action: "Next topic",
  },
  {
    id: "topic-vaccines",
    status: "Topic 4 of 5. Vaccine papers.",
    action: "Next topic",
  },
  {
    id: "topic-license",
    status: "Topic 5 of 5. Town registration.",
    action: "Show questions",
  },
];

let index = 0;

function show(nextIndex) {
  index = nextIndex;
  const finished = index >= topics.length;
  topics.forEach((topic, topicIndex) => {
    document.querySelector(`#${topic.id}`).hidden = finished || topicIndex !== index;
  });
  summary.hidden = !finished;
  if (finished) {
    status.textContent = "Checklist ready. Confirm these questions with the shelter or a veterinarian.";
    next.textContent = "Start over";
    return;
  }
  status.textContent = topics[index].status;
  next.textContent = topics[index].action;
}

next.addEventListener("click", () => {
  show(index >= topics.length ? 0 : index + 1);
});
next.disabled = false;

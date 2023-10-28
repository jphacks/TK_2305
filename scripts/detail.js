import { getPinById } from "./firestore.js";

// fetch data by query parameter id

const url = new URL(window.location.href);
const id = url.searchParams.get("id");

getPinById(id).then((pin) => {
  const data = pin.data;
  const deadline = data.deadline.toDate();

  document.getElementById("forgotten-item").innerText = data.forgotten_item;
  document.getElementById("user-name").innerText = data.user_name;
  document.getElementById("reward").innerText = data.reward;
  document.getElementById("deadline").innerText = deadline;
});

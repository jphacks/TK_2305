import { getPinById, getUserById } from "./firestore.js";

// fetch data by query parameter id

const url = new URL(window.location.href);
const id = url.searchParams.get("id");

getPinById(id).then((pin) => {
  getUserById(pin.data.user_id).then((user) => {
    const data = pin.data;
    const deadline = data.deadline.toDate();

    document.getElementById("forgotten-item").innerText = data.forgotten_item;
    document.getElementById("user-name").innerText = user.data.user_name;
    document.getElementById("reward").innerText = data.reward;
    document.getElementById("deadline").innerText = deadline;
  });
});

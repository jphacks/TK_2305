import {getPin} from "./firestore.js";

// fetch data by query parameter id

const url = new URL(window.location.href);
const id = url.searchParams.get("id");

getPin(id).then((pin) => {
    const data = pin[0].data;
    const deadline = data.deadline.toDate();
    const currentTime = new Date();

    document.getElementById("forgotten-item").innerText = data.forgotten_item;
    document.getElementById("user-name").innerText = data.user_name;
    document.getElementById("reward").innerText = data.reward;
    document.getElementById("deadline").innerText = deadline;
});

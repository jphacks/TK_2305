import { getPinById, getUserById } from "./firestore.js";

// fetch data by query parameter id

const url = new URL(window.location.href);
const id = url.searchParams.get("id");

getPinById(id).then((pin) => {
  getUserById(pin.data.user_id).then((user) => {
    const data = pin.data;
    const deadline = data.deadline.toDate();
    const currentTime = new Date();

    const timeDiff = Math.floor((deadline - currentTime) / (1000 * 60));

    document.getElementById("forgotten-item").innerText = data.forgotten_item;
    document.getElementById("user-name").innerText = user.data.user_name;
    document.getElementById("reward").innerText = data.reward;
    document.getElementById("deadline").innerText = timeDiff + "分以内";
    document.getElementById("photo").attributes.src.value = data.detail;
    document.getElementById("photo").style.width = "100%";
    document.getElementById("photo").style.height = "auto";
    // document.getElementById("photo").style.maxwidth = none;
  });
});

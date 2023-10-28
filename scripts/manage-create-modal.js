import { addPin } from "./firestore.js";
import { getUserName } from "./auth.js";

const map = document.getElementById("map");
const modal = document.getElementById("create-modal");
const openButton = document.getElementById("create-button");
const form = document.getElementById("create-form");

openButton.addEventListener("click", () => {
  map.style.height = "50%";
  modal.style.display = "block";
  document.getElementById("forgotten-item").focus();

  const now = new Date();
  now.setHours(now.getHours() + 1);
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  document.getElementById("deadline").value = hours + ":" + minutes;
});
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const forgottenItem = document.getElementById("forgotten-item").value;
        const userName = getUserName();
        if (!userName) {
          throw new Error("ユーザー名が取得できませんでした。");
        }
        const reward = document.getElementById("reward").value;

        const today = new Date();
        const deadlineTime = document.getElementById("deadline").value;
        const deadline = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          deadlineTime.split(":")[0],
          deadlineTime.split(":")[1],
          0
        );

        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        await addPin({
          forgottenItem,
          userName,
          reward,
          deadline,
          location,
        });

        form.reset();
      },
      (error) => {
        alert("位置情報が取得できませんでした。");
      }
    );
  } else {
    alert("この端末では位置情報が取得できません。");
  }

  map.style.height = "100%";
  modal.style.display = "none";
});

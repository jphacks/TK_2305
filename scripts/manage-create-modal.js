import { addPin } from "./firestore.js";
import { getUser } from "./auth.js";
import {storage} from "./main.js";
import {getDownloadURL, ref, uploadBytes} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";

const map = document.getElementById("map");
const modal = document.getElementById("create-modal");
const openButton = document.getElementById("create-button");
const form = document.getElementById("create-form");

openButton.addEventListener("click", () => {
  map.style.height = "calc(50% - 34px)";
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
        const userId = getUser().uid;
        if (!userId) {
          throw new Error("ユーザー名が取得できませんでした。");
        }
        const reward = document.getElementById("reward").value;
        const photo = document.getElementById("photo").files[0];
        if (!photo) {
          alert("写真が選択されていません。");
          return;
        }
        const storageRef = ref(storage,"/images/"+photo.name);
       await uploadBytes(storageRef, photo)
          const detail = await getDownloadURL(storageRef);

        const today = new Date();
        const deadlineTime = document.getElementById("deadline").value;
        const deadline = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          deadlineTime.split(":")[0],
          deadlineTime.split(":")[1],
          0,
        );

        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        if (!forgottenItem || !reward || !deadline) {
          alert("入力されていない項目があります。");
          return;
        }
        if (!userId) {
          alert("ユーザーが取得できませんでした。");
          return;
        }

        await addPin({
          forgottenItem,
          userId,
          reward,
          deadline,
          location,
          detail,
        });

        form.reset();

        alert("ピンを作成しました。");
      },
      (error) => {
        alert("位置情報が取得できませんでした。");
      },
    );
  } else {
    alert("この端末では位置情報が取得できません。");
  }

  map.style.height = "calc(100vh - 68px)";
  modal.style.display = "none";
});

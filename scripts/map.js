import { getPins } from "./firestore.js";

// Initialize the map
const map = L.map("map").setView([0, 0], 15);

// Add OpenStreetMap tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 100,
}).addTo(map);

getPins().then((pins) => {
  pins.forEach((pin) => {
    // const startTime = pin.start_time.toDate();
    // const endTime = pin.end_time.toDate();
    const deadline = pin.deadline.toDate();
    const currentTime = new Date();

    const timeDiff = Math.floor((deadline - currentTime) / (1000 * 60));

    // Create a marker on the map
    const marker = L.marker([
      pin.location.latitude,
      pin.location.longitude,
    ]).addTo(map);

    // Create a popup for the marker with the desired information
    marker.bindPopup(
      `<div class="custom-title">${pin.forgotten_item}</div><div class="popup-content">ユーザー名: ${
        pin.user_name
      }<br>お礼: ${
        pin.reward
      }円<br>いつまで: ${
        timeDiff
      }分以内<br><p style="text-align:center;"><button id="detail-button" class="orange-round-button">詳細情報</button></p>`,
    );
    // detail button not yet.

    // Open the popup by default
    marker.openPopup();
  });
});

import { getPins } from "./firestore.js";

// Initialize the map
const map = L.map("map").setView([0, 0], 15);

// Add OpenStreetMap tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 100,
}).addTo(map);

getPins().then((pins) => {
  pins.forEach((pin) => {
    const startTime = pin.start_time.toDate();
    const endTime = pin.end_time.toDate();

    // Create a marker on the map
    const marker = L.marker([
      pin.location.latitude,
      pin.location.longitude,
    ]).addTo(map);

    // Create a popup for the marker with the desired information
    marker.bindPopup(
      `<div class="custom-title">${pin.forgotten_item}</div>ユーザー名: ${
        pin.user_name
      }<br>報酬: ${pin.reward}円<br>必要な時間: ${Math.floor(
        (endTime.getTime() - startTime.getTime()) / 1000 / 60
      )}分<br>使い始める時間: ${startTime.getHours()}:${startTime
        .getMinutes()
        .toString()
        .padStart(
          2,
          "0"
        )}<br>使い終わる予定の時間: ${endTime.getHours()}:${endTime
        .getMinutes()
        .toString()
        .padStart(2, "0")}`
    );

    // Open the popup by default
    marker.openPopup();
  });
});

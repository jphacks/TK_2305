// Initialize the map
var map = L.map("map").setView([0, 0], 15);

// Add OpenStreetMap tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 100,
}).addTo(map);

const data = [
  {
    pin_location: {
      latitude: 35.6895,
      longitude: 139.6917,
    },
    forgotten_item: ["携帯電話"],
    user_name: "ジョン・ドウ",
    rewards: "¥1000",
    required_time: "2 時間",
    start_time: "3:30 PM",
    end_time: "5:30 PM",
  },
  {
    pin_location: {
      latitude: 35.6575,
      longitude: 139.7027,
    },
    forgotten_item: ["傘"],
    user_name: "ジェーン・スミス",
    required_time: "3 時間",
    start_time: "10:00 AM",
    end_time: "1:00 PM",
  },
  {
    pin_location: {
      latitude: 35.6895,
      longitude: 139.6921,
    },
    forgotten_item: ["メガネ"],
    user_name: "アリス・ジョンソン",
    required_time: "1.5 時間",
    start_time: "1:30 PM",
    end_time: "3:00 PM",
  },
];

data.forEach((locationData) => {
  console.log(locationData); // for debug
  const latitude = locationData.pin_location.latitude;
  const longitude = locationData.pin_location.longitude;
  const forgottenItems = locationData.forgotten_item.join(", "); // Join items into a comma-separated string

  // Create a marker on the map
  const marker = L.marker([latitude, longitude]).addTo(map);

    //   // Create a custom icon for the marker
    // const customIcon = L.icon({
    //   iconUrl: 'path-to-your-custom-image.png', // Replace with the actual path to your image
    //   iconSize: [32, 32], // Set the width and height of the icon in pixels
    //   iconAnchor: [16, 32], // Adjust the anchor point if needed
    // });

    // // Create a marker using the custom icon
    // const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);


  // Create a popup for the marker with the desired information
  marker.bindPopup(
    `<div class="custom-title">${forgottenItems}</div><br>ユーザー名: ${locationData["user_name"]}<br>報酬: ${locationData["rewards"]}<br>必要な時間: ${locationData["required_time"]}<br>使い始める時間: ${locationData["start_time"]}<br>使い終わる予定の時間: ${locationData["end_time"]}`,
  );

  //
  // marker.bindPopup(
  //   `忘れ物: ${forgottenItems}<br>ユーザー名: ${locationData["user_name"]}<br>必要な時間: ${locationData["required_time"]}<br>使い始める時間: ${locationData["start_time"]}<br>使い終わる予定の時間: ${locationData["end_time"]}`,
  // );

  // Open the popup by default
  marker.openPopup();
});

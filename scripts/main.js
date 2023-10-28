// Initialize the map
var map = L.map('map').setView([0, 0], 15);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 100,
}).addTo(map);

const data =
[
    {
      "pin_location": {
        "latitude": 35.6895,
        "longitude": 139.6917
      },
      "forgotten_items": ["鍵", "携帯電話"],
      "user_name": "ジョン・ドウ",
      "required_time": "2 時間",
      "start_time": "3:30 PM",
      "end_time": "5:30 PM"
    },
    {
      "pin_location": {
        "latitude": 35.6575,
        "longitude": 139.7027
      },
      "forgotten_items": ["財布", "傘"],
      "user_name": "ジェーン・スミス",
      "required_time": "3 時間",
      "start_time": "10:00 AM",
      "end_time": "1:00 PM"
    },
    {
      "pin_location": {
        "latitude": 35.6895,
        "longitude": 139.6921
      },
      "forgotten_items": ["メガネ", "本"],
      "user_name": "アリス・ジョンソン",
      "required_time": "1.5 時間",
      "start_time": "1:30 PM",
      "end_time": "3:00 PM"
    }
];

data.forEach(locationData => {
    // console.log(locationData); // for debug
    const latitude = locationData.pin_location.latitude;
    const longitude = locationData.pin_location.longitude;
    const forgottenItems = locationData.forgotten_items.join(', '); // Join items into a comma-separated string

    // Create a marker on the map
    const marker = L.marker([latitude, longitude]).addTo(map);
    
    // Create a popup for the marker with the desired information
    marker.bindPopup(`忘れ物: ${forgottenItems}<br>ユーザー名/氏名: ${locationData["ユーザー名/氏名"]}<br>必要な時間: ${locationData["必要な時間"]}<br>使い始める時間: ${locationData["使い始める時間"]}<br>使い終わる予定の時間: ${locationData["使い終わる予定の時間"]}`);
    
    // Open the popup by default
    marker.openPopup();
});
  
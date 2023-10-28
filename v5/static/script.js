// Initialize the map
var map = L.map('map').setView([0, 0], 15);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 100,
}).addTo(map);


// Fetch location data from the server
fetch(`get_location_history`)  // Replace with your actual API endpoint
    .then(response => response.json())
    .then(locationData => {
        // Iterate through the retrieved locationData and add markers to the map
        console.log(locationData); // for debug
        locationData.location_history.forEach(function (location) {
            console.log(location); // for debug
            console.log(location.pin_location); // for debug
            // console.log(location.pin_location.latitude, location.pin_location.longitude, location.lost_item, location.required_time); // for debug
            var latLng = [location.pin_location.latitude, location.pin_location.longitude];
            L.marker(latLng).addTo(map)
                .bindPopup('忘れ物: ' + location.lost_item + '\n' + '使用時間: ' + location.required_time)
                .openPopup();

            // Create a mask layer (rectangle) for the area you want to display
            var southwest = L.latLng(location.latitude - 0.01, location.longitude - 0.01);
            var northeast = L.latLng(location.latitude + 0.01, location.longitude + 0.01);
            var mask = L.rectangle(L.latLngBounds(southwest, northeast), { color: 'blue', fillOpacity: 0 }).addTo(map);

            // tileLayer cannot be called inside here (error may occur)
            // Make the tile layer invisible by default (opacity 0)
            // the initail page is gray due to this line
            // tileLayer.setOpacity(0);
            // tileLayer.setOpacity(1);

            // Set the maximum bounds of the map to the designated area
            // disable this line may work but you can access outside of this bounds by dragging (whole the screen will be gray if you move too much)
            // map.setMaxBounds(L.latLngBounds(southwest, northeast));

        });
    })
    .catch(error => {
        console.error('Error fetching location data:', error);
    });

// ユーザーの位置を取得
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        // 現在位置に地図を移動
        map.setView([lat, lon], 15);

        // southwest, northeastの座標を指定
        var bounds = L.latLngBounds([lat - 0.01, lon - 0.01, [lat + 0.01, lon + 0.01]]);
        // // var bounds = L.latLngBounds([lat1, lon1], [lat2, lon2]);
        // you can drag outside the screen and see the content, but you can not fix your screen to the dragged position;
        // you can only see the area around your current position
        // map.setMaxBounds(bounds);
        // // add the following, you can not drag outside the screen completely
        // map.on('drag', function () {
        //     map.panInsideBounds(bounds, { animate: false });
        // });
      });
}    

// Run without server
// // Replace this with the actual location data you retrieve from your server
// var locationData = [
//     { latitude: 40.7128, longitude: -74.0060, timestamp: '2023-01-01T10:00:00' },
//     { latitude: 34.0522, longitude: -118.2437, timestamp: '2023-01-02T14:30:00' },
//     // Add more location data points as needed
// ];

// // Iterate through locationData and add markers to the map
// locationData.forEach(function (location) {
//     var latLng = [location.latitude, location.longitude];
//     L.marker(latLng).addTo(map)
//         .bindPopup('Timestamp: ' + location.timestamp)
//         .openPopup();
// });
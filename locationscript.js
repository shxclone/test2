const getLocationBtn = document.getElementById('getLocationBtn');
const locationElement = document.getElementById('location');
const targetLat = 40.712776;
const targetLong = -74.005974;


getLocationBtn.addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            locationElement.innerText = `Latitude: ${latitude}, Longitude: ${longitude}`;
        }, function(error) {
            console.error('Error getting location', error);
        });
    } else {
        console.log('Geolocation is not supported by this browser');
    }
});
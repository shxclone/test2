document.addEventListener('DOMContentLoaded', function() {
    const locationElement = document.getElementById('location');
    const refreshLocationBtn = document.getElementById('refreshLocationBtn');

    const targetLat = 40.712776; // Target latitude
    const targetLong = -74.005974; // Target longitude

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(displayLocation, handleError, {
                maximumAge: 60000,
                timeout: 5000,
                enableHighAccuracy: true
            });
        } else {
            locationElement.innerText = 'Geolocation is not supported by this browser.';
        }
    }

    function displayLocation(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        locationElement.innerText = `Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}`;

        // Calculate distance from the target location
        const distance = calculateDistance(latitude, longitude, targetLat, targetLong);
        if (distance <= 20) {
            locationElement.innerText += " - You are within 20 meters of the target location.";
        } else {
            locationElement.innerText += ` - You are more than 20 meters away from the target location. Move ${calculateDirection(latitude, longitude, targetLat, targetLong)}.`;
        }
    }

    function calculateDistance(lat1, lon1, lat2, lon2) {
        function degreesToRadians(degrees) {
            return degrees * Math.PI / 180;
        }

        const earthRadiusMeters = 6371000; // Radius of the Earth in meters
        const dLat = degreesToRadians(lat2 - lat1);
        const dLon = degreesToRadians(lon2 - lon1);

        lat1 = degreesToRadians(lat1);
        lat2 = degreesToRadians(lat2);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2); 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
        return earthRadiusMeters * c; // Distance in meters
    }

    function calculateDirection(lat1, lon1, lat2, lon2) {
        function degreesToRadians(degrees) {
            return degrees * Math.PI / 180;
        }

        function radiansToDegrees(radians) {
            return radians * 180 / Math.PI;
        }

        const dLon = degreesToRadians(lon2 - lon1);

        const y = Math.sin(dLon) * Math.cos(degreesToRadians(lat2));
        const x = Math.cos(degreesToRadians(lat1)) * Math.sin(degreesToRadians(lat2)) -
                  Math.sin(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) * Math.cos(dLon);

        let bearing = radiansToDegrees(Math.atan2(y, x));
        bearing = (bearing + 360) % 360; // Normalize to 0-360

        // Determine direction
        const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
        const index = Math.round(bearing / 45) % 8;
        return directions[index];
    }

    function handleError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                locationElement.innerText = "User denied the request for Geolocation.";
                break;
            case error.POSITION_UNAVAILABLE:
                locationElement.innerText = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                locationElement.innerText = "The request to get user location timed out.";
                break;
            default:
                locationElement.innerText = "An unknown error occurred.";
                break;
        }
    }

    // Get location when the page loads
    getLocation();

    // Add an event listener to refresh the location on button click
    refreshLocationBtn.addEventListener('click', function() {
        getLocation();
    });
});

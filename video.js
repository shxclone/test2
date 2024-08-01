document.addEventListener('DOMContentLoaded', function() {
    const videoForm = document.getElementById('videoForm');
    const videoURLInput = document.getElementById('videoURL');
    const videoPlayer = document.getElementById('videoPlayer');

    videoForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting traditionally

        const videoURL = videoURLInput.value;

        // Check if the URL is not empty
        if (videoURL) {
            // Update the video player's source
            const videoSource = document.createElement('source');
            videoSource.setAttribute('src', videoURL);
            videoSource.setAttribute('type', 'video/mp4');

            // Remove existing sources and add the new one
            while (videoPlayer.firstChild) {
                videoPlayer.removeChild(videoPlayer.firstChild);
            }
            videoPlayer.appendChild(videoSource);

            // Load the new video and play
            videoPlayer.load();
            videoPlayer.play();
        } else {
            alert('Please enter a valid video URL.');
        }
    });
});

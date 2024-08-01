document.addEventListener('DOMContentLoaded', function() {
    const audioForm = document.getElementById('audioForm');
    const audioURLInput = document.getElementById('audioURL');
    const audioPlayer = document.getElementById('audioPlayer');

    audioForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting traditionally

        const audioURL = audioURLInput.value;

        // Check if the URL is not empty and is valid
        if (audioURL) {
            // Create a new source element
            const newSource = document.createElement('source');
            newSource.src = audioURL;
            newSource.type = 'audio/mp3';

            // Clear the previous sources and add the new one
            while (audioPlayer.firstChild) {
                audioPlayer.removeChild(audioPlayer.firstChild);
            }
            audioPlayer.appendChild(newSource);

            // Load and play the new audio source
            audioPlayer.load();
            audioPlayer.play();
        } else {
            alert('Please enter a valid audio URL.');
        }
    });
});

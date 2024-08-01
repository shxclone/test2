// Get references to our HTML elements
const takePictureButton = document.getElementById('take-picture');
const uploadPictureInput = document.getElementById('upload-picture');
const previewDiv = document.getElementById('preview');
const uploadButton = document.getElementById('upload-button');

// Add event listeners to our buttons
takePictureButton.addEventListener('click', takePicture);
uploadPictureInput.addEventListener('change', previewImage);
uploadButton.addEventListener('click', () => {
  const file = uploadPictureInput.files[0];
  if (file) {
    uploadImage(file);
  } else {
    console.error('No file selected');
  }
});

function takePicture() {
    // Clear the preview area
    previewDiv.innerHTML = '';

    // Display a message to click on the video to take a photo
    const message = document.createElement('p');
    message.textContent = 'Click on the video to take a photo';
    previewDiv.appendChild(message);

    // Use the MediaDevices API to access the user's camera
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        // Create a video element to display the camera feed
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        // Add the video element to our preview area
        previewDiv.appendChild(video);
  
        // Add an event listener to capture the photo when the user clicks on the video
        video.addEventListener('click', async () => {
          // Create a canvas element to capture the photo
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          // Get the captured image as a blob
          const imageBlob = await new Promise(resolve => {
            canvas.toBlob(resolve, 'image/png');
          });

          const imageFile = new File([imageBlob], 'image.png', { type: 'image/png' });

          // Stop the video stream
          stream.getTracks().forEach(track => track.stop());

          // Clear the preview area and display the captured image
          previewDiv.innerHTML = '';
          const img = document.createElement('img');
          img.src = URL.createObjectURL(imageFile);
          previewDiv.appendChild(img);

          // Upload the image to the server
          uploadImage(imageFile);
        });
    })
    .catch(error => console.error('Error accessing camera:', error));
}

// Define the previewImage function
function previewImage(event) {
  // Get the selected image file
  const file = event.target.files[0];
  // Create a new image element to display the selected image
  const img = document.createElement('img');
  img.src = URL.createObjectURL(file);
  // Add the image element to our preview area
  previewDiv.appendChild(img);
}

// Define the uploadImage function
function uploadImage(imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile, 'image.png');
    fetch('/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log('Image uploaded successfully:', data);
        // Display the uploaded image
        const img = document.createElement('img');
        if (img) {
          img.src = data.filePath;
        }
      })
      .catch(error => console.error('Error uploading image:', error));
}
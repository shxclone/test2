const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up Multer to handle multipart/form-data requests
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  }
});

const upload = multer({ storage: storage });

// Serve static files from the Camera directory
app.use(express.static(path.join(__dirname)));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up a route to handle image uploads
app.post('/upload', upload.single('image'), (req, res) => {
  // req.file contains the uploaded file
  // req.body contains the entire request body
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  console.log(`Received file: ${req.file.originalname}`);
  console.log(`File saved to: ${req.file.path}`);
  console.log(`File type: ${req.file.mimetype}`);

  // Return a success response
  res.json({ message: 'Image uploaded successfully!', filePath: `/uploads/${req.file.filename}`, fileType: req.file.mimetype });
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
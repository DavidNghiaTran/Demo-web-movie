const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();

// Cấu hình multer để xử lý upload file
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use(cors());

// API endpoint để xử lý upload video
app.post('/api/upload', upload.single('video'), (req, res) => {
  try {
    const file = req.file;
    const { title, description } = req.body;
    
    // Xử lý lưu thông tin vào database
    
    res.json({
      success: true,
      message: 'Upload thành công',
      data: {
        filename: file.filename,
        title,
        description
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Upload thất bại'
    });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
}); 
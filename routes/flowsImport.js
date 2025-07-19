const express = require('express');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), (req, res) => {
  const raw = fs.readFileSync(req.file.path, 'utf8');
  fs.writeFileSync('./config/flows.json', raw);
  res.send('✅ Імпортовано!');
});
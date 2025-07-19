const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/json', (req, res) => {
  const data = fs.readFileSync('./config/flows.json', 'utf8');
  res.setHeader('Content-disposition', 'attachment; filename=flows.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});
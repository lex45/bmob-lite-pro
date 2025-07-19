const express = require('express');
const db = require('../db/db');
const router = express.Router();

router.get('/', (req, res) => {
  const { subid } = req.query;
  if (!subid) return res.status(400).send('Missing subid');

  db.all(`SELECT type, status, timestamp FROM events WHERE subid = ?`, [subid], (err, rows) => {
    if (err) return res.status(500).send('DB error');
    res.json(rows);
  });
});

module.exports = router;
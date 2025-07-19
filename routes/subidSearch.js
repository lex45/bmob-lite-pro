const express = require('express');
const db = require('../db/db');
const router = express.Router();

router.get('/', (req, res) => {
  const { subid } = req.query;
  if (!subid) return res.render('subidSearch', { rows: [], subid });

  db.all(`SELECT * FROM events WHERE subid = ? ORDER BY timestamp DESC LIMIT 100`, [subid], (err, rows) => {
    if (err) return res.render('subidSearch', { rows: [], subid });
    res.render('subidSearch', { rows, subid });
  });
});

module.exports = router;
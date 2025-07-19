const express = require('express');
const db = require('../db/db');
const router = express.Router();

router.get('/', (req, res) => {
  db.all(`SELECT subid, type, COUNT(*) as count
          FROM events GROUP BY subid, type`, [], (err, rows) => {
    if (err) return res.status(500).send('DB error');

    const stats = {};
    rows.forEach(row => {
      if (!stats[row.subid]) stats[row.subid] = {};
      stats[row.subid][row.type] = row.count;
    });

    res.render('dashboard', { stats });
  });
});

module.exports = router;
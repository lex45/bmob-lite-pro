const express = require('express');
const db = require('../db/db');
const router = express.Router();
const parseDateRange = require('../utils/parseTimestamp');

router.get('/', (req, res) => {
  const { from, to } = req.query;
  const { fromDate, toDate } = parseDateRange(from, to);

  db.all(`
    SELECT subid, type, COUNT(*) as count
    FROM events
    WHERE timestamp BETWEEN ? AND ?
    GROUP BY subid, type
  `, [fromDate, toDate], (err, rows) => {
    if (err) return res.render('dateReport', { error: 'DB error', rows: [], fromDate, toDate });

    const stats = {};
    rows.forEach(r => {
      if (!stats[r.subid]) stats[r.subid] = {};
      stats[r.subid][r.type] = r.count;
    });

    res.render('dateReport', { error: null, stats, fromDate, toDate });
  });
});

module.exports = router;
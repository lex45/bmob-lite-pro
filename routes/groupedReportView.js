const express = require('express');
const db = require('../db/db');
const router = express.Router();

router.get('/', (req, res) => {
  const groupBy = req.query.by || 'subid';
  const validGroups = ['subid', 'cid', 'type', 'status'];

  if (!validGroups.includes(groupBy)) {
    return res.render('groupedReport', { error: 'Недійсний параметр групування', rows: [], groupBy });
  }

  const query = `
    SELECT ${groupBy}, COUNT(*) AS count
    FROM events
    GROUP BY ${groupBy}
    ORDER BY count DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) return res.render('groupedReport', { error: 'Помилка БД', rows: [], groupBy });
    res.render('groupedReport', { error: null, rows, groupBy });
  });
});

module.exports = router;
const express = require('express');
const db = require('../db/db');
const router = express.Router();

router.get('/', (req, res) => {
  const groupBy = req.query.by || 'subid';  // 🔸 Параметр групування (наприклад ?by=subid)
  
  const validGroups = ['subid', 'cid', 'type', 'status'];
  if (!validGroups.includes(groupBy)) {
    return res.status(400).send('Invalid grouping parameter');
  }

  const query = `
    SELECT ${groupBy}, COUNT(*) AS count
    FROM events
    GROUP BY ${groupBy}
    ORDER BY count DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).send('DB error');
    res.json(rows);
  });
});

module.exports = router;
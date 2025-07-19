const express = require('express');
const db = require('../db/db');
const router = express.Router();

router.get('/', (req, res) => {
  const { cid, subid, status } = req.query;
  let conditions = [];
  let params = [];

  if (cid) { conditions.push('cid = ?'); params.push(cid); }
  if (subid) { conditions.push('subid = ?'); params.push(subid); }
  if (status) { conditions.push('status = ?'); params.push(status); }

  const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

  db.all(`SELECT * FROM events ${where}`, params, (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(rows);
  });
});

module.exports = router;
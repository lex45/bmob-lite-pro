const express = require('express');
const db = require('../db/db');
const exportCsv = require('../utils/exportCsv');
const router = express.Router();

router.get('/', (req, res) => {
  const { cid, status } = req.query;
  let query = 'SELECT * FROM events';
  let conditions = [];
  let params = [];

  if (cid) { conditions.push('cid = ?'); params.push(cid); }
  if (status) { conditions.push('status = ?'); params.push(status); }
  if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).send('DB error');
    exportCsv(rows, `report_${Date.now()}.csv`);
    res.send('✅ Експортовано до /output/');
  });
});

module.exports = router;
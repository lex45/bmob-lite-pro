const express = require('express');
const db = require('../db/db');
const router = express.Router();

router.get('/', (req, res) => {
  db.all(`SELECT * FROM events`, [], (err, rows) => {
    if (err) return res.status(500).send('DB error');
    const header = 'id,type,cid,subid,status,timestamp\n';
    const csv = rows.map(r => `${r.id},${r.type},${r.cid},${r.subid},${r.status},${r.timestamp}`).join('\n');
    res.setHeader('Content-disposition', 'attachment; filename=events.csv');
    res.set('Content-Type', 'text/csv');
    res.send(header + csv);
  });
});

module.exports = router;
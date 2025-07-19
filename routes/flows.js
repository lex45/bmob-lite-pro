const express = require('express');
const db = require('../db/db');
const router = express.Router();
const flows = require('../config/flows.json');

router.get('/', (req, res) => {
  db.all(`SELECT cid, type, COUNT(*) as count FROM events GROUP BY cid, type`, [], (err, rows) => {
    const stats = {};
    rows.forEach(r => {
      if (!stats[r.cid]) stats[r.cid] = {};
      stats[r.cid][r.type] = r.count;
    });

    flows.forEach(f => {
      f.stats = stats[f.cid] || {};
    });

    res.render('flows', { flows });
  });
});

module.exports = router;
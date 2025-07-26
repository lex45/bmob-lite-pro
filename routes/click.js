module.exports = function(db) {
  const express = require('express');
  const router = express.Router();
  const fs = require('fs');
  const settings = require('../config/settings.json');

  router.get('/', (req, res) => {
    const { cid, subid } = req.query;
    if (!cid || !subid) return res.status(400).json({ error: 'Missing cid or subid' });

    db.run(
      'INSERT INTO events (cid, subid, source, type, timestamp) VALUES (?, ?, ?, ?, ?)',
      [cid, subid, 'api', 'click', Date.now()],
      err => {
        if (err) return res.status(500).json({ error: err.message });

        fs.appendFile(
          settings.logPath,
          `CLICK ${cid} ${subid} ${Date.now()}\n`,
          () => {}
        );

        res.json({ status: 'click recorded' });
      }
    );
  });

  return router;
};
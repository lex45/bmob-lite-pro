module.exports = function(db) {
  const express = require('express');
  const router = express.Router();
  const fs = require('fs');
  const settings = require('../config/settings.json');
  
const telegram = require('../utils/telegram');

  router.post('/', (req, res) => {
    const { cid, subid } = req.body;
    if (!cid || !subid) return res.status(400).json({ error: 'Missing cid or subid' });

    db.run(
      'INSERT INTO events (cid, subid, source, type, timestamp) VALUES (?, ?, ?, ?, ?)',
      [cid, subid, 'api', 'postback', Date.now()],
      err => {
        if (err) return res.status(500).json({ error: err.message });

        fs.appendFile(
          settings.logPath,
          `POSTBACK ${cid} ${subid} ${Date.now()}\n`,
          () => {}
        );
telegram.sendMessage(`📦 POSTBACK\nCID: ${cid}\nSUBID: ${subid}`);

        res.json({ status: 'postback recorded' });
      }
    );
  });

  return router;
};
module.exports = function() {
  const express = require('express');
  const router = express.Router();
  const sqlite3 = require('sqlite3').verbose();
  const fs = require('fs');
  const path = require('path');

  const dbPath = path.join(__dirname, '..', 'db', 'events.sqlite');
  const flowsPath = path.join(__dirname, '..', 'config', 'flows.json');

  router.get('/', (req, res) => {
    const db = new sqlite3.Database(dbPath);
    let flows = [];

    try {
      flows = JSON.parse(fs.readFileSync(flowsPath));
    } catch (err) {
      return res.status(500).send('❌ Не вдалося прочитати flows.json');
    }

    let pending = flows.length;
    flows.forEach(flow => {
      const cid = flow.cid;

      db.all(`SELECT type, COUNT(*) as count FROM events WHERE cid = ? GROUP BY type`,
        [cid],
        (err, rows) => {
          if (!err) {
            flow.stats = { click: 0, postback: 0 };
            rows.forEach(r => {
              if (r.type === 'click') flow.stats.click = r.count;
              if (r.type === 'postback') flow.stats.postback = r.count;
            });
          }

          pending--;
          if (pending === 0) {
            try {
              fs.writeFileSync(flowsPath, JSON.stringify(flows, null, 2));
              res.send('✅ Статистика оновлена');
            } catch (e) {
              res.status(500).send('❌ Не вдалося зберегти flows.json');
            }
            db.close();
          }
        });
    });
  });

  return router;
};
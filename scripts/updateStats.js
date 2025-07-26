const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, '..', 'db', 'events.sqlite');
const flowsPath = path.join(__dirname, '..', 'config', 'flows.json');

const db = new sqlite3.Database(dbPath);
let flows = [];

try {
  flows = JSON.parse(fs.readFileSync(flowsPath));
} catch (err) {
  console.error('❌ Не вдалося прочитати flows.json');
  process.exit(1);
}

// Ітерація по flows
let pending = flows.length;
flows.forEach(flow => {
  const cid = flow.cid;

  db.all(
    `SELECT type, COUNT(*) as count FROM events WHERE cid = ? GROUP BY type`,
    [cid],
    (err, rows) => {
      if (err) {
        console.error(`Error for CID ${cid}:`, err);
      } else {
        flow.stats = { click: 0, postback: 0 };
        rows.forEach(r => {
          if (r.type === 'click') flow.stats.click = r.count;
          if (r.type === 'postback') flow.stats.postback = r.count;
        });
      }

      pending--;
      if (pending === 0) {
        fs.writeFileSync(flowsPath, JSON.stringify(flows, null, 2));
        console.log('✅ flows.json оновлено');
        db.close();
      }
    }
  );
});
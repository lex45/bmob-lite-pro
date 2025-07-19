const db = require('../db/db');
const fs = require('fs');
const settings = require('../config/settings.json');

function saveEvent(event) {
  const ts = new Date().toISOString();
  db.run(`INSERT INTO events (type, cid, subid, status, timestamp)
          VALUES (?, ?, ?, ?, ?)`,
          [event.type, event.cid, event.subid, event.status || null, ts]);

  const logEntry = `[${ts}] ${event.type} | CID: ${event.cid} | SUBID: ${event.subid}\n`;
  fs.appendFileSync(settings.logPath, logEntry);
}

module.exports = saveEvent;
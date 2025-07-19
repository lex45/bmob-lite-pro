const db = require('../db/db');
const cutoff = new Date();
cutoff.setDate(cutoff.getDate() - 30);

db.run(`DELETE FROM events WHERE timestamp < ?`, [cutoff.toISOString()], (err) => {
  if (err) console.error('❌ Clean error', err);
  else console.log('🧹 Старі події очищено');
});
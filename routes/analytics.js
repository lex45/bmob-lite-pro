const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const VISITS_PATH = path.join(__dirname, '..', 'data', 'visits.json');

router.get('/tree', (req, res) => {
  let visits = [];
  try {
    visits = JSON.parse(fs.readFileSync(VISITS_PATH, 'utf-8'));
  } catch (err) {
    console.error('❌ visits.json:', err);
  }

  const grouped = {};
  visits.forEach(v => {
    const src = v.source;
    const day = new Date(v.timestamp).toLocaleDateString('uk-UA', { weekday: 'long' });
    const ref = v.referrer;
    const dev = v.device;

    grouped[src] ??= {};
    grouped[src][day] ??= {};
    grouped[src][day][ref] ??= {};
    grouped[src][day][ref][dev] ??= { visits: 0 };
    grouped[src][day][ref][dev].visits++;
  });

  res.render('analytics-tree', { grouped });
});

module.exports = router;
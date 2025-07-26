const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

const FLOWS_PATH = path.join(__dirname, '..', 'data', 'flows.json');

router.post('/update', (req, res) => {
  const updated = req.body;

  if (!updated.cid) {
    console.log('❌ CID не передано');
    return res.status(400).send('CID is required');
  }

  let flows = [];
  try {
    flows = JSON.parse(fs.readFileSync(FLOWS_PATH, 'utf-8'));
  } catch (err) {
    console.error('❌ Помилка читання flows.json', err);
    return res.status(500).send('Помилка читання flows.json');
  }

  const found = flows.find(f => f.cid === updated.cid);
  if (!found) {
    console.log('❌ Кампанію не знайдено для CID:', updated.cid);
    return res.status(404).send('CID не знайдено');
  }

  const newFlows = flows.map(f => f.cid === updated.cid ? { ...f, ...updated } : f);

  try {
    fs.writeFileSync(FLOWS_PATH, JSON.stringify(newFlows, null, 2), 'utf-8');
    console.log('✅ Збережено CID:', updated.cid);
    res.json({ status: 'saved', cid: updated.cid });
  } catch (err) {
    console.error('❌ Помилка запису flows.json', err);
    res.status(500).send('Помилка збереження flows.json');
  }
});

module.exports = router;
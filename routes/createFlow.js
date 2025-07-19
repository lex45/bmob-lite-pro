const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const flowsPath = path.join(__dirname, '../config/flows.json');

router.get('/', (req, res) => res.render('createFlow'));

router.post('/', (req, res) => {
  const { cid, name, geo, source } = req.body;
  const flows = JSON.parse(fs.readFileSync(flowsPath, 'utf8'));
  flows.push({ cid, name, params: { geo, source } });
  fs.writeFileSync(flowsPath, JSON.stringify(flows, null, 2));
  res.send('✅ Потік створено');
});

module.exports = router;
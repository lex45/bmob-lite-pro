// routes/addFlow.js
module.exports = function() {
  const express = require('express');
  const router = express.Router();
  const fs = require('fs');
  const path = require('path');

  const flowsPath = path.join(__dirname, '..', 'config', 'flows.json');

  router.post('/', (req, res) => {
    const { cid, name, geo, source } = req.body;
    if (!cid) return res.status(400).send('Missing CID');

    let flows = [];
    try {
      flows = JSON.parse(fs.readFileSync(flowsPath));
    } catch {
      flows = [];
    }

    // Перевірка — чи вже існує така кампанія
    const exists = flows.find(f => f.cid === cid);
    if (exists) return res.status(400).send('CID already exists');

    flows.push({
      cid,
      name: name || '',
      params: { geo: geo || '', source: source || '' },
      stats: { click: 0, postback: 0 }
    });

    try {
      fs.writeFileSync(flowsPath, JSON.stringify(flows, null, 2));
      res.redirect('/flows/manage');
    } catch (err) {
      res.status(500).send('Failed to save new flow');
    }
  });

  return router;
};
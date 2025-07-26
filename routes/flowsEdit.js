module.exports = function() {
  const express = require('express');
  const router = express.Router();
  const fs = require('fs');
  const path = require('path');

  const flowsPath = path.join(__dirname, '..', 'config', 'flows.json');

  router.post('/', (req, res) => {
    const { cid, name, geo, source } = req.body;
    if (!cid) return res.status(400).json({ error: 'Missing cid' });

    let flows = [];
    try {
      flows = JSON.parse(fs.readFileSync(flowsPath));
    } catch (err) {
      return res.status(500).json({ error: 'Flows file unreadable' });
    }

    let updated = false;
    flows = flows.map(f => {
      if (f.cid === cid) {
        if (name) f.name = name;
        if (geo) f.params.geo = geo;
        if (source) f.params.source = source;
        updated = true;
      }
      return f;
    });

    if (!updated) {
      flows.push({
        cid,
        name: name || '',
        params: { geo: geo || '', source: source || '' },
        stats: { click: 0, postback: 0 }
      });
    }

    try {
      fs.writeFileSync(flowsPath, JSON.stringify(flows, null, 2));
      res.json({ status: 'saved', cid });
    } catch (err) {
      res.status(500).json({ error: 'Failed to save flows' });
    }
  });

  return router;
};
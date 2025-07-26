module.exports = function() {
  const express = require('express');
  const router = express.Router();
  const path = require('path');
  const fs = require('fs');

  router.get('/', (req, res) => {
    const flowsPath = path.join(__dirname, '..', 'config', 'flows.json');
    let flows = [];

    try {
      const raw = fs.readFileSync(flowsPath);
      flows = JSON.parse(raw);
    } catch (err) {
      return res.status(500).send('Failed to load flows.json');
    }

    res.render('flows', { flows });
  });

  return router;
};
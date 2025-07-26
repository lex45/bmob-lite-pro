module.exports = function() {
  const express = require('express');
  const router = express.Router();
  const fs = require('fs');
  const path = require('path');

  const flowsPath = path.join(__dirname, '..', 'config', 'flows.json');

  router.get('/', (req, res) => {
    let flows = [];
    try {
      flows = JSON.parse(fs.readFileSync(flowsPath));
    } catch {
      flows = [];
    }
    res.render('manage', { flows });
  });

  return router;
};
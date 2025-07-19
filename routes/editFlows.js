const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const flowsPath = path.join(__dirname, '../config/flows.json');

router.get('/', (req, res) => {
  const flows = JSON.parse(fs.readFileSync(flowsPath, 'utf8'));
  res.render('editFlows', { flows });
});

router.post('/:cid', (req, res) => {
  const { name, geo, source } = req.body;
  const cid = req.params.cid;
  const flows = JSON.parse(fs.readFileSync(flowsPath, 'utf8'));
  const updated = flows.map(f => f.cid === cid ? { cid, name, params: { geo, source } } : f);
  fs.writeFileSync(flowsPath, JSON.stringify(updated, null, 2));
  res.redirect('/flows/edit');
});

module.exports = router;
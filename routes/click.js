const express = require('express');
const saveEvent = require('../utils/saveEvent');
const validate = require('../utils/validateParams');
const router = express.Router();

router.get('/', (req, res) => {
  const { cid, subid } = req.query;
  if (!validate(req.query, ['cid', 'subid']))
    return res.status(400).send('Missing params');

  saveEvent({ type: 'click', cid, subid });
  res.sendFile('pixel.html', { root: './templates' });
});

module.exports = router;
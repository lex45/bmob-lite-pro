const express = require('express');
const saveEvent = require('../utils/saveEvent');
const validate = require('../utils/validateParams');
const router = express.Router();

router.get('/', (req, res) => {
  const { cid, subid, status } = req.query;
  if (!validate(req.query, ['cid', 'subid'])) return res.status(400).send('Missing params');

  let mappedStatus = status;
  if (status === '1') mappedStatus = 'lead';
  else if (status === '2') mappedStatus = 'approved';
  else if (!status) mappedStatus = 'pending';

  saveEvent({ type: 'postback', cid, subid, status: mappedStatus });
  
  const notify = require('../utils/notifyTelegram');
// після saveEvent(...)
notify({ cid, subid, status: mappedStatus });
  
  res.send(`OK: ${mappedStatus}`);
});

module.exports = router;

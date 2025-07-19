const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { cid, subid, utm_source, utm_medium, utm_campaign } = req.query;

  if (!cid || !subid) return res.status(400).send('CID і SUBID обовʼязкові');

  const url = `https://yourdomain.com/landing?cid=${cid}&subid=${subid}`
    + (utm_source ? `&utm_source=${utm_source}` : '')
    + (utm_medium ? `&utm_medium=${utm_medium}` : '')
    + (utm_campaign ? `&utm_campaign=${utm_campaign}` : '');

  res.send(`<pre>${url}</pre>`);
});

module.exports = router;
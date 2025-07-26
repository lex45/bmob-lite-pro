const express = require('express');
const router = express.Router();

router.get('/campaigns', (req, res) => {
  const campaigns = require('../data/campaigns.json');
  res.render('dashboard', { campaigns });
});

module.exports = router;
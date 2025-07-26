const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const OFFERS_PATH = path.join(__dirname, '..', 'data', 'offers.json');

// 📄 GET /offers/manage — список
router.get('/manage', (req, res) => {
  let offers = [];
  try {
    offers = JSON.parse(fs.readFileSync(OFFERS_PATH, 'utf-8'));
  } catch (err) {
    console.error('❌ offers.json:', err);
  }
  res.render('offers-manage', { offers });
});

// ➕ POST /offers/add — новий офер
router.post('/add', (req, res) => {
  const newOffer = req.body;
  let offers = [];

  try {
    offers = JSON.parse(fs.readFileSync(OFFERS_PATH, 'utf-8'));
  } catch (err) {
    console.error(err);
  }

  // Перевірка унікальності ID
  if (offers.find(o => o.id === newOffer.id)) {
    return res.status(400).send('❌ ID вже існує');
  }

  offers.push(newOffer);

  try {
    fs.writeFileSync(OFFERS_PATH, JSON.stringify(offers, null, 2), 'utf-8');
    res.redirect('/offers/manage');
  } catch (err) {
    res.status(500).send('❌ Помилка збереження');
  }
});

module.exports = router;
console.log('GET /offers/manage')
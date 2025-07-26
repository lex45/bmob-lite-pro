const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const PARTNERS_PATH = path.join(__dirname, '..', 'data', 'partners.json');

// 📄 GET /partners/manage — список
router.get('/manage', (req, res) => {
  let partners = [];
  try {
    partners = JSON.parse(fs.readFileSync(PARTNERS_PATH, 'utf-8'));
  } catch (err) {
    console.error('❌ partners.json:', err);
  }
  res.render('partners-manage', { partners });
});

// ➕ POST /partners/add
router.post('/add', (req, res) => {
  const newPartner = req.body;
  let partners = [];

  try {
    partners = JSON.parse(fs.readFileSync(PARTNERS_PATH, 'utf-8'));
  } catch (err) {
    console.error(err);
  }

  if (partners.find(p => p.id === newPartner.id)) {
    return res.status(400).send('❌ ID вже зайнятий');
  }

  partners.push(newPartner);

  try {
    fs.writeFileSync(PARTNERS_PATH, JSON.stringify(partners, null, 2), 'utf-8');
    res.redirect('/partners/manage');
  } catch (err) {
    res.status(500).send('❌ Помилка збереження');
  }
});

module.exports = router;

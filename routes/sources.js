const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const SOURCES_PATH = path.join(__dirname, '..', 'data', 'sources.json');

// 📄 GET /sources/manage — список джерел
router.get('/manage', (req, res) => {
  let sources = [];
  try {
    sources = JSON.parse(fs.readFileSync(SOURCES_PATH, 'utf-8'));
  } catch (err) {
    console.error('❌ sources.json:', err);
  }
  res.render('sources-manage', { sources });
});

// ➕ POST /sources/add — новий запис
router.post('/add', (req, res) => {
  const newSource = req.body;
  let sources = [];

  try {
    sources = JSON.parse(fs.readFileSync(SOURCES_PATH, 'utf-8'));
  } catch (err) {
    console.error(err);
  }

  if (sources.find(s => s.id === newSource.id)) {
    return res.status(400).send('❌ ID джерела вже існує');
  }

  sources.push(newSource);

  try {
    fs.writeFileSync(SOURCES_PATH, JSON.stringify(sources, null, 2), 'utf-8');
    res.redirect('/sources/manage');
  } catch (err) {
    res.status(500).send('❌ Помилка збереження');
  }
});

module.exports = router;

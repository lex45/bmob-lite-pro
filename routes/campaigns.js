const router = require('express').Router();

router.get('/create', (req, res) => {
  res.render('campaigns-create');
});

module.exports = router;

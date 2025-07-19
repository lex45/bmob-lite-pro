const settings = require('../config/settings.json');
module.exports = (req, res, next) => {
  const token = req.query.token;
  if (token !== settings.authToken) {
    return res.status(403).send('❌ Доступ заборонено');
  }
  next();
};
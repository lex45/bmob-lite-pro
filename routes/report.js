module.exports = function(db) {
  const express = require('express');
  const router = express.Router();

  router.get('/', (req, res) => {
    const { cid, subid, type } = req.query;

    let query = 'SELECT * FROM events WHERE 1=1';
    const params = [];

    if (cid) {
      query += ' AND cid = ?';
      params.push(cid);
    }

    if (subid) {
      query += ' AND subid = ?';
      params.push(subid);
    }

    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }

    query += ' ORDER BY timestamp DESC LIMIT 100';

    db.all(query, params, (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  return router;
};
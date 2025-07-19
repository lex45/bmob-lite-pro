const sqlite3 = require('sqlite3').verbose();
const settings = require('../config/settings.json');

const db = new sqlite3.Database(settings.dbPath);
module.exports = db;
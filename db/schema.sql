CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT,
  cid TEXT,
  subid TEXT,
  status TEXT,
  timestamp TEXT
);
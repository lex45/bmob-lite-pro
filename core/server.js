const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

// 🧭 Logging
app.use(morgan('dev'));

// 📦 POST-формати
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🧩 View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// 📡 Маршрути
app.use('/offers', require('../routes/offers'));
app.use('/sources', require('../routes/sources'));
app.use('/partners', require('../routes/partners'));
app.use('/campaigns', require('../routes/campaigns'));
app.use('/analytics', require('../routes/analytics'));


const dashboardRouter = require('../routes/dashboard');
app.use('/dashboard', dashboardRouter);

// 🧪 Healthcheck
app.get('/status', (req, res) => {
  res.send({ status: 'ok', time: new Date().toISOString() });
});

// 🛑 404 fallback
app.use((req, res) => {
  res.status(404).send('🔍 Route not found');
});

// 🚀 Старт сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`📡 Server running on http://localhost:${PORT}`);
});
const express = require('express');
const fs = require('fs');
const settings = require('./config/settings.json');
const app = express();

if (!fs.existsSync(settings.logPath)) fs.writeFileSync(settings.logPath, '');

app.use('/click', require('./routes/click'));
app.use('/postback', require('./routes/postback'));
app.use('/report', require('./routes/report'));

app.listen(settings.port, () => {
  console.log(`🚀 Tracker running on port ${settings.port}`);
});

app.set('view engine', 'ejs');
app.use('/dashboard', require('./routes/dashboard'));

app.use('/generate', require('./routes/generate'));

app.use('/export', require('./routes/export'));

app.use('/grouped-report', require('./routes/groupedReport'));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/grouped-ui', require('./routes/groupedReportView'));

app.use('/flows', require('./routes/flows'));
app.use('/date-report', require('./routes/dateReport'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/flows/create', require('./routes/createFlow'));

app.use('/api/report', require('./api/report'));

app.use('/export-filtered', require('./routes/exportFiltered'));

const auth = require('./middleware/auth');
app.use('/flows', auth, require('./routes/flows'));
app.use('/date-report', auth, require('./routes/dateReport'));
app.use('/grouped-ui', auth, require('./routes/groupedReportView'));

app.use('/link-gen', require('./routes/linkGen'));

app.use('/subid-search', auth, require('./routes/subidSearch'));

app.use('/flows/edit', auth, require('./routes/editFlows'));

const multer = require('multer'); // якщо ще не додано
app.use('/flows/export', auth, require('./routes/flowsExport'));
app.use('/flows/import', auth, require('./routes/flowsImport'));

setInterval(() => require('./utils/autoClean'), 3600 * 1000); // щогодини
const fs = require('fs');
module.exports = function exportCsv(rows, filename = 'report.csv') {
  const header = 'id,type,cid,subid,status,timestamp\n';
  const csv = rows.map(r =>
    `${r.id},${r.type},${r.cid},${r.subid},${r.status},${r.timestamp}`
  ).join('\n');
  fs.writeFileSync(`./output/${filename}`, header + csv);
};
module.exports = function(from, to) {
  const today = new Date();
  const fromDate = from ? new Date(from).toISOString() : new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7).toISOString();
  const toDate = to ? new Date(to).toISOString() : today.toISOString();
  return { fromDate, toDate };
};
module.exports = function validateParams(params, required) {
  return required.every(key => params[key] && params[key].length > 0);
};
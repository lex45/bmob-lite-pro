const axios = require('axios');
const settings = require('../config/settings.json');

module.exports = async function notifyTelegram(event) {
  const message = `📨 New postback\nCID: ${event.cid}\nSUBID: ${event.subid}\nStatus: ${event.status}`;
  await axios.post(`https://api.telegram.org/bot${settings.telegramBotToken}/sendMessage`, {
    chat_id: settings.telegramChatId,
    text: message
  });
};
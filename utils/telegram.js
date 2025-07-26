// utils/telegram.js
const TelegramBot = require('node-telegram-bot-api');
const settings = require('../config/settings.json');

let bot = null;

function initTelegram() {
  if (settings.telegramBotToken && settings.telegramChatId) {
    bot = new TelegramBot(settings.telegramBotToken, { polling: false });
  }
}

function sendMessage(msg) {
  if (!bot || !settings.telegramChatId) return;
  bot.sendMessage(settings.telegramChatId, msg);
}

module.exports = {
  initTelegram,
  sendMessage
};
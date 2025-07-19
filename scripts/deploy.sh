#!/bin/bash

# 🕒 Лог-файл
LOG="/home/oleg/deploy.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')
echo "[$DATE] 🔄 START DEPLOY" >> $LOG

# 📁 Переходимо в проєкт
cd /home/oleg/bmob-lite-pro || { echo "❌ No such directory"; exit 1; }

# 🔧 Оновлення коду
git pull origin main >> $LOG 2>&1
if [ $? -ne 0 ]; then
  echo "❌ Git pull failed" >> $LOG
  exit 1
fi
echo "✅ Git pull OK" >> $LOG

# 📦 Оновлення залежностей
npm install >> $LOG 2>&1
echo "📦 NPM packages updated" >> $LOG

# 🚀 Перезапуск сервера
pm2 restart bmob-tracker >> $LOG 2>&1
echo "🔁 PM2 restarted bmob-tracker" >> $LOG

# 🧹 Опціональна очистка логів > 50 KB
LOGSIZE=$(du -k "$LOG" | cut -f1)
if [ "$LOGSIZE" -gt 50 ]; then
  echo "🧹 Log cleaned" > $LOG
fi

echo "[$DATE] ✅ DEPLOY COMPLETE" >> $LOG
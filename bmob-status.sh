#!/bin/bash

echo "🧪 Перевірка Bmob Tracker..."

echo "🔄 Перевірка процесу Node.js:"
pgrep -fa "node core/server.js" || echo "❌ Сервер не запущено"

echo "🌐 Перевірка порту 3000:"
ss -tulpn | grep ":3000" || echo "❌ Порт 3000 не слухає"

echo "📡 Перевірка /ping:"
curl -s http://localhost:3000/ping || echo "❌ /ping недоступний"

echo "📲 Перевірка /click:"
curl -s "http://localhost:3000/click?cid=test&subid=123" || echo "❌ /click не відповідає"

echo "🗃️ Перевірка БД:"
sqlite3 db/events.sqlite "SELECT COUNT(*) FROM events;" || echo "❌ База events.sqlite недоступна"

echo "📄 Перевірка логів:"
tail -n 3 logs/events.log || echo "❌ Логи не знайдені"

echo "🔐 Перевірка settings.json:"
jq '.port, .dbPath, .authToken, .telegramBotToken, .telegramChatId' config/settings.json || echo "❌ settings.json некоректний або jq не встановлено"

echo "✅ Готово!"

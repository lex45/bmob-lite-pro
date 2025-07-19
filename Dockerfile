FROM node:20

# Створення робочої директорії
WORKDIR /app

# Копіюємо package.json + встановлюємо залежності
COPY package*.json ./
RUN npm install

# Копіюємо увесь код
COPY . .

# Створення бази при запуску (якщо нема)
RUN mkdir -p db && touch db/events.sqlite

# Експортуємо порт
EXPOSE 3000

# Запуск трекера
CMD ["node", "core/server.js"]
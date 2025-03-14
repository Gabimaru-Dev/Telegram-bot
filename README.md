# Telegram-bot
```ts
const token = '7632272537:AAEgzRxc50QCjRnHB6cW2HTFlqa7enW5ghI';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
```
```ts
bot.onText(/\start/, (msg) => {
bot.sendMessage(msg.chat.id, `Hello ${msg.from.first_name || "there"}\nWelcome To My Telegram Bot`);
});
```
# Developed By King Gabimaru 

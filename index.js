const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error("Ошибка: не задан BOT_TOKEN");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

const website = "https://shahsiya.github.io/shahsiya-legal_turkey/";

const keyboard = {
  reply_markup: {
    keyboard: [
      ["🏠 ВНЖ и гражданство"],
      ["📄 Переводы и нотариус"],
      ["🌐 Апостиль и легализация"],
      ["🏢 Недвижимость и бизнес"],
      ["🌍 Открыть сайт", "📞 Связаться с нами"],
    ],
    resize_keyboard: true,
  },
};

bot.onText(/^\/start$/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Добро пожаловать в Shahsiya Legal Turkey!\n\n" +
      "Помогаем иностранцам с документами и административными вопросами в Турции.\n\n" +
      "Выберите интересующую вас услугу в меню ниже.",
    keyboard,
  );
});

bot.onText(/^\/services$/, (msg) => {
  bot.sendMessage(msg.chat.id, "Выберите услугу в меню ниже.", keyboard);
});

bot.onText(/^\/website$/, (msg) => {
  bot.sendMessage(msg.chat.id, `Наш сайт:\n${website}`);
});

bot.onText(/^\/contact$/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Связаться с Shahsiya Legal Turkey:\n" +
      "Откройте наш сайт и воспользуйтесь указанными там контактами.\n" +
      website,
  );
});

bot.on("message", (msg) => {
  if (!msg.text || msg.text.startsWith("/")) return;

  const chatId = msg.chat.id;
  const text = msg.text;

  const services = {
    "🏠 ВНЖ и гражданство":
      "Консультации по вопросам ВНЖ и гражданства в Турции.",
    "📄 Переводы и нотариус":
      "Услуги перевода документов, нотариального заверения и сопровождения.",
    "🌐 Апостиль и легализация":
      "Помощь с апостилем и легализацией документов.",
    "🏢 Недвижимость и бизнес":
      "Консультации по вопросам недвижимости, регистрации бизнеса и административного сопровождения.",
  };

  if (services[text]) {
    bot.sendMessage(
      chatId,
      `${services[text]}\n\nПодробности и обращение:\n${website}`,
      keyboard,
    );
    return;
  }

  if (text === "🌍 Открыть сайт") {
    bot.sendMessage(chatId, `Наш сайт:\n${website}`, keyboard);
    return;
  }

  if (text === "📞 Связаться с нами") {
    bot.sendMessage(
      chatId,
      `Откройте сайт, чтобы воспользоваться контактами:\n${website}`,
      keyboard,
    );
  }
});

bot.on("polling_error", (error) => {
  console.error("Ошибка Telegram:", error.message);
});

console.log("Shahsiya Legal Turkey Bot запущен.");

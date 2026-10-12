const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error("Ошибка: не задан BOT_TOKEN");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

const website = "https://shahsiya.github.io/shahsiya-legal_turkey/";

const serviceLinks = {
  apostille: `${website}?service=apostille`,
  vnj: `${website}?service=vnj`,
  realestate: `${website}?service=realestate`,
  notary: `${website}?service=notary`,
  marriage: `${website}?service=marriage`,
  business: `${website}?service=business`,
  registration: `${website}?service=registration`,
  taahut: `${website}?service=taahut`,
  full: `${website}?service=full`,
};

const contactLink = `${website}#contact`;

const keyboard = {
  reply_markup: {
    keyboard: [
      ["🏠 ВНЖ и гражданство"],
      ["🌐 Апостиль и легализация"],
      ["🏡 Недвижимость", "🏢 Бизнес-консалтинг"],
      ["📄 Перевод и нотариус", "💍 Заключение брака"],
      ["📍 Прописка (ikametgâh)"],
      ["📝 Таахутнаме"],
      ["⭐ Сопровождение под ключ"],
      ["🌍 Открыть сайт", "📞 Связаться с нами"],
    ],
    resize_keyboard: true,
  },
};

const services = {
  "🏠 ВНЖ и гражданство": {
    title: "ВНЖ и гражданство",
    description:
      "Консультации и сопровождение по вопросам вида на жительство и гражданства в Турции.",
    url: serviceLinks.vnj,
  },

  "🌐 Апостиль и легализация": {
    title: "Апостиль и легализация",
    description:
      "Помощь с апостилем, легализацией и подготовкой документов для использования в Турции и за её пределами.",
    url: serviceLinks.apostille,
  },

  "🏡 Недвижимость": {
    title: "Недвижимость",
    description:
      "Консультационное сопровождение по вопросам недвижимости в Турции.",
    url: serviceLinks.realestate,
  },

  "📄 Перевод и нотариус": {
    title: "Перевод и нотариус",
    description:
      "Услуги перевода документов, нотариального заверения и сопровождения оформления документов.",
    url: serviceLinks.notary,
  },

  "💍 Заключение брака": {
    title: "Заключение брака",
    description:
      "Консультации по документам и процедуре заключения брака в Турции.",
    url: serviceLinks.marriage,
  },

  "🏢 Бизнес-консалтинг": {
    title: "Бизнес-консалтинг",
    description:
      "Консультации по регистрации бизнеса и административным вопросам в Турции.",
    url: serviceLinks.business,
  },

  "📍 Прописка (ikametgâh)": {
    title: "Прописка (ikametgâh)",
    description:
      "Консультации по вопросам адресной регистрации и оформления документов о месте проживания в Турции.",
    url: serviceLinks.registration,
  },

  "📝 Таахутнаме": {
    title: "Нотариальное обязательство (Таахутнаме)",
    description:
      "Информация и сопровождение по оформлению нотариального обязательства (Taahhütname).",
    url: serviceLinks.taahut,
  },

  "⭐ Сопровождение под ключ": {
    title: "Комплексное сопровождение «под ключ»",
    description:
      "Комплексное сопровождение по выбранному вопросу: от консультации и подготовки документов до прохождения необходимых процедур.",
    url: serviceLinks.full,
  },
};

// Приветствие в личном чате
bot.onText(/^\/start$/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "⚖️ <b>ЮРИДИЧЕСКАЯ ПОДДЕРЖКА И ЛЕГАЛИЗАЦИЯ В ТУРЦИИ</b>\n\n" +
      "Добро пожаловать в Shahsiya Legal Turkey!\n\n" +
      "Помогаем иностранцам с документами и административными вопросами в Турции.\n\n" +
      "📌 Выберите интересующую вас услугу в меню ниже.\n" +
      "Подробная информация доступна на нашем сайте.",
    {
      ...keyboard,
      parse_mode: "HTML",
    },
  );
});

// Меню услуг
bot.onText(/^\/services$/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "⚖️ <b>Наши услуги</b>\n\n" +
      "Выберите услугу из меню ниже. Вы получите описание и ссылку на соответствующий раздел сайта.",
    {
      ...keyboard,
      parse_mode: "HTML",
    },
  );
});

// Сайт
bot.onText(/^\/website$/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `Сайт Shahsiya Legal Turkey:\n${website}`,
    keyboard,
  );
});

// Контакты
bot.onText(/^\/contact$/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Связаться с Shahsiya Legal Turkey можно через контакты на сайте:\n" +
      contactLink,
    keyboard,
  );
});

// Обработка нажатий кнопок в личном чате
bot.on("message", (msg) => {
  if (!msg.text || msg.text.startsWith("/")) return;

  const chatId = msg.chat.id;
  const selectedService = services[msg.text];

  if (selectedService) {
    bot.sendMessage(
      chatId,
      `<b>${selectedService.title}</b>\n\n` +
        `${selectedService.description}\n\n` +
        `🔎 <a href="${selectedService.url}">Подробнее об услуге</a>\n\n` +
        `📞 <a href="${contactLink}">Связаться с нами</a>`,
      {
        ...keyboard,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      },
    );
    return;
  }

  if (msg.text === "🌍 Открыть сайт") {
    bot.sendMessage(
      chatId,
      `Сайт Shahsiya Legal Turkey:\n${website}`,
      keyboard,
    );
    return;
  }

  if (msg.text === "📞 Связаться с нами") {
    bot.sendMessage(
      chatId,
      `Контакты и способы связи:\n${contactLink}`,
      keyboard,
    );
  }
});

// Каталог услуг в группе и заданной теме Telegram
bot.onText(/\/postservices(@\w+)?/, (msg) => {
  const chatId = -1004294362025;
  const threadId = 3692;

  const services = [
    ["ВНЖ и гражданство", "vnj"],
    ["Апостиль и легализация", "apostille"],
    ["Недвижимость", "realestate"],
    ["Перевод и нотариус", "notary"],
    ["Заключение брака", "marriage"],
    ["Бизнес-консалтинг", "business"],
    ["Прописка (ikametgâh)", "registration"],
    ["Нотариальное обязательство (Таахутнаме)", "taahut"],
    ["Комплексное сопровождение «под ключ»", "full"],
  ];

  const baseUrl = "https://shahsiya.github.io/shahsiya-legal_turkey/";

  const keyboard = services.map(([name, id]) => [
    {
      text: name,
      url: `${baseUrl}?service=${id}`,
    },
  ]);

  const message =
    "⚖️ <b>ЮРИДИЧЕСКАЯ ПОДДЕРЖКА И ЛЕГАЛИЗАЦИЯ В ТУРЦИИ</b>\n" +
    "━━━━━━━━━━━━━━━━━━━━\n\n" +
    "Добро пожаловать в Shahsiya Legal Turkey!\n\n" +
    "Помогаем иностранцам с документами и административными вопросами в Турции.\n\n" +
    "📌 <b>НАШИ УСЛУГИ</b>\n\n" +
    "• ВНЖ и гражданство\n" +
    "• Апостиль и легализация документов\n" +
    "• Недвижимость и бизнес-консалтинг\n" +
    "• Перевод и нотариальное оформление\n" +
    "• Заключение брака и адресная регистрация\n" +
    "• Нотариальное обязательство (Таахутнаме)\n" +
    "• Комплексное сопровождение «под ключ»\n\n" +
    "👇 <b>Выберите услугу с помощью кнопок ниже.</b>";

  bot
    .sendMessage(chatId, message, {
      message_thread_id: threadId,
      parse_mode: "HTML",
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: keyboard,
      },
    })
    .then(() => console.log("Каталог услуг опубликован в теме 3692"))
    .catch((err) => console.error("Ошибка публикации каталога:", err.message));
});

bot.on("polling_error", (error) => {
  console.error("Ошибка Telegram:", error.message);
});

console.log("Shahsiya Legal Turkey Bot запущен.");

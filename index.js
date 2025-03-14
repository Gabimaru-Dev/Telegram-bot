
const {
    default: makeWASocket,
    useMultiFileAuthState,
    downloadContentFromMessage,
    emitGroupParticipantsUpdate,
    emitGroupUpdate,
    generateWAMessageContent,
    generateWAMessage,
    makeInMemoryStore,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    MediaType,
    areJidsSameUser,
    WAMessageStatus,
    makeCacheableSignalKeyStore,
    downloadAndSaveMediaMessage,
    AuthenticationState,
    GroupMetadata,
    initInMemoryKeyStore,
    getContentType,
    MiscMessageGenerationOptions,
    useSingleFileAuthState,
    BufferJSON,
    WAMessageProto,
    MessageOptions,
    WAFlag,
    WANode,
    WAMetric,
    ChatModification,
    MessageTypeProto,
    WALocationMessage,
    ReconnectMode,
    WAContextInfo,
    proto,
    WAGroupMetadata,
    ProxyAgent,
    waChatKey,
    MimetypeMap,
    MediaPathMap,
    WAContactMessage,
    WAContactsArrayMessage,
    WAGroupInviteMessage,
    WATextMessage,
    WAMessageContent,
    WAMessage,
    BaileysError,
    WA_MESSAGE_STATUS_TYPE,
    MediaConnInfo,
    URL_REGEX,
    WAUrlInfo,
    WA_DEFAULT_EPHEMERAL,
    WAMediaUpload,
    jidDecode,
    mentionedJid,
    processTime,
    Browser,
    MessageType,
    Presence,
    WA_MESSAGE_STUB_TYPES,
    Mimetype,
    relayWAMessage,
    Browsers,
    GroupSettingChange,
    DisconnectReason,
    WASocket,
    getStream,
    WAProto,
    isBaileys,
    getDevice,
    AnyMessageContent,
    fetchLatestBaileysVersion,
    templateMessage,
    InteractiveMessage,
    Header,
} = require('@adiwajshing/baileys');
const TelegramBot = require('node-telegram-bot-api');
const NodeCache = require('node-cache');
const pino = require('pino');
const yts = require('yt-search');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const speed = require("performance-now")
const moment = require("moment-timezone");
const jimp = require("jimp");
const crypto = require('crypto');

const startTime = Date.now();
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });
// Replace with your actual owner ID
const ownerId = '7638524824';
//  Base URL of the image generation API
const imageUrlBase = 'https://rest-api-faris.onrender.com/ai/dalle';
//wabot.js
const { commands } = require('./wabotDirs/cmds.js');
// Replace 'YOUR_BOT_TOKEN' with your actual bot token from BotFather
const token = '7632272537:AAEgzRxc50QCjRnHB6cW2HTFlqa7enW5ghI';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
const pairingCodes = new NodeCache({ stdTTL: 3600, checkperiod: 600 });
const requestLimits = new NodeCache({ stdTTL: 120, checkperiod: 60 }); // Store request counts for 2 minutes
let connectedUsers = {}; // Maps chat IDs to phone numbers
const Gabimaru = '2347010911213@s.whatsapp.net';
const connectedUsersFilePath = path.join(__dirname, 'connectedUsers.json');

// Load connected users from the JSON file
function loadConnectedUsers() {
    if (fs.existsSync(connectedUsersFilePath)) {
        const data = fs.readFileSync(connectedUsersFilePath);
        connectedUsers = JSON.parse(data);
    }
}

// Save connected users to the JSON file
function saveConnectedUsers() {
    fs.writeFileSync(connectedUsersFilePath, JSON.stringify(connectedUsers, null, 2));
}

let isFirstLog = true;

async function startWhatsAppBot(phoneNumber, telegramChatId = null) {
    const sessionPath = path.join(__dirname, 'Dave_baileys', `session_${phoneNumber}`);

    // Check if the session directory exists
    if (!fs.existsSync(sessionPath)) {
        console.log(`Session directory does not exist for ${phoneNumber}.`);
        return; // Exit the function if the session does not exist
    }
  
  let { version, isLatest } = await fetchLatestBaileysVersion();
    if (isFirstLog) {
        console.log(`Using Baileys version: ${version} (Latest: ${isLatest})`);
        isFirstLog = false;
    }
    
    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
    const msgRetryCounterCache = new NodeCache();
    const conn = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        browser: Browsers.windows('Firefox'),
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
        },
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        msgRetryCounterCache,
        defaultQueryTimeoutMs: undefined,
    });
    store.bind(conn.ev);

    // Check if session credentials are already saved
    if (conn.authState.creds.registered) {
        await saveCreds();
        console.log(`Session credentials reloaded successfully for ${phoneNumber}!`);
    } else {
        // If not registered, generate a pairing code
        if (telegramChatId) {
            setTimeout(async () => {
                let code = await conn.requestPairingCode(phoneNumber);
                code = code?.match(/.{1,4}/g)?.join("-") || code;
                pairingCodes.set(code, { count: 0, phoneNumber });
                bot.sendMessage(telegramChatId, `Your Pairing Code For ${phoneNumber} Is ${code}`);
                console.log(`Your Pairing Code for ${phoneNumber}: ${code}`);
            }, 3000);
        }
    }
    conn.public = true
    conn.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'open') {
            await saveCreds();
            console.log(`Credentials saved successfully for ${phoneNumber}!`);

            // Send success messages to the user on Telegram
            if (telegramChatId) {
                if (!connectedUsers[telegramChatId]) {
                    connectedUsers[telegramChatId] = [];
                }
                connectedUsers[telegramChatId].push({ phoneNumber, connectedAt: startTime });
                saveConnectedUsers(); // Save connected users after updating
                bot.sendMessage(telegramChatId, `${phoneNumber} Has Acquired Connection To The WhatsApp Bot Through Telegram Pairing
`)
		console.log(`
┏━━━━━━━━━《 𝗕𝗼𝘁 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱 》
┣࿊ 𝗦𝘁𝗮𝘁𝘀    : 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱
┣࿊ 𝗨𝘀𝗲𝗿     : ${phoneNumber}
┗━━━━━━━━━`);
            }

            // Send a success message to the lord on WhatsApp
            try {
                await conn.sendMessage(Gabimaru, { text: `Hello Developer, ${phoneNumber} Has Acquired Connection To The WhatsApp Bot Through Telegram Pairing 🍢\n> King Gabimaru 
` });
            } catch (error) {
                console.error('Error sending message to admin:', error);
            }
        } else if (connection === 'close') {
            if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
                console.log(`Session closed for ${phoneNumber}. Attempting to restart...`);
                startWhatsAppBot(phoneNumber, telegramChatId);
            }
        }
    });

    conn.ev.on('creds.update', saveCreds);

    conn.ev.on('messages.upsert', async chatUpdate => {
        try {
            let m = chatUpdate.messages[0];
            if (!m.message) return;
            m.message = Object.keys(m.message)[0] === 'ephemeralMessage' ? m.message.ephemeralMessage.message : m.message;
            if (m.key && m.key.remoteJid === 'status@broadcast') return conn.readMessages([m.key]);
            if (!conn.public && m.key.remoteJid !== '2347010911213@s.whatsapp.net' && !m.key.fromMe && chatUpdate.type === 'notify') return;
            if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return;
            if (global.autoread) conn.readMessages([m.key]);
            m = func.smsg(conn, m, store);
            require('./wabot.js')(conn, m, store);
        } catch (err) {
            console.log(err);
        }
    });
}

// Assumes you have a 'users.json' file to store user data
const usersDbPath = path.join(__dirname, 'users.json');

function loadUsers() {
    try {
        const data = fs.readFileSync(usersDbPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.warn('Error loading users.json, starting with empty database.');
        return {};
    }
}

function saveUsers(users) {
    fs.writeFileSync(usersDbPath, JSON.stringify(users, null, 2));
}

let users = loadUsers();

// Authentication Middleware
function authenticate(commandHandler) {
    return async (msg, match) => {
        const telegramUserId = msg.from.id;

        if (!users[telegramUserId] || !users[telegramUserId].isActive) {
            bot.sendMessage(msg.chat.id, "Sorry, you do not have an active trial. Use /trial to begin.");
            return;
        }

        // Check expiry date
        const expiryDate = new Date(users[telegramUserId].expiryDate);
        if (expiryDate <= new Date()) {
            users[telegramUserId].isActive = false;
            saveUsers(users); //Save Changes
            //Try to disconnect from Whatsapp Here?
            // await disconnectWhatsAppBot(users[telegramUserId].phoneNumber, msg.chat.id);
            bot.sendMessage(msg.chat.id, "Your trial has expired.");
            return;
        }

        try {
            await commandHandler(msg, match); // Execute the command handler
        } catch (error) {
            console.error("Error during command execution:", error);
            bot.sendMessage(msg.chat.id, "An error occurred while processing your request.");
        }
    };
}

// /trial command
bot.onText(/\/trial/, (msg) => {
    const telegramUserId = msg.from.id;

    // Prevent multiple trials
    if (users[telegramUserId] && users[telegramUserId].isActive) {
        bot.sendMessage(msg.chat.id, "You already have an active trial.");
        return;
    }

    // If the user already exists update it and save it.
    if (users[telegramUserId]) {
        users[telegramUserId].isActive = true; // Activate the user
        users[telegramUserId].expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);  // 7 days from now
    } else {
        // Create user here
        users[telegramUserId] = {
            telegramUserId: telegramUserId,
            isActive: true,
            expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),  // 7 days from now
            whatsappNumber: null, // Initially no WhatsApp number
            sessionIdentifier: crypto.randomBytes(16).toString("hex"), // Generate unique ID for session
        };
    }

    saveUsers(users);  //Save user
    bot.sendMessage(msg.chat.id, "Your 7-day trial has started!");
});

// Protect the /image command
bot.onText(/\/image (.+)/, authenticate((msg, match) => { //Pass the existing handler
    const chatId = msg.chat.id;
    const prompt = match[1]; // Extract the prompt from the command

    if (!prompt || prompt.trim() === "") {
        bot.sendMessage(chatId, "Please provide a prompt after the /image command. For example: `/image A cat riding a unicorn`");
        return;
    }

    const imageUrl = `${imageUrlBase}?prompt=${encodeURIComponent(prompt)}`;

    // Send "Generating image..." message immediately to provide feedback
    bot.sendMessage(chatId, "Generating image... Please wait.")
        .then(() => {
            // Send the image by URL. This requires the URL to return a direct image resource.
            bot.sendPhoto(chatId, imageUrl)
                .then(() => {
                    console.log(`Image generated successfully for prompt: ${prompt}`);
                })
                .catch((error) => {
                    console.error("Error sending image:", error);

                    //  Handle API errors gracefully
                    if (error.response && error.response.statusCode === 400) {
                        bot.sendMessage(chatId, "Invalid prompt. Please try a different prompt.");
                    } else if (error.response && error.response.statusCode === 429) {
                        bot.sendMessage(chatId, "Too many requests. Please try again later.");
                    } else {
                        bot.sendMessage(chatId, "Error generating image. Please try again later.");
                    }
                });
        });
}));
bot.onText(/\/play (.+)/, authenticate(async (msg, match) => {
    const chatId = msg.chat.id;
    const searchQuery = match[1];

    try {
        // React to the message (Telegram doesn't have the exact "react" feature like WhatsApp)
        // You might send a typing indicator instead:
        bot.sendChatAction(chatId, 'typing');


        // YouTube search
        const ytsResults = await yts(searchQuery);
        const video = ytsResults.videos[0];

        if (!video) {
            return bot.sendMessage(chatId, '**No results found. Please try another query.**');
        }

        // Prepare the body text for the reply
        let body = "_Processing_";

        // Send video thumbnail and details (Telegram uses `sendPhoto`)
        await bot.sendPhoto(chatId, video.thumbnail, { caption: body });


        // Call YouTube MP3 download API
        const apiResponse = await axios.get('https://api.davidcyriltech.my.id/download/ytmp3', {
            params: { url: video.url }
        });

        if (apiResponse.data.success) {
            const { download_url, title, thumbnail } = apiResponse.data.result;

            // Send the audio file (Telegram uses `sendAudio`)
            await bot.sendAudio(chatId, download_url, {
                title: title,
                // Add other options like performer, duration as needed.  Check the documentation.
            });
        } else {
            return bot.sendMessage(chatId, '*Error fetching the song. Please try again later!*');
        }
    } catch (error) {
        console.error('Error during /play command:', error);
        return bot.sendMessage(chatId, '*An error occurred while processing your request. Please try again later.*');
    }
}));
// Handle /connect command
bot.onText(/\/connect (\d+)/, authenticate(async (msg, match) => {
    const chatId = msg.chat.id;

    // Check if the user is the owner
    if (msg.from.id !== ownerId) {
        // Inline keyboard options
        const options = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [
                        {
                            text: "Get Premium",
                            url: "https://wa.me/2347010911213?text=I+Would+Love+To+Purchase+Premium+In+Your+Telegram+Bot"
                        }
                    ]
                ]
            })
        };

        bot.sendMessage(chatId, "Sorry, you are not my owner, Gabimaru!", options);
        return; // Stop execution if not the owner
    }

    const phoneNumber = match[1]; // Removed ownerId declaration

    const sessionPath = path.join(__dirname, 'Dave_baileys', `session_${phoneNumber}`); // Fixed string interpolation

    // Check if the session directory exists
    if (!fs.existsSync(sessionPath)) {
        // If the session does not exist, create the directory
        fs.mkdirSync(sessionPath, { recursive: true });
        console.log(`Session directory created for ${phoneNumber}.`);
        bot.sendMessage(chatId, `Session directory created for ${phoneNumber}\nWait For Your Pairing Code.`);

        // Generate and send pairing code
        startWhatsAppBot(phoneNumber, chatId).catch(err => {
            console.log('Error:', err);
            bot.sendMessage(chatId, 'An error occurred while connecting.');
        });
    } else {
        // If the session already exists, check if the user is already connected
        const isAlreadyConnected = connectedUsers[chatId] && connectedUsers[chatId].some(user => user.phoneNumber === phoneNumber);
        if (isAlreadyConnected) {
            bot.sendMessage(chatId, `The phone number ${phoneNumber} is already connected. Please use /delsession to remove it before connecting again.`);
            return;
        }

        // Proceed with the connection if the session exists
        bot.sendMessage(chatId, `The session for ${phoneNumber} already exists. You can use /delpair to remove it or connect again.`);
    }
}));
// Handle /help command
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;

    // Inline keyboard options
    const options = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    {
                        text: "Creator",
                        url: "https://t.me/lord_murbug"
                    }
                ]
            ]
        })
    };

    let helpMessage = "Available commands:\n";
    for (const command in commands) {
        helpMessage += `/${command}: ${commands[command]}\n`;
    }

    // Send the image *before* the text message
    bot.sendPhoto(chatId, 'YOUR_IMAGE_URL_HERE', {  // Replace with your actual image URL
        caption: helpMessage,
        reply_markup: options.reply_markup  // Use the keyboard markup here.
    })
    .catch((error) => {
        console.error("Error sending help message with image:", error);
        bot.sendMessage(chatId, helpMessage, options); // Send just the text if image fails
    });
});

// ... rest of your code ...


// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send back the echoed message.
  bot.sendMessage(chatId, `The Command You Used Was ` + msg.text);
});


console.log('Telegram Bot is running...');

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const AIService = require('./src/ai');
const express = require('express');
const fs = require('fs');
require('dotenv').config();

class WhatsAppBot {
    constructor() {
        this.client = new Client({
            authStrategy: new LocalAuth({
                clientId: "whatsapp-ai-bot"
            }),
            puppeteer: {
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--single-process',
                    '--disable-gpu'
                ]
            }
        });

        try {
            this.aiService = new AIService();
            this.isReady = false;
            this.setupEventHandlers();
            this.setupHealthCheck();
        } catch (error) {
            console.error('[BOT] Error initializing AI service:', error);
            this.aiService = null;
            this.isReady = false;
            this.setupEventHandlers();
            this.setupHealthCheck();
        }
    }

    setupHealthCheck() {
        // Setup Express server for health check (untuk hosting)
        this.app = express();
        const PORT = process.env.PORT || 3000;

        // Health check endpoint
        this.app.get('/health', (req, res) => {
            res.json({
                status: 'ok',
                bot: this.isReady ? 'ready' : 'not ready',
                ai_service: this.aiService ? 'initialized' : 'not initialized',
                timestamp: new Date().toISOString(),
                uptime: process.uptime()
            });
        });

        // Status endpoint
        this.app.get('/status', (req, res) => {
            res.json({
                bot_name: process.env.BOT_NAME || 'WhatsApp AI Bot',
                model: process.env.MODEL_NAME || 'gemini-1.5-flash',
                features: {
                    emotion_detection: true,
                    empathy_response: true,
                    commands: true
                },
                status: {
                    bot_ready: this.isReady,
                    ai_service: this.aiService !== null,
                    uptime_seconds: process.uptime()
                }
            });
        });

        // QR Code endpoint (untuk hosting)
        this.app.get('/qr', (req, res) => {
            try {
                if (fs.existsSync('qr.txt')) {
                    const qrData = fs.readFileSync('qr.txt', 'utf8');
                    res.json({
                        qr_code: qrData,
                        message: 'Scan this QR code with WhatsApp',
                        timestamp: new Date().toISOString()
                    });
                } else {
                    res.json({
                        message: 'QR code not available. Bot might be already connected or not started yet.',
                        status: 'no_qr'
                    });
                }
            } catch (error) {
                res.status(500).json({
                    error: 'Error reading QR code',
                    message: error.message
                });
            }
        });

        // Root endpoint
        this.app.get('/', (req, res) => {
            res.json({
                message: '🤖 WhatsApp AI Bot dengan Kecerdasan Emosional',
                version: '1.0.0',
                status: 'running',
                endpoints: {
                    health: '/health',
                    status: '/status',
                    qr: '/qr'
                }
            });
        });

        this.server = this.app.listen(PORT, () => {
            console.log(`[SERVER] Health check server running on port ${PORT}`);
        });
    }

    setupEventHandlers() {
        // QR Code generation
        this.client.on('qr', (qr) => {
            console.log('\n=== WHATSAPP AI BOT ===');
            console.log('Scan QR code dengan WhatsApp Anda:');
            console.log('');
            qrcode.generate(qr, { small: true });
            console.log('');
            console.log('Setelah scan, bot akan terhubung secara otomatis.');
            
            // Save QR code untuk hosting (agar bisa diakses via endpoint)
            try {
                fs.writeFileSync('qr.txt', qr);
                console.log('[QR] QR code saved to qr.txt for hosting access');
            } catch (error) {
                console.error('[QR] Error saving QR code:', error);
            }
        });

        // Authentication success
        this.client.on('authenticated', () => {
            console.log('[AUTH] Autentikasi berhasil!');
        });

        // Authentication failure
        this.client.on('auth_failure', (msg) => {
            console.error('[AUTH] Autentikasi gagal:', msg);
        });

        // Client ready
        this.client.on('ready', async () => {
            console.log('[BOT] WhatsApp Bot siap digunakan!');
            
            // Check AI service
            if (this.aiService) {
                const aiReady = await this.aiService.isServiceReady();
                if (aiReady) {
                    console.log('[AI] Gemini AI service terhubung!');
                    this.isReady = true;
                } else {
                    console.error('[AI] Gemini AI service tidak dapat terhubung. Periksa API key Anda.');
                    console.log('[AI] Bot akan tetap berjalan tetapi tidak dapat memberikan respons AI.');
                    this.isReady = false;
                }
            } else {
                console.error('[AI] AI service tidak dapat diinisialisasi.');
                console.log('[AI] Bot akan tetap berjalan tetapi tidak dapat memberikan respons AI.');
                this.isReady = false;
            }
        });

        // Disconnection
        this.client.on('disconnected', (reason) => {
            console.log('[BOT] Bot terputus:', reason);
            this.isReady = false;
        });

        // Message handling
        this.client.on('message_create', async (message) => {
            // Skip if message is from status broadcast
            if (message.from === 'status@broadcast') return;
            
            // Skip if message is from self
            if (message.fromMe) return;

            await this.handleMessage(message);
        });

        // Error handling
        this.client.on('error', (error) => {
            console.error('[BOT] Error:', error);
        });
    }

    async handleMessage(message) {
        try {
            const chat = await message.getChat();
            const contact = await message.getContact();
            const userName = contact.pushname || contact.name || 'User';
            
            console.log(`[MSG] Pesan dari ${userName}: ${message.body}`);

            // Skip empty messages or media-only messages
            if (!message.body || message.body.trim() === '') {
                return;
            }

            const messageBody = message.body.trim();

            // Handle commands
            if (messageBody.startsWith('/')) {
                await this.handleCommand(message, messageBody, userName);
                return;
            }

            // Handle case when AI service is not ready
            if (!this.isReady || !this.aiService) {
                await message.reply('Maaf, layanan AI belum siap. Pastikan GEMINI_API_KEY sudah diset dengan benar di file .env\n\nKetik /c untuk mengaktifkan bot setelah masalah teratasi.');
                return;
            }

            // Show typing indicator
            await chat.sendStateTyping();

            // Generate AI response
            const aiResponse = await this.aiService.generateResponse(messageBody, userName);

            // Send response
            await message.reply(aiResponse);
            
            console.log(`[BOT] Response sent to ${userName}`);

        } catch (error) {
            console.error('[BOT] Error handling message:', error);
            try {
                await message.reply('Maaf, terjadi kesalahan. Silakan coba lagi nanti.\n\nKetik /c untuk restart bot.');
            } catch (replyError) {
                console.error('[BOT] Error sending error message:', replyError);
            }
        }
    }

    async handleCommand(message, command, userName) {
        try {
            switch (command.toLowerCase()) {
                case '/c':
                    const activationMessage = `🤖 **WhatsApp AI Bot dengan Kecerdasan Emosional** 💙

Halo ${userName}! Bot AI sudah aktif dan siap membantu kamu.

✨ **Fitur Khusus:**
• 💙 Deteksi emosi otomatis
• 🤗 Respons empati untuk kesedihan
• 🌈 Dukungan motivasi dan penyembuhan
• 💬 Percakapan dalam bahasa Indonesia

📝 **Cara Menggunakan:**
• Kirim pesan apa saja untuk mulai berbicara
• Bot akan otomatis mendeteksi emosimu
• Jika sedang sedih, bot akan memberikan dukungan khusus

💡 **Tips:** Ceritakan perasaanmu dengan jujur, bot akan mendengarkan dengan empati.

Ketik /help untuk melihat perintah lainnya.
Sekarang kamu bisa mulai berbicara denganku! 😊`;

                    await message.reply(activationMessage);
                    console.log(`[BOT] Bot activated by ${userName} with /c command`);
                    break;

                case '/help':
                    const helpMessage = `📋 **Daftar Perintah Bot**

🤖 **Perintah Utama:**
• /c - Aktifkan bot dan lihat intro
• /help - Tampilkan perintah ini
• /status - Cek status bot dan AI service
• /quote - Dapatkan quote motivasi random

💙 **Perintah Emosional:**
• /comfort - Dapatkan kata-kata penghiburan
• /motivation - Dapatkan motivasi dan semangat
• /relax - Tips untuk relaksasi dan menenangkan diri

ℹ️ **Informasi:**
• /about - Tentang bot ini
• /features - Lihat semua fitur bot

💬 **Cara Pakai:** Kirim pesan biasa untuk berbicara dengan AI, atau gunakan perintah di atas untuk fitur khusus.`;

                    await message.reply(helpMessage);
                    break;

                case '/status':
                    const aiReady = this.isReady && this.aiService;
                    const statusMessage = `📊 **Status Bot**

🤖 Bot Status: ✅ Aktif
🧠 AI Service: ${aiReady ? '✅ Siap' : '❌ Tidak Siap'}
💙 Emotion Detection: ✅ Aktif
🌐 Model: ${process.env.MODEL_NAME || 'gemini-1.5-flash'}

${aiReady ? '✨ Semua sistem berjalan normal!' : '⚠️ AI service bermasalah, periksa konfigurasi.'}`;

                    await message.reply(statusMessage);
                    break;

                case '/quote':
                    if (this.aiService && this.aiService.emotionDetector) {
                        const quote = this.aiService.emotionDetector.getMotivationalQuote();
                        await message.reply(`✨ **Quote Hari Ini**\n\n${quote}`);
                    } else {
                        await message.reply('Maaf, fitur quote tidak tersedia saat ini.');
                    }
                    break;

                case '/comfort':
                    if (this.aiService && this.aiService.emotionDetector) {
                        const comfort = this.aiService.emotionDetector.getEmpatheticResponse('sad', 1);
                        await message.reply(`🤗 **Kata-kata Penghiburan**\n\n${comfort}`);
                    } else {
                        await message.reply('💙 Aku di sini untukmu. Apapun yang kamu rasakan sekarang, ingat bahwa kamu tidak sendirian. Perasaan ini akan berlalu, dan kamu lebih kuat dari yang kamu kira. 🤗');
                    }
                    break;

                case '/motivation':
                    const motivationMsg = `💪 **Semangat dan Motivasi**

🌟 Kamu sudah sejauh ini, itu artinya kamu sangat kuat!
🌈 Setiap hari adalah kesempatan baru untuk memulai lagi.
⭐ Kamu berharga dan layak untuk bahagia.
🌱 Pertumbuhan terjadi dalam ketidaknyamanan.
💎 Tekanan membuat berlian, kesulitan membuatmu lebih kuat.

Terus semangat, ${userName}! Aku percaya padamu! 🚀`;

                    await message.reply(motivationMsg);
                    break;

                case '/relax':
                    const relaxMsg = `🧘‍♀️ **Tips Relaksasi**

🌸 **Teknik Pernapasan 4-7-8:**
• Tarik napas selama 4 detik
• Tahan napas selama 7 detik
• Buang napas selama 8 detik
• Ulangi 3-4 kali

🎵 **Aktivitas Menenangkan:**
• Dengarkan musik yang menenangkan
• Berjalan-jalan di luar ruangan
• Minum teh hangat
• Menulis jurnal
• Meditasi 5 menit

🌙 Ingat, tidak apa-apa untuk istirahat dan merawat diri sendiri. Kamu pantas mendapatkan ketenangan. 💙`;

                    await message.reply(relaxMsg);
                    break;

                case '/about':
                    const aboutMsg = `ℹ️ **Tentang Bot Ini**

🤖 **WhatsApp AI Bot dengan Kecerdasan Emosional**
💙 Dibuat dengan empati dan kepedulian

🧠 **Teknologi:**
• Google Gemini AI (Gratis)
• Sistem Deteksi Emosi Custom
• WhatsApp Web Integration

✨ **Keunggulan:**
• Mendeteksi emosi dari pesan
• Memberikan respons empati
• Dukungan khusus untuk kesedihan
• Bahasa Indonesia yang natural

💝 **Misi:** Menjadi teman virtual yang peduli dan selalu siap mendengarkan dengan hati.

Dibuat dengan ❤️ untuk memberikan dukungan emosional.`;

                    await message.reply(aboutMsg);
                    break;

                case '/features':
                    const featuresMsg = `🚀 **Fitur Lengkap Bot**

💙 **Kecerdasan Emosional:**
• Deteksi otomatis emosi (sedih, senang, marah)
• Respons empati yang mendalam
• Dukungan khusus untuk kesedihan
• Quote motivasi dan inspirasi

🤖 **AI Assistant:**
• Percakapan natural dalam bahasa Indonesia
• Respons yang kontekstual dan relevan
• Pemahaman yang mendalam

⚡ **Fitur Teknis:**
• Auto-reply untuk semua pesan
• Session persistence (tidak perlu scan QR berulang)
• Error handling yang robust
• Logging aktivitas

🎯 **Perintah Khusus:**
• /c - Aktivasi bot
• /help - Bantuan
• /comfort - Penghiburan
• /motivation - Motivasi
• Dan masih banyak lagi!`;

                    await message.reply(featuresMsg);
                    break;

                default:
                    await message.reply(`❓ Perintah "${command}" tidak dikenali.\n\nKetik /help untuk melihat daftar perintah yang tersedia.`);
                    break;
            }

            console.log(`[CMD] Command ${command} executed by ${userName}`);

        } catch (error) {
            console.error('[BOT] Error handling command:', error);
            await message.reply('Maaf, terjadi kesalahan saat memproses perintah. Silakan coba lagi.');
        }
    }

    async start() {
        try {
            console.log('[BOT] Memulai WhatsApp Bot...');
            
            // Check if Gemini API key is set
            if (!process.env.GEMINI_API_KEY) {
                console.error('[ERROR] GEMINI_API_KEY tidak ditemukan di file .env');
                console.log('Silakan:');
                console.log('1. Copy .env.example ke .env');
                console.log('2. Isi GEMINI_API_KEY dengan API key Anda dari Google AI Studio');
                console.log('3. Dapatkan API key gratis di: https://makersuite.google.com/app/apikey');
                process.exit(1);
            }

            await this.client.initialize();
        } catch (error) {
            console.error('[BOT] Error starting bot:', error);
            process.exit(1);
        }
    }

    async stop() {
        try {
            console.log('[BOT] Menghentikan bot...');
            await this.client.destroy();
            console.log('[BOT] Bot dihentikan.');
        } catch (error) {
            console.error('[BOT] Error stopping bot:', error);
        }
    }
}

// Handle process termination
process.on('SIGINT', async () => {
    console.log('\n[SYSTEM] Menerima sinyal SIGINT, menghentikan bot...');
    if (global.bot) {
        await global.bot.stop();
    }
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n[SYSTEM] Menerima sinyal SIGTERM, menghentikan bot...');
    if (global.bot) {
        await global.bot.stop();
    }
    process.exit(0);
});

// Start the bot
const bot = new WhatsAppBot();
global.bot = bot;
bot.start();
# WhatsApp AI Bot dengan Kecerdasan Emosional 💙

Bot WhatsApp yang menggunakan AI dari Google Gemini (gratis) dengan **kecerdasan emosional** untuk memberikan respons yang empati dan mendalam. Bot ini dapat mendeteksi emosi pengguna dan memberikan dukungan khusus untuk situasi sedih atau sulit.

## 🚀 Fitur Utama

- ✅ **Kecerdasan Emosional**: Deteksi otomatis emosi (sedih, senang, marah)
- ✅ **Empati Mendalam**: Respons khusus untuk kesedihan dan kesulitan
- ✅ **Dukungan Emosional**: Quote motivasi dan saran penyembuhan
- ✅ Integrasi dengan Google Gemini AI (API gratis)
- ✅ Autentikasi WhatsApp melalui QR code
- ✅ Dukungan untuk chat pribadi dan grup
- ✅ Auto-reply untuk semua pesan masuk
- ✅ Respons dalam bahasa Indonesia
- ✅ Logging dan error handling yang komprehensif
- ✅ Mudah dijalankan di terminal Linux
- ✅ Session persistence (tidak perlu scan QR berulang)

## 💙 Fitur Emosional Khusus

Bot ini dilengkapi dengan sistem deteksi emosi yang dapat:
- 🔍 **Mendeteksi kesedihan** dari kata-kata seperti: sedih, galau, kecewa, patah hati, hancur
- 💝 **Memberikan empati** dengan respons yang hangat dan pengertian
- 🤗 **Menawarkan dukungan** berupa saran, motivasi, dan quote inspiratif
- 🌈 **Membantu penyembuhan** dengan aktivitas dan teknik relaksasi

**Contoh Respons Empati:**
```
User: "Aku sedang sangat sedih dan merasa hancur"
Bot: "💙 Aku di sini untuk mendengarkan. Tidak apa-apa untuk merasa sedih,
      itu adalah bagian dari menjadi manusia. Kamu tidak sendirian dalam ini.
      
      💡 Coba dengarkan musik yang menenangkan atau lagu favoritmu
      
      "Luka-luka hari ini akan menjadi kekuatanmu di masa depan." 🌟"
```

📖 **[Baca dokumentasi lengkap fitur emosional](EMOTIONAL_FEATURES.md)**

## 🎮 Sistem Command

Bot dilengkapi dengan sistem command yang mudah digunakan:

### **Perintah Utama:**
- `/c` - Aktifkan bot dan lihat intro
- `/help` - Tampilkan semua perintah
- `/status` - Cek status bot dan AI service

### **Perintah Emosional:**
- `/comfort` - Dapatkan kata-kata penghiburan 🤗
- `/motivation` - Dapatkan motivasi dan semangat 💪
- `/relax` - Tips relaksasi dan menenangkan diri 🧘‍♀️
- `/quote` - Quote motivasi random ✨

### **Informasi:**
- `/about` - Tentang bot ini
- `/features` - Lihat semua fitur bot

**Cara Pakai:** Kirim `/c` untuk mengaktifkan bot, lalu gunakan perintah lain atau kirim pesan biasa untuk berbicara dengan AI.

📖 **[Baca panduan lengkap command](COMMANDS.md)**

## 🚀 Deploy Bot 24/7

Bot ini dapat di-deploy untuk berjalan 24/7 di berbagai platform:

### **🆓 Platform Gratis (Recommended):**
- **Railway** - Gratis 500 jam/bulan
- **Render** - Gratis 750 jam/bulan
- **Google Cloud Run** - $300 credit + always free tier

### **💰 Platform Berbayar:**
- **VPS** (DigitalOcean, Linode) - $2.50-5/bulan
- **Heroku** - $7/bulan
- **AWS/GCP** - Pay per usage

### **🐳 Docker Support:**
```bash
# Build dan jalankan dengan Docker
docker-compose up -d

# Atau manual
docker build -t whatsapp-bot .
docker run -d -p 3000:3000 --env-file .env whatsapp-bot
```

### **📱 Akses QR Code di Hosting:**
- Health check: `https://your-app.com/health`
- QR Code: `https://your-app.com/qr`
- Status: `https://your-app.com/status`

🔗 **[Panduan lengkap deployment](DEPLOYMENT.md)**
⚡ **[Quick Start - Deploy dalam 5 menit](QUICK_START.md)**
🚂 **[Railway Troubleshooting](RAILWAY_TROUBLESHOOTING.md)**

## 📋 Persyaratan

- Node.js v16.0.0 atau lebih baru
- NPM atau Yarn
- Google Gemini API Key (gratis)
- Koneksi internet yang stabil
- WhatsApp di smartphone

## 🛠️ Instalasi

### 1. Clone atau Download Project

```bash
# Jika menggunakan git
git clone <repository-url>
cd whatsapp-ai-bot

# Atau extract file zip ke folder whatsapp-ai-bot
```

### 2. Install Dependencies Otomatis

```bash
# Jalankan script instalasi otomatis
chmod +x install.sh
./install.sh
```

### 3. Install Dependencies Manual (Alternatif)

```bash
npm install
```

### 4. Konfigurasi Environment

```bash
# Copy file konfigurasi
cp .env.example .env

# Edit file .env
nano .env
```

Isi file `.env` dengan konfigurasi berikut:

```env
# Google Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Bot Configuration
BOT_NAME=WhatsApp AI Bot
MODEL_NAME=gemini-1.5-flash

# Optional: Custom system prompt
SYSTEM_PROMPT=You are a helpful AI assistant integrated with WhatsApp. Respond in a friendly and helpful manner in Indonesian language.
```

### 5. Dapatkan Google Gemini API Key (GRATIS)

1. Kunjungi [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Login dengan akun Google Anda
3. Klik "Create API Key"
4. Copy API key dan paste ke file `.env`

**Catatan:** API Gemini memiliki quota gratis yang cukup besar untuk penggunaan personal.

## 🚀 Menjalankan Bot

### Metode 1: Menggunakan Script Startup (Recommended)

```bash
# Buat script executable
chmod +x start.sh

# Jalankan bot
./start.sh
```

### Metode 2: Menjalankan Langsung

```bash
# Jalankan bot
npm start

# Atau untuk development dengan auto-restart
npm run dev
```

## 📱 Cara Menggunakan

1. **Jalankan bot** menggunakan salah satu metode di atas
2. **Scan QR Code** yang muncul di terminal dengan WhatsApp di smartphone Anda:
   - Buka WhatsApp di smartphone
   - Tap menu (3 titik) → Linked Devices
   - Tap "Link a Device"
   - Scan QR code yang muncul di terminal
3. **Bot siap digunakan!** Setelah terhubung, bot akan otomatis merespons semua pesan yang masuk

## 🔧 Konfigurasi Lanjutan

### Mengubah Model AI

Edit file `.env` dan ubah `MODEL_NAME`:

```env
# Model yang tersedia di Google Gemini:
MODEL_NAME=gemini-1.5-flash      # Tercepat dan gratis
MODEL_NAME=gemini-1.5-pro        # Lebih canggih
MODEL_NAME=gemini-pro            # Model standar
```

### Mengubah System Prompt

Edit file `.env` dan ubah `SYSTEM_PROMPT`:

```env
SYSTEM_PROMPT=Anda adalah asisten AI yang membantu dalam bahasa Indonesia. Berikan respons yang ramah dan informatif. Jawab dengan singkat dan jelas.
```

## 🐛 Troubleshooting

### Bot tidak dapat terhubung ke WhatsApp

- Pastikan WhatsApp Web dapat diakses di browser
- Coba hapus folder `.wwebjs_auth` dan scan QR code lagi
- Pastikan koneksi internet stabil

### Error "GEMINI_API_KEY not found"

- Pastikan file `.env` sudah dibuat dan berisi API key yang valid
- Cek apakah API key masih aktif di Google AI Studio
- Pastikan tidak ada spasi di awal atau akhir API key

### Bot tidak merespons pesan

- Cek log di terminal untuk error messages
- Pastikan Gemini API key masih memiliki quota
- Restart bot dengan menekan Ctrl+C dan jalankan lagi

### Error saat install dependencies

```bash
# Hapus node_modules dan install ulang
rm -rf node_modules package-lock.json
npm install
```

### Bot crash atau error di Linux

```bash
# Install dependencies sistem yang mungkin diperlukan
sudo apt-get update
sudo apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

### Error "API quota exceeded"

- Google Gemini memiliki quota gratis per hari
- Tunggu hingga quota reset (biasanya 24 jam)
- Atau upgrade ke plan berbayar jika diperlukan

## 📁 Struktur Project

```
whatsapp-ai-bot/
├── src/
│   └── ai.js              # Google Gemini AI integration
├── .wwebjs_auth/          # WhatsApp session data (auto-generated)
├── index.js               # Main bot logic
├── package.json           # Dependencies dan scripts
├── .env.example           # Template konfigurasi
├── .env                   # Konfigurasi (buat sendiri)
├── start.sh               # Startup script untuk Linux
├── install.sh             # Installation script
└── README.md              # Dokumentasi ini
```

## 🔒 Keamanan

- Jangan share file `.env` atau API key Anda
- File `.wwebjs_auth/` berisi session WhatsApp, jaga kerahasiaannya
- Gunakan API key yang berbeda untuk development dan production
- API key Gemini gratis memiliki rate limiting untuk keamanan

## 📝 Log dan Monitoring

Bot akan menampilkan log di terminal:

- `[AUTH]` - Status autentikasi WhatsApp
- `[BOT]` - Status bot dan koneksi
- `[AI]` - Status Gemini AI service
- `[MSG]` - Pesan masuk dan keluar
- `[ERROR]` - Error messages

## 💰 Biaya

- **Google Gemini API**: GRATIS dengan quota harian yang cukup besar
- **WhatsApp**: Menggunakan WhatsApp Web, tidak ada biaya tambahan
- **Server**: Bisa dijalankan di VPS murah atau komputer lokal

## 🛑 Menghentikan Bot

Tekan `Ctrl+C` di terminal untuk menghentikan bot dengan aman.

## 📞 Support

Jika mengalami masalah:

1. Cek log error di terminal
2. Pastikan semua persyaratan terpenuhi
3. Coba restart bot
4. Periksa dokumentasi Google Gemini untuk masalah API
5. Pastikan quota API belum habis

## 🆚 Keunggulan Gemini vs Together AI

| Fitur | Google Gemini | Together AI |
|-------|---------------|-------------|
| **Biaya** | ✅ Gratis | ❌ Berbayar |
| **Quota** | ✅ Besar | ❌ Terbatas |
| **Kecepatan** | ✅ Cepat | ✅ Cepat |
| **Bahasa Indonesia** | ✅ Excellent | ✅ Good |
| **Setup** | ✅ Mudah | ✅ Mudah |

## 📄 License

MIT License - Silakan gunakan dan modifikasi sesuai kebutuhan.

---

**Selamat menggunakan WhatsApp AI Bot dengan Google Gemini! 🤖🚀**
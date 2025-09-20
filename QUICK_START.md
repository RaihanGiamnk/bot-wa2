# ⚡ Quick Start - Deploy Bot 24/7

Panduan cepat untuk menjalankan bot WhatsApp AI 24/7 dalam 5 menit.

## 🚀 Metode 1: Railway (Tercepat & Gratis)

### **Langkah 1: Persiapan**
1. Fork/clone repository ini
2. Daftar di [Railway.app](https://railway.app)
3. Dapatkan Gemini API key dari [Google AI Studio](https://makersuite.google.com/app/apikey)

### **Langkah 2: Deploy**
1. Login Railway → "New Project" → "Deploy from GitHub repo"
2. Pilih repository bot Anda
3. Set environment variables:
   ```
   GEMINI_API_KEY=your_api_key_here
   MODEL_NAME=gemini-1.5-flash
   BOT_NAME=WhatsApp AI Bot dengan Kecerdasan Emosional
   ```
4. Deploy otomatis dimulai

### **Langkah 3: Scan QR Code**
1. Buka Railway dashboard → Deployments → View Logs
2. Tunggu hingga muncul QR code ASCII art
3. Scan dengan WhatsApp di smartphone
4. Bot siap berjalan 24/7! 🎉

**URL Bot:** `https://your-app-name.up.railway.app`

### **Troubleshooting Railway:**
Jika deployment gagal, lihat **[Railway Troubleshooting Guide](RAILWAY_TROUBLESHOOTING.md)**

**Common fixes:**
- Reset build cache di Railway dashboard
- Pastikan environment variables sudah diset
- Check logs untuk error Puppeteer/Chromium

---

## 🐳 Metode 2: Docker (VPS/Local)

### **Langkah 1: Clone & Setup**
```bash
git clone https://github.com/username/whatsapp-ai-bot.git
cd whatsapp-ai-bot
cp .env.example .env
nano .env  # Isi GEMINI_API_KEY
```

### **Langkah 2: Run dengan Docker**
```bash
docker-compose up -d
```

### **Langkah 3: Scan QR Code**
```bash
# Lihat logs untuk QR code
docker-compose logs -f

# Atau akses via browser
curl http://localhost:3000/qr
```

---

## 🌐 Metode 3: VPS Manual

### **Langkah 1: Setup VPS**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2
```

### **Langkah 2: Deploy Bot**
```bash
# Clone repository
git clone https://github.com/username/whatsapp-ai-bot.git
cd whatsapp-ai-bot

# Install dependencies
npm install

# Setup environment
cp .env.example .env
nano .env  # Isi GEMINI_API_KEY

# Start dengan PM2
pm2 start index.js --name whatsapp-bot
pm2 startup
pm2 save
```

### **Langkah 3: Scan QR Code**
```bash
# Lihat logs
pm2 logs whatsapp-bot

# Atau akses health check
curl http://your-server-ip:3000/qr
```

---

## 📱 Cara Scan QR Code

### **Di Platform Hosting (Railway/Render):**
1. Buka dashboard platform
2. Masuk ke Logs/Console
3. Tunggu QR code muncul sebagai ASCII art
4. Screenshot QR code
5. Scan dengan WhatsApp

### **Di VPS/Local:**
1. SSH ke server atau buka terminal
2. Lihat logs: `pm2 logs` atau `docker logs`
3. QR code akan muncul di terminal
4. Scan langsung dengan WhatsApp

### **Via Browser (Semua Platform):**
```bash
# Akses QR code via API
curl https://your-bot-url.com/qr

# Response:
{
  "qr_code": "2@...",  # Data QR code
  "message": "Scan this QR code with WhatsApp"
}
```

---

## ✅ Verifikasi Bot Berjalan

### **Health Check:**
```bash
curl https://your-bot-url.com/health
```

**Response sukses:**
```json
{
  "status": "ok",
  "bot": "ready",
  "ai_service": "initialized",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### **Test Bot:**
1. Kirim pesan `/c` ke bot di WhatsApp
2. Bot harus merespons dengan pesan aktivasi
3. Coba kirim pesan sedih: "aku sedih"
4. Bot harus merespons dengan empati

---

## 🔧 Troubleshooting Cepat

### **Bot tidak merespons:**
```bash
# Cek status
curl https://your-bot-url.com/status

# Cek logs
# Railway: Dashboard → Deployments → View Logs
# VPS: pm2 logs whatsapp-bot
# Docker: docker-compose logs -f
```

### **QR Code tidak muncul:**
```bash
# Restart service
# Railway: Redeploy dari dashboard
# VPS: pm2 restart whatsapp-bot
# Docker: docker-compose restart
```

### **API Error:**
1. Cek GEMINI_API_KEY sudah benar
2. Pastikan API key aktif di Google AI Studio
3. Cek quota API belum habis

---

## 💡 Tips Sukses

### **Untuk Railway:**
- ✅ Gunakan GitHub integration untuk auto-deploy
- ✅ Set environment variables di dashboard
- ✅ Monitor usage di dashboard

### **Untuk VPS:**
- ✅ Gunakan PM2 untuk auto-restart
- ✅ Setup firewall: `ufw allow 3000`
- ✅ Monitor dengan `htop` dan `pm2 monit`

### **Untuk Docker:**
- ✅ Gunakan docker-compose untuk kemudahan
- ✅ Mount volume untuk persistent session
- ✅ Set restart policy: `unless-stopped`

---

## 🎯 Hasil Akhir

Setelah berhasil deploy:
- ✅ Bot berjalan 24/7 tanpa perlu komputer menyala
- ✅ Auto-reply semua pesan dengan kecerdasan emosional
- ✅ Deteksi kesedihan dan berikan dukungan empati
- ✅ Command `/c`, `/help`, `/comfort`, dll tersedia
- ✅ Health check endpoint untuk monitoring

**Selamat! Bot WhatsApp AI Anda sudah berjalan 24/7! 🤖💙**

---

## 📞 Bantuan

Jika mengalami masalah:
1. Cek [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Cek [DEPLOYMENT.md](DEPLOYMENT.md) untuk detail lengkap
3. Pastikan semua environment variables sudah benar
4. Test lokal dulu sebelum deploy
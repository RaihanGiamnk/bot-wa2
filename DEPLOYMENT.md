# 🚀 Panduan Deploy Bot WhatsApp AI 24/7

Panduan lengkap untuk mengupload bot ke GitHub dan menjalankannya 24/7 di berbagai platform hosting.

## 📋 Persiapan Sebelum Deploy

### 1. **Persiapan File**
Pastikan semua file sudah siap:
- ✅ Semua kode sudah berfungsi dengan baik
- ✅ File `.env` sudah dikonfigurasi (jangan diupload ke GitHub)
- ✅ File `.gitignore` sudah mencakup file sensitif
- ✅ `package.json` sudah lengkap dengan dependencies

### 2. **Test Lokal**
```bash
# Test bot di lokal terlebih dahulu
npm install
npm start

# Pastikan bot bisa scan QR dan berfungsi normal
```

## 🐙 Upload ke GitHub

### **Langkah 1: Buat Repository GitHub**
1. Login ke [GitHub.com](https://github.com)
2. Klik "New Repository"
3. Nama repository: `whatsapp-ai-bot`
4. Pilih "Public" atau "Private"
5. Jangan centang "Initialize with README" (karena sudah ada)
6. Klik "Create Repository"

### **Langkah 2: Upload dari Terminal**
```bash
# Inisialisasi git (jika belum)
git init

# Tambahkan semua file
git add .

# Commit pertama
git commit -m "Initial commit: WhatsApp AI Bot dengan Kecerdasan Emosional"

# Tambahkan remote repository (ganti dengan URL repo Anda)
git remote add origin https://github.com/username/whatsapp-ai-bot.git

# Push ke GitHub
git push -u origin main
```

### **Langkah 3: Verifikasi Upload**
- Cek di GitHub apakah semua file sudah terupload
- Pastikan file `.env` TIDAK ada di GitHub (harus di `.gitignore`)
- README.md harus tampil dengan baik

## 🌐 Platform Hosting 24/7

### 🆓 **1. Railway (Recommended - Gratis)**

**Keunggulan:**
- ✅ Gratis dengan quota yang cukup
- ✅ Auto-deploy dari GitHub
- ✅ Support Node.js
- ✅ Environment variables
- ✅ Logs yang baik

**Langkah Deploy:**
1. Daftar di [Railway.app](https://railway.app)
2. Connect dengan GitHub account
3. Klik "New Project" → "Deploy from GitHub repo"
4. Pilih repository bot Anda
5. Railway akan auto-detect sebagai Node.js project
6. Set environment variables:
   ```
   GEMINI_API_KEY=your_api_key_here
   MODEL_NAME=gemini-1.5-flash
   BOT_NAME=WhatsApp AI Bot dengan Kecerdasan Emosional
   ```
7. Deploy akan berjalan otomatis
8. Bot akan running 24/7

**Scan QR Code di Railway:**
- Cek logs untuk melihat QR code
- Atau gunakan Railway CLI untuk melihat logs real-time

### 🆓 **2. Render (Gratis dengan Batasan)**

**Keunggulan:**
- ✅ Gratis tier tersedia
- ✅ Auto-deploy dari GitHub
- ✅ SSL certificate gratis

**Batasan:**
- ⚠️ Sleep setelah 15 menit tidak ada activity
- ⚠️ 750 jam per bulan (gratis)

**Langkah Deploy:**
1. Daftar di [Render.com](https://render.com)
2. Connect GitHub
3. Create "New Web Service"
4. Pilih repository
5. Settings:
   ```
   Build Command: npm install
   Start Command: npm start
   ```
6. Set environment variables
7. Deploy

### 🆓 **3. Heroku (Berbayar - Tidak Gratis Lagi)**

**Catatan:** Heroku sudah tidak gratis sejak November 2022, tapi masih populer.

**Langkah Deploy:**
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create whatsapp-ai-bot`
4. Set environment variables:
   ```bash
   heroku config:set GEMINI_API_KEY=your_api_key
   heroku config:set MODEL_NAME=gemini-1.5-flash
   ```
5. Deploy: `git push heroku main`

### 💰 **4. VPS (Virtual Private Server)**

**Platform Recommended:**
- **DigitalOcean** ($5/bulan)
- **Linode** ($5/bulan)
- **Vultr** ($2.50/bulan)
- **Contabo** ($4/bulan)

**Setup di VPS:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 untuk process management
sudo npm install -g pm2

# Clone repository
git clone https://github.com/username/whatsapp-ai-bot.git
cd whatsapp-ai-bot

# Install dependencies
npm install

# Setup environment
cp .env.example .env
nano .env  # Edit dengan API key Anda

# Start dengan PM2
pm2 start index.js --name "whatsapp-bot"
pm2 startup  # Auto-start saat reboot
pm2 save
```

### 🆓 **5. Google Cloud Platform (Free Tier)**

**Keunggulan:**
- ✅ $300 credit untuk new user
- ✅ Always Free tier
- ✅ Powerful infrastructure

**Langkah Deploy:**
1. Buat project di [Google Cloud Console](https://console.cloud.google.com)
2. Enable Cloud Run API
3. Install Google Cloud CLI
4. Deploy:
   ```bash
   gcloud run deploy whatsapp-bot \
     --source . \
     --platform managed \
     --region asia-southeast1 \
     --allow-unauthenticated
   ```

## 🔧 Konfigurasi untuk Hosting

### **1. Tambahkan Dockerfile (Opsional)**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### **2. Modifikasi package.json**
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}
```

### **3. Environment Variables untuk Hosting**
```bash
# Wajib
GEMINI_API_KEY=your_gemini_api_key

# Opsional
MODEL_NAME=gemini-1.5-flash
BOT_NAME=WhatsApp AI Bot dengan Kecerdasan Emosional
SYSTEM_PROMPT=your_custom_prompt

# Untuk production
NODE_ENV=production
```

## 📱 Scan QR Code di Hosting

### **Masalah Umum:**
- QR code muncul di logs, tapi sulit untuk scan
- Perlu akses ke terminal/logs hosting

### **Solusi:**

#### **1. Railway/Render:**
- Buka logs di dashboard
- QR code akan muncul sebagai ASCII art
- Screenshot dan scan dengan WhatsApp

#### **2. VPS:**
- SSH ke server: `ssh user@your-server-ip`
- Lihat logs: `pm2 logs whatsapp-bot`
- QR code akan muncul di terminal

#### **3. Alternative - QR Code ke File:**
Modifikasi `index.js` untuk save QR ke file:
```javascript
const fs = require('fs');

this.client.on('qr', (qr) => {
    console.log('QR Code received');
    qrcode.generate(qr, { small: true });
    
    // Save QR to file (untuk hosting)
    fs.writeFileSync('qr.txt', qr);
    console.log('QR code saved to qr.txt');
});
```

## 🔄 Auto-Restart dan Monitoring

### **1. PM2 (untuk VPS):**
```bash
# Auto-restart jika crash
pm2 start index.js --name whatsapp-bot --restart-delay=3000

# Monitoring
pm2 monit

# Logs
pm2 logs whatsapp-bot
```

### **2. Untuk Platform Hosting:**
- Railway: Auto-restart built-in
- Render: Auto-restart built-in
- Heroku: Auto-restart built-in

## 🛡️ Keamanan dan Best Practices

### **1. Environment Variables:**
- ❌ JANGAN hardcode API key di kode
- ✅ Gunakan environment variables
- ✅ Tambahkan `.env` ke `.gitignore`

### **2. Session Management:**
- WhatsApp session akan tersimpan di `.wwebjs_auth/`
- Untuk hosting, session mungkin hilang saat restart
- Perlu scan QR lagi setelah restart

### **3. Monitoring:**
```bash
# Cek status bot
curl https://your-bot-url.com/health

# Setup health check endpoint (tambahkan ke index.js)
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        bot: this.isReady ? 'ready' : 'not ready',
        timestamp: new Date().toISOString()
    });
});
```

## 💰 Estimasi Biaya

### **Gratis:**
- Railway: 500 jam/bulan gratis
- Render: 750 jam/bulan gratis
- Google Cloud: $300 credit + always free tier

### **Berbayar:**
- VPS: $2.50-$5/bulan
- Heroku: $7/bulan
- Google Cloud Run: ~$1-3/bulan (tergantung usage)

## 🚨 Troubleshooting Hosting

### **Bot Tidak Merespons:**
1. Cek logs untuk error
2. Pastikan environment variables sudah benar
3. Cek quota API Gemini
4. Restart service

### **QR Code Tidak Muncul:**
1. Cek logs hosting platform
2. Pastikan terminal support Unicode
3. Gunakan alternative save QR to file

### **Session Hilang:**
1. Normal untuk platform hosting
2. Scan QR lagi setelah restart
3. Pertimbangkan VPS untuk session persistence

## 📞 Support

Jika mengalami masalah deployment:
1. Cek logs error di platform hosting
2. Pastikan semua dependencies terinstall
3. Verifikasi environment variables
4. Test lokal terlebih dahulu

---

**🎯 Rekomendasi:** Untuk pemula, gunakan **Railway** karena gratis, mudah, dan reliable. Untuk production serius, gunakan **VPS** untuk kontrol penuh.
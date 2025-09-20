# Troubleshooting Guide - WhatsApp AI Bot

## 🔧 Masalah Umum dan Solusinya

### 1. Bot mengatakan "sedang dalam proses inisialisasi" terus

**Penyebab:**
- GEMINI_API_KEY tidak diset atau tidak valid
- Masalah koneksi internet
- API key sudah expired atau quota habis

**Solusi:**
```bash
# 1. Periksa file .env
cat .env

# 2. Pastikan GEMINI_API_KEY terisi
# Contoh yang benar:
# GEMINI_API_KEY=AIzaSyD...

# 3. Test koneksi internet
ping google.com

# 4. Restart bot
./start.sh
```

### 2. Error "TypeError: fetch failed"

**Penyebab:**
- Masalah koneksi internet
- Firewall memblokir koneksi
- DNS issue

**Solusi:**
```bash
# 1. Test koneksi ke Google AI
curl -I https://generativelanguage.googleapis.com

# 2. Coba ganti DNS
sudo nano /etc/resolv.conf
# Tambahkan:
# nameserver 8.8.8.8
# nameserver 8.8.4.4

# 3. Restart network service
sudo systemctl restart networking
```

### 3. Error "API key not valid"

**Penyebab:**
- API key salah atau expired
- API key tidak memiliki permission

**Solusi:**
1. Buat API key baru di [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Copy API key yang baru
3. Update file `.env`:
```bash
nano .env
# Ganti GEMINI_API_KEY dengan yang baru
```

### 4. Bot tidak merespons pesan WhatsApp

**Penyebab:**
- Session WhatsApp expired
- Bot tidak terhubung ke WhatsApp
- Error dalam message handling

**Solusi:**
```bash
# 1. Hapus session lama
rm -rf .wwebjs_auth

# 2. Restart bot dan scan QR lagi
./start.sh

# 3. Periksa log untuk error
```

### 5. Error saat install dependencies

**Penyebab:**
- Node.js version terlalu lama
- NPM cache corrupt
- Missing system dependencies

**Solusi:**
```bash
# 1. Update Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Clear NPM cache
npm cache clean --force

# 3. Install system dependencies
sudo apt-get install -y build-essential python3

# 4. Install ulang
rm -rf node_modules package-lock.json
npm install
```

### 6. QR Code tidak muncul

**Penyebab:**
- Terminal tidak support Unicode
- Font issue

**Solusi:**
```bash
# 1. Install font yang support Unicode
sudo apt-get install fonts-noto

# 2. Set locale
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

# 3. Restart bot
./start.sh
```

### 7. Bot crash dengan "Puppeteer error"

**Penyebab:**
- Missing Chromium dependencies
- Insufficient memory

**Solusi:**
```bash
# 1. Install Chromium dependencies
sudo apt-get install -y \
    gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 \
    libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 \
    libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
    libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 \
    libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 \
    libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates \
    fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

# 2. Increase memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
```

### 8. Error "QUOTA_EXCEEDED"

**Penyebab:**
- Quota API Gemini habis
- Terlalu banyak request

**Solusi:**
1. Tunggu hingga quota reset (biasanya 24 jam)
2. Atau upgrade ke plan berbayar
3. Implementasi rate limiting

### 9. Bot lambat merespons

**Penyebab:**
- Koneksi internet lambat
- Server overload

**Solusi:**
```bash
# 1. Test kecepatan internet
speedtest-cli

# 2. Ganti model yang lebih cepat di .env
MODEL_NAME=gemini-1.5-flash

# 3. Optimize system prompt (buat lebih pendek)
```

### 10. Error permission di Linux

**Penyebab:**
- Script tidak executable
- Permission folder salah

**Solusi:**
```bash
# 1. Buat script executable
chmod +x start.sh
chmod +x install.sh

# 2. Fix permission folder
chmod -R 755 .
```

## 🔍 Debug Mode

Untuk debugging lebih detail, jalankan dengan:

```bash
# Enable debug logging
DEBUG=* node index.js

# Atau dengan verbose npm
npm start --verbose
```

## 📞 Bantuan Lebih Lanjut

Jika masalah masih berlanjut:

1. **Cek log error** di terminal
2. **Periksa file .env** sudah benar
3. **Test koneksi internet** dan DNS
4. **Restart bot** setelah perubahan
5. **Hapus session** jika perlu (`rm -rf .wwebjs_auth`)

## 🛠️ Tools Debugging

```bash
# Cek status service
systemctl status networking

# Monitor resource usage
htop

# Cek port yang digunakan
netstat -tulpn

# Test DNS resolution
nslookup generativelanguage.googleapis.com
```

## 📋 Checklist Troubleshooting

- [ ] Node.js version >= 16.0.0
- [ ] NPM dependencies installed
- [ ] File .env exists dan terisi
- [ ] GEMINI_API_KEY valid
- [ ] Koneksi internet stabil
- [ ] System dependencies installed
- [ ] Script executable (chmod +x)
- [ ] WhatsApp Web accessible
- [ ] Sufficient disk space
- [ ] Sufficient memory
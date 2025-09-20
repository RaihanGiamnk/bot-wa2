# 🚂 Railway Deployment Troubleshooting

Panduan khusus untuk mengatasi masalah deployment di Railway.

## 🔧 Masalah Umum dan Solusi

### 1. **Build Failed - npm install Error**

**Gejala:**
```
npm error [...include <project|optional|peer> [...include <project|optional|peer> ...]]
npm error [--strict-peer-deps] [--foreground-scripts] [--ignore-scripts]
```

**Solusi:**
1. **Pastikan package.json benar:**
   - Hapus `^` dari version dependencies
   - Gunakan exact version numbers
   - Set engines dengan spesifik

2. **Clear Railway cache:**
   - Go to Railway dashboard
   - Settings → Danger → Reset Build Cache
   - Redeploy

3. **Check Node.js version:**
   ```json
   "engines": {
     "node": "18.x",
     "npm": "9.x"
   }
   ```

### 2. **Puppeteer/Chromium Error**

**Gejala:**
```
Error: Failed to launch the browser process!
```

**Solusi:**
1. **Set environment variables di Railway:**
   ```
   PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
   PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
   ```

2. **Update nixpacks.toml:**
   ```toml
   [phases.setup]
   nixPkgs = ['nodejs-18_x', 'chromium']
   ```

3. **Alternative - Use different WhatsApp library:**
   Jika masih error, pertimbangkan ganti ke `@whiskeysockets/baileys`

### 3. **Port Binding Error**

**Gejala:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solusi:**
1. **Pastikan menggunakan PORT environment variable:**
   ```javascript
   const PORT = process.env.PORT || 3000;
   ```

2. **Railway otomatis set PORT, jangan hardcode**

### 4. **Environment Variables Not Found**

**Gejala:**
```
[ERROR] GEMINI_API_KEY tidak ditemukan di file .env
```

**Solusi:**
1. **Set di Railway Dashboard:**
   - Project → Variables
   - Add: `GEMINI_API_KEY=your_key_here`
   - Add: `MODEL_NAME=gemini-1.5-flash`

2. **Jangan upload file .env ke GitHub**

### 5. **QR Code Tidak Muncul**

**Gejala:**
- Logs tidak menampilkan QR code
- Bot stuck di "Initializing..."

**Solusi:**
1. **Check logs di Railway:**
   - Deployments → View Logs
   - Tunggu sampai muncul "Scan QR code"

2. **Access QR via endpoint:**
   ```bash
   curl https://your-app.up.railway.app/qr
   ```

3. **Restart deployment jika perlu**

### 6. **Memory/CPU Limit Exceeded**

**Gejala:**
```
Process killed (OOMKilled)
```

**Solusi:**
1. **Optimize Puppeteer args:**
   ```javascript
   '--disable-dev-shm-usage',
   '--single-process',
   '--disable-gpu'
   ```

2. **Upgrade Railway plan jika perlu**

## 🚀 Deployment Checklist

### **Pre-deployment:**
- [ ] `package.json` menggunakan exact versions
- [ ] `nixpacks.toml` sudah ada
- [ ] `railway.json` sudah dikonfigurasi
- [ ] `.gitignore` mencakup `.env` dan `node_modules`
- [ ] Test lokal berhasil

### **Railway Setup:**
- [ ] Repository connected ke Railway
- [ ] Environment variables set:
  - `GEMINI_API_KEY`
  - `MODEL_NAME`
  - `BOT_NAME`
- [ ] Build berhasil tanpa error
- [ ] Health check endpoint accessible

### **Post-deployment:**
- [ ] Logs menampilkan "Bot siap digunakan"
- [ ] QR code muncul di logs
- [ ] Health check returns 200: `/health`
- [ ] Bot merespons command `/c`

## 🔍 Debugging Commands

### **Check Railway Status:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Check logs
railway logs

# Check variables
railway variables

# Redeploy
railway up
```

### **Test Endpoints:**
```bash
# Health check
curl https://your-app.up.railway.app/health

# QR code
curl https://your-app.up.railway.app/qr

# Status
curl https://your-app.up.railway.app/status
```

## 🛠️ Advanced Fixes

### **1. Custom Buildpack (Jika Nixpacks Gagal):**
```json
// railway.json
{
  "build": {
    "builder": "DOCKERFILE"
  }
}
```

### **2. Alternative WhatsApp Library:**
Jika whatsapp-web.js bermasalah, ganti ke Baileys:
```bash
npm uninstall whatsapp-web.js
npm install @whiskeysockets/baileys
```

### **3. Headless Browser Alternative:**
```javascript
// Gunakan puppeteer-core dengan custom executable
const puppeteer = require('puppeteer-core');
```

## 📊 Monitoring

### **Railway Dashboard:**
- Metrics → CPU/Memory usage
- Deployments → Build logs
- Variables → Environment config

### **Custom Monitoring:**
```javascript
// Add to index.js
setInterval(() => {
  console.log(`[HEALTH] Bot status: ${this.isReady ? 'Ready' : 'Not Ready'}`);
  console.log(`[HEALTH] Memory usage: ${process.memoryUsage().heapUsed / 1024 / 1024} MB`);
}, 60000); // Every minute
```

## 🆘 Emergency Fixes

### **Quick Redeploy:**
1. Go to Railway dashboard
2. Deployments → Latest deployment
3. Click "Redeploy"

### **Reset Everything:**
1. Settings → Danger → Reset Build Cache
2. Variables → Delete all → Re-add
3. Redeploy from GitHub

### **Fallback to VPS:**
Jika Railway terus bermasalah:
1. Deploy ke DigitalOcean/Linode
2. Gunakan PM2 untuk process management
3. Setup nginx reverse proxy

## 📞 Support Resources

- **Railway Docs:** https://docs.railway.app
- **Railway Discord:** https://discord.gg/railway
- **WhatsApp-Web.js Docs:** https://wwebjs.dev
- **Puppeteer Troubleshooting:** https://pptr.dev/troubleshooting

---

**💡 Pro Tip:** Selalu test di lokal dulu sebelum deploy. Jika berjalan di lokal tapi gagal di Railway, kemungkinan besar masalah di environment atau dependencies.
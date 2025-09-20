# 🎮 Panduan Command Bot WhatsApp AI

Bot WhatsApp AI dilengkapi dengan sistem command yang memudahkan interaksi dan akses ke fitur-fitur khusus.

## 🚀 Cara Menggunakan Command

Semua command dimulai dengan tanda `/` diikuti dengan nama perintah:
```
/c
/help
/status
```

## 📋 Daftar Command Lengkap

### 🤖 **Perintah Utama**

#### `/c` - Aktivasi Bot
Mengaktifkan bot dan menampilkan pesan selamat datang dengan informasi fitur.

**Contoh:**
```
User: /c
Bot: 🤖 WhatsApp AI Bot dengan Kecerdasan Emosional 💙
     Halo [Nama]! Bot AI sudah aktif dan siap membantu kamu...
```

#### `/help` - Bantuan
Menampilkan daftar semua command yang tersedia.

#### `/status` - Status Bot
Menampilkan status bot, AI service, dan konfigurasi saat ini.

**Output:**
```
📊 Status Bot
🤖 Bot Status: ✅ Aktif
🧠 AI Service: ✅ Siap
💙 Emotion Detection: ✅ Aktif
🌐 Model: gemini-1.5-flash
```

### 💙 **Perintah Emosional**

#### `/comfort` - Penghiburan
Memberikan kata-kata penghiburan dan dukungan emosional.

**Kapan Digunakan:**
- Saat merasa sedih atau down
- Butuh kata-kata penyemangat
- Ingin merasa didengarkan

#### `/motivation` - Motivasi
Memberikan motivasi dan semangat untuk menghadapi hari.

**Contoh Output:**
```
💪 Semangat dan Motivasi
🌟 Kamu sudah sejauh ini, itu artinya kamu sangat kuat!
🌈 Setiap hari adalah kesempatan baru untuk memulai lagi...
```

#### `/relax` - Relaksasi
Memberikan tips dan teknik untuk relaksasi dan menenangkan diri.

**Fitur:**
- Teknik pernapasan 4-7-8
- Aktivitas menenangkan
- Tips self-care

#### `/quote` - Quote Motivasi
Memberikan quote motivasi random dari koleksi bot.

### ℹ️ **Perintah Informasi**

#### `/about` - Tentang Bot
Informasi lengkap tentang bot, teknologi yang digunakan, dan misi bot.

#### `/features` - Daftar Fitur
Menampilkan semua fitur bot secara detail.

## 🎯 Tips Penggunaan Command

### **Untuk Pengguna Baru:**
1. Mulai dengan `/c` untuk aktivasi
2. Gunakan `/help` untuk melihat semua command
3. Coba `/about` untuk memahami bot lebih baik

### **Saat Merasa Sedih:**
1. `/comfort` - untuk penghiburan langsung
2. `/relax` - untuk tips menenangkan diri
3. `/quote` - untuk motivasi
4. Atau langsung cerita ke bot tanpa command

### **Untuk Motivasi Harian:**
1. `/motivation` - semangat pagi
2. `/quote` - inspirasi random
3. `/features` - lihat apa saja yang bisa bot bantu

## 🔄 Kombinasi Command dan Chat

Bot mendukung kombinasi penggunaan command dan chat biasa:

```
User: /c
Bot: [Pesan aktivasi]

User: Aku sedang sedih nih
Bot: [Respons empati otomatis dengan deteksi emosi]

User: /comfort
Bot: [Kata-kata penghiburan khusus]

User: Terima kasih, aku merasa lebih baik
Bot: [Respons AI yang natural]
```

## 🛠️ Command untuk Troubleshooting

### `/status` - Diagnosa Masalah
Gunakan untuk mengecek:
- Apakah bot aktif
- Status AI service
- Konfigurasi model
- Fitur deteksi emosi

### Error Handling
Jika command tidak dikenali:
```
User: /xyz
Bot: ❓ Perintah "/xyz" tidak dikenali.
     Ketik /help untuk melihat daftar perintah yang tersedia.
```

## 📱 Command di Grup vs Chat Pribadi

### **Chat Pribadi:**
- Semua command berfungsi normal
- Respons langsung ke pengguna
- Deteksi emosi personal

### **Grup Chat:**
- Command tetap berfungsi
- Bot akan merespons di grup
- Deteksi emosi berdasarkan pengirim pesan

## 🎨 Customization Command

### **Menambah Command Baru:**
Edit file `index.js` di method `handleCommand()`:

```javascript
case '/custom':
    await message.reply('Respons custom Anda');
    break;
```

### **Mengubah Respons Command:**
Setiap respons command dapat dimodifikasi di file `index.js` sesuai kebutuhan.

## 🔐 Keamanan Command

- Command hanya merespons pesan teks
- Tidak ada command yang mengakses data sensitif
- Semua command aman untuk digunakan di grup

## 📊 Logging Command

Setiap penggunaan command akan dicatat di log:
```
[CMD] Command /c executed by [Username]
[CMD] Command /help executed by [Username]
```

## 🚀 Command Masa Depan

Rencana pengembangan command:
- `/mood` - Tracking mood harian
- `/journal` - Fitur jurnal emosi
- `/reminder` - Pengingat self-care
- `/stats` - Statistik penggunaan bot

---

**💡 Tips:** Gunakan command sebagai shortcut untuk fitur khusus, tapi jangan ragu untuk berbicara natural dengan bot. Sistem deteksi emosi akan tetap bekerja pada percakapan biasa!
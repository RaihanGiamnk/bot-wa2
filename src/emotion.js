class EmotionDetector {
    constructor() {
        // Kata kunci untuk deteksi emosi sedih
        this.sadKeywords = [
            'sedih', 'galau', 'kecewa', 'patah hati', 'hancur', 'terpuruk',
            'depresi', 'stress', 'putus asa', 'lelah', 'capek hidup',
            'menyerah', 'hopeless', 'down', 'bad mood', 'bete',
            'kesal', 'marah', 'frustasi', 'jenuh', 'bosan hidup',
            'kesepian', 'sendiri', 'ditinggal', 'dikhianati', 'sakit hati',
            'menangis', 'nangis', 'air mata', 'terluka', 'luka',
            'putus cinta', 'gagal', 'kegagalan', 'tidak berguna',
            'sia-sia', 'hampa', 'kosong', 'gelap', 'suram'
        ];

        // Kata kunci untuk deteksi emosi bahagia
        this.happyKeywords = [
            'senang', 'bahagia', 'gembira', 'excited', 'antusias',
            'sukses', 'berhasil', 'lulus', 'menang', 'juara',
            'cinta', 'sayang', 'rindu', 'kangen', 'romantis',
            'tertawa', 'ketawa', 'lucu', 'humor', 'seru'
        ];

        // Kata kunci untuk deteksi emosi marah
        this.angryKeywords = [
            'marah', 'kesal', 'benci', 'muak', 'jengkel',
            'dongkol', 'sebel', 'annoying', 'menyebalkan'
        ];

        // Respons empatik untuk kesedihan
        this.sadResponses = [
            "😢 Saya turut merasakan kesedihan yang kamu alami. Kadang hidup memang terasa berat, tapi ingat bahwa perasaan ini tidak akan berlangsung selamanya.",
            "💙 Aku di sini untuk mendengarkan. Tidak apa-apa untuk merasa sedih, itu adalah bagian dari menjadi manusia. Kamu tidak sendirian dalam ini.",
            "🤗 Pelukan virtual untukmu. Aku tahu rasanya ketika dunia terasa gelap, tapi percayalah bahwa akan ada cahaya di ujung terowongan.",
            "😔 Maaf mendengar kamu sedang tidak baik-baik saja. Mau cerita lebih? Kadang berbagi beban bisa membantu meringankan hati.",
            "💔 Aku merasakan kesedihanmu. Ingat bahwa kamu lebih kuat dari yang kamu kira, dan badai ini akan berlalu."
        ];

        // Kata-kata penyemangat
        this.encouragements = [
            "🌅 Setiap hari adalah kesempatan baru untuk memulai lagi.",
            "💪 Kamu sudah sejauh ini, itu artinya kamu sangat kuat.",
            "🌈 Setelah hujan pasti ada pelangi.",
            "⭐ Kamu berharga dan layak untuk bahagia.",
            "🌱 Pertumbuhan terjadi dalam ketidaknyamanan.",
            "🕊️ Berikan waktu untuk dirimu sendiri untuk sembuh.",
            "💎 Tekanan membuat berlian, kesulitan membuatmu lebih kuat."
        ];
    }

    detectEmotion(message) {
        const lowerMessage = message.toLowerCase();
        
        // Hitung skor untuk setiap emosi
        let sadScore = 0;
        let happyScore = 0;
        let angryScore = 0;

        // Deteksi kata kunci sedih
        this.sadKeywords.forEach(keyword => {
            if (lowerMessage.includes(keyword)) {
                sadScore += 1;
            }
        });

        // Deteksi kata kunci bahagia
        this.happyKeywords.forEach(keyword => {
            if (lowerMessage.includes(keyword)) {
                happyScore += 1;
            }
        });

        // Deteksi kata kunci marah
        this.angryKeywords.forEach(keyword => {
            if (lowerMessage.includes(keyword)) {
                angryScore += 1;
            }
        });

        // Tentukan emosi dominan
        if (sadScore > happyScore && sadScore > angryScore && sadScore > 0) {
            return { emotion: 'sad', intensity: sadScore };
        } else if (happyScore > sadScore && happyScore > angryScore && happyScore > 0) {
            return { emotion: 'happy', intensity: happyScore };
        } else if (angryScore > sadScore && angryScore > happyScore && angryScore > 0) {
            return { emotion: 'angry', intensity: angryScore };
        }

        return { emotion: 'neutral', intensity: 0 };
    }

    getEmpatheticResponse(emotion, intensity) {
        switch (emotion) {
            case 'sad':
                const sadResponse = this.sadResponses[Math.floor(Math.random() * this.sadResponses.length)];
                const encouragement = this.encouragements[Math.floor(Math.random() * this.encouragements.length)];
                
                if (intensity >= 2) {
                    // Kesedihan yang dalam
                    return `${sadResponse}\n\n${encouragement}\n\nAku di sini jika kamu butuh teman bicara. Jangan ragu untuk bercerita lebih banyak. 💙`;
                } else {
                    // Kesedihan ringan
                    return `${sadResponse}\n\n${encouragement}`;
                }

            case 'happy':
                return "😊 Senang sekali melihat kamu bahagia! Energi positifmu menular ke aku juga. Semoga kebahagiaan ini terus berlanjut ya! ✨";

            case 'angry':
                return "😤 Aku bisa merasakan kekesalanmu. Tarik napas dalam-dalam dulu ya. Mau cerita apa yang membuatmu kesal? Kadang mengeluarkan unek-unek bisa membantu. 🤗";

            default:
                return null; // Tidak ada respons khusus untuk emosi netral
        }
    }

    // Method untuk memberikan saran berdasarkan emosi
    getSuggestion(emotion) {
        switch (emotion) {
            case 'sad':
                const suggestions = [
                    "💡 Coba dengarkan musik yang menenangkan atau lagu favoritmu",
                    "💡 Menulis jurnal bisa membantu mengeluarkan perasaan",
                    "💡 Jalan-jalan sebentar di luar atau hirup udara segar",
                    "💡 Hubungi teman atau keluarga yang kamu sayangi",
                    "💡 Lakukan aktivitas kecil yang biasanya membuatmu senang",
                    "💡 Ingat bahwa tidak apa-apa untuk istirahat dan merawat diri sendiri"
                ];
                return suggestions[Math.floor(Math.random() * suggestions.length)];

            case 'angry':
                return "💡 Coba teknik pernapasan 4-7-8: tarik napas 4 detik, tahan 7 detik, buang 8 detik";

            default:
                return null;
        }
    }

    // Method untuk memberikan quote motivasi
    getMotivationalQuote() {
        const quotes = [
            "\"Jangan menyerah. Penderitaan yang kamu rasakan hari ini adalah kekuatan yang kamu butuhkan besok.\" 💪",
            "\"Kamu tidak harus menjadi sempurna, kamu hanya perlu menjadi dirimu sendiri.\" ✨",
            "\"Setiap badai dalam hidupmu mengajarkanmu untuk menghargai ketenangan.\" 🌈",
            "\"Luka-luka hari ini akan menjadi kekuatanmu di masa depan.\" 🌟",
            "\"Tidak ada yang salah dengan dirimu. Kamu sedang belajar dan berkembang.\" 🌱"
        ];
        return quotes[Math.floor(Math.random() * quotes.length)];
    }
}

module.exports = EmotionDetector;
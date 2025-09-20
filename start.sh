#!/bin/bash

# WhatsApp AI Bot Startup Script
# Make sure this script is executable: chmod +x start.sh

echo "=== WhatsApp AI Bot Startup ==="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js tidak ditemukan. Silakan install Node.js terlebih dahulu."
    echo "   Kunjungi: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="16.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "❌ Node.js version $NODE_VERSION ditemukan, tetapi diperlukan minimal v$REQUIRED_VERSION"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ File .env tidak ditemukan!"
    echo "   Silakan copy .env.example ke .env dan isi konfigurasi yang diperlukan:"
    echo "   cp .env.example .env"
    echo "   nano .env"
    exit 1
fi

echo "✅ File .env ditemukan"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Gagal menginstall dependencies"
        exit 1
    fi
fi

echo "✅ Dependencies ready"

# Check if Gemini AI API key is set
if ! grep -q "GEMINI_API_KEY=.*[^[:space:]]" .env; then
    echo "❌ GEMINI_API_KEY belum diset di file .env"
    echo "   Silakan edit file .env dan tambahkan API key Anda:"
    echo "   Dapatkan API key gratis di: https://makersuite.google.com/app/apikey"
    echo "   nano .env"
    exit 1
fi

echo "✅ Gemini AI API key configured"
echo ""
echo "🚀 Starting WhatsApp AI Bot..."
echo "   Tekan Ctrl+C untuk menghentikan bot"
echo ""

# Start the bot
node index.js
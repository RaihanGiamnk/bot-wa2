#!/bin/bash

# WhatsApp AI Bot Installation Script
# Make sure this script is executable: chmod +x install.sh

echo "=== WhatsApp AI Bot Installation ==="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js tidak ditemukan!"
    echo ""
    echo "Silakan install Node.js terlebih dahulu:"
    echo "1. Kunjungi: https://nodejs.org/"
    echo "2. Download dan install Node.js LTS"
    echo "3. Atau gunakan package manager:"
    echo "   Ubuntu/Debian: sudo apt install nodejs npm"
    echo "   CentOS/RHEL: sudo yum install nodejs npm"
    echo "   Arch Linux: sudo pacman -S nodejs npm"
    echo ""
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="16.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "❌ Node.js version $NODE_VERSION ditemukan, tetapi diperlukan minimal v$REQUIRED_VERSION"
    echo "   Silakan update Node.js Anda"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ NPM tidak ditemukan!"
    echo "   Silakan install NPM atau gunakan package manager lain"
    exit 1
fi

echo "✅ NPM version: $(npm -v)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Gagal menginstall dependencies"
    echo "   Coba jalankan: npm install --verbose"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo ""
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created from template"
    echo ""
    echo "⚠️  PENTING: Edit file .env dan isi GEMINI_API_KEY dengan API key Anda!"
    echo "   Dapatkan API key gratis di: https://makersuite.google.com/app/apikey"
    echo "   Jalankan: nano .env"
    echo ""
else
    echo "✅ .env file already exists"
fi

# Make start script executable
chmod +x start.sh
echo "✅ Start script made executable"

# Install system dependencies for Linux (if needed)
if command -v apt-get &> /dev/null; then
    echo ""
    echo "🔧 Checking system dependencies..."
    
    # Check if we need to install Chromium dependencies
    if ! dpkg -l | grep -q libgtk-3-0; then
        echo "📦 Installing system dependencies for Chromium..."
        echo "   Ini mungkin memerlukan password sudo..."
        
        sudo apt-get update
        sudo apt-get install -y \
            gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 \
            libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 \
            libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
            libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 \
            libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 \
            libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates \
            fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
        
        if [ $? -eq 0 ]; then
            echo "✅ System dependencies installed"
        else
            echo "⚠️  Beberapa system dependencies mungkin gagal diinstall"
            echo "   Bot mungkin masih bisa berjalan, coba jalankan dulu"
        fi
    else
        echo "✅ System dependencies already installed"
    fi
fi

echo ""
echo "🎉 Installation completed!"
echo ""
echo "Langkah selanjutnya:"
echo "1. Edit file .env dan isi TOGETHER_API_KEY:"
echo "   nano .env"
echo ""
echo "2. Dapatkan Gemini AI API key dari:"
echo "   https://makersuite.google.com/app/apikey"
echo ""
echo "3. Jalankan bot:"
echo "   ./start.sh"
echo ""
echo "Selamat menggunakan WhatsApp AI Bot! 🤖"
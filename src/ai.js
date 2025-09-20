const { GoogleGenerativeAI } = require('@google/generative-ai');
const EmotionDetector = require('./emotion');
require('dotenv').config();

class AIService {
    constructor() {
        this.apiKey = process.env.GEMINI_API_KEY;
        this.modelName = process.env.MODEL_NAME || 'gemini-1.5-flash';
        this.systemPrompt = process.env.SYSTEM_PROMPT || 'You are a caring and empathetic AI assistant integrated with WhatsApp. You have emotional intelligence and can understand and respond to human emotions with deep compassion and empathy. You are especially sensitive to sadness and emotional pain. Respond in a warm, supportive, and understanding manner in Indonesian language. Always show genuine care and offer comfort when users are going through difficult times.';
        
        // Initialize emotion detector
        this.emotionDetector = new EmotionDetector();
        
        // Don't throw error in constructor, handle it in isServiceReady
        if (this.apiKey) {
            try {
                this.genAI = new GoogleGenerativeAI(this.apiKey);
                this.model = this.genAI.getGenerativeModel({ model: this.modelName });
            } catch (error) {
                console.error('[AI] Error initializing Gemini:', error);
                this.genAI = null;
                this.model = null;
            }
        } else {
            console.error('[AI] GEMINI_API_KEY tidak ditemukan');
            this.genAI = null;
            this.model = null;
        }
    }

    async generateResponse(userMessage, userName = 'User') {
        try {
            console.log(`[AI] Generating response for: ${userMessage}`);
            
            // Check if model is available
            if (!this.model || !this.genAI) {
                console.error('[AI] Gemini model not initialized');
                return 'Maaf, layanan AI belum siap. Pastikan GEMINI_API_KEY sudah diset dengan benar.';
            }
            
            // Detect emotion in user message
            const emotionResult = this.emotionDetector.detectEmotion(userMessage);
            console.log(`[EMOTION] Detected: ${emotionResult.emotion} (intensity: ${emotionResult.intensity})`);
            
            // Get empathetic response if strong emotion detected
            let empatheticResponse = '';
            if (emotionResult.emotion !== 'neutral' && emotionResult.intensity > 0) {
                empatheticResponse = this.emotionDetector.getEmpatheticResponse(emotionResult.emotion, emotionResult.intensity);
                
                // For sad emotions, add extra care
                if (emotionResult.emotion === 'sad') {
                    const suggestion = this.emotionDetector.getSuggestion('sad');
                    const quote = this.emotionDetector.getMotivationalQuote();
                    
                    if (emotionResult.intensity >= 2) {
                        // Very sad - provide immediate empathetic response
                        return `${empatheticResponse}\n\n${suggestion}\n\n${quote}`;
                    }
                }
                
                // If we have empathetic response, we might want to combine it with AI response
                if (empatheticResponse) {
                    // For strong emotions, prioritize empathetic response
                    if (emotionResult.intensity >= 2) {
                        return empatheticResponse;
                    }
                }
            }
            
            // Create enhanced prompt with emotional context
            let emotionalContext = '';
            if (emotionResult.emotion === 'sad') {
                emotionalContext = `\n\nIMPORTANT: The user seems to be feeling sad or going through a difficult time. Please respond with extra empathy, compassion, and emotional support. Offer comfort and understanding.`;
            } else if (emotionResult.emotion === 'angry') {
                emotionalContext = `\n\nIMPORTANT: The user seems to be feeling frustrated or angry. Please respond with patience and understanding, helping to calm the situation.`;
            } else if (emotionResult.emotion === 'happy') {
                emotionalContext = `\n\nIMPORTANT: The user seems to be feeling happy or positive. Please respond with enthusiasm and share in their joy.`;
            }
            
            const prompt = `${this.systemPrompt}${emotionalContext}

User: ${userName}
Message: ${userMessage}

Please respond with appropriate emotional intelligence and empathy:`;

            // Retry mechanism for network issues
            let retries = 3;
            let lastError;
            
            for (let i = 0; i < retries; i++) {
                try {
                    const result = await this.model.generateContent(prompt);
                    const response = await result.response;
                    let aiResponse = response.text();

                    if (!aiResponse || aiResponse.trim() === '') {
                        return 'Maaf, saya tidak dapat memproses permintaan Anda saat ini. Silakan coba lagi.';
                    }

                    // Combine empathetic response with AI response if needed
                    if (empatheticResponse && emotionResult.intensity === 1) {
                        aiResponse = `${empatheticResponse}\n\n${aiResponse}`;
                    }

                    console.log(`[AI] Response generated: ${aiResponse.substring(0, 100)}...`);
                    return aiResponse;
                    
                } catch (error) {
                    lastError = error;
                    console.log(`[AI] Attempt ${i + 1} failed:`, error.message);
                    
                    if (i < retries - 1) {
                        // Wait before retry
                        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
                    }
                }
            }
            
            throw lastError;

        } catch (error) {
            console.error('[AI] Error generating response:', error);
            
            // Handle specific error types
            if (error.message.includes('fetch failed') || error.message.includes('network')) {
                return 'Maaf, terjadi masalah koneksi internet. Silakan coba lagi nanti.';
            } else if (error.message.includes('API_KEY_INVALID') || error.message.includes('401')) {
                return 'Maaf, API key tidak valid. Silakan periksa konfigurasi GEMINI_API_KEY.';
            } else if (error.message.includes('QUOTA_EXCEEDED') || error.message.includes('429')) {
                return 'Maaf, kuota API telah habis. Silakan coba lagi nanti.';
            } else if (error.message.includes('RATE_LIMIT_EXCEEDED')) {
                return 'Maaf, terlalu banyak permintaan. Silakan tunggu sebentar dan coba lagi.';
            } else {
                return 'Maaf, terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.';
            }
        }
    }

    async isServiceReady() {
        try {
            console.log('[AI] Testing Gemini AI service...');
            
            // Check if API key is set
            if (!this.apiKey) {
                console.error('[AI] GEMINI_API_KEY not found');
                return false;
            }
            
            // Check if model is initialized
            if (!this.model || !this.genAI) {
                console.error('[AI] Gemini model not initialized');
                return false;
            }
            
            // Test with a simple request with timeout
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Connection timeout')), 10000);
            });
            
            const testPromise = this.model.generateContent('Hello');
            
            const testResult = await Promise.race([testPromise, timeoutPromise]);
            const testResponse = await testResult.response;
            const text = testResponse.text();
            
            console.log('[AI] Service test successful');
            return text && text.length > 0;
            
        } catch (error) {
            console.error('[AI] Service not ready:', error.message);
            
            if (error.message.includes('fetch failed') || error.message.includes('timeout')) {
                console.error('[AI] Network connection issue detected');
            } else if (error.message.includes('401') || error.message.includes('API_KEY_INVALID')) {
                console.error('[AI] Invalid API key detected');
            }
            
            return false;
        }
    }

    // Method untuk mendapatkan informasi model yang tersedia
    getModelInfo() {
        return {
            provider: 'Google Gemini',
            model: this.modelName,
            features: ['Text Generation', 'Conversation', 'Indonesian Language Support']
        };
    }

    // Method untuk mengatur system prompt secara dinamis
    setSystemPrompt(newPrompt) {
        this.systemPrompt = newPrompt;
        console.log('[AI] System prompt updated');
    }
}

module.exports = AIService;
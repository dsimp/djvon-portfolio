const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React build
app.use(express.static(path.join(__dirname, 'build')));

// API Route
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!process.env.REACT_APP_GEMINI_API_KEY) {
             console.error("API Key is missing on server");
             return res.status(500).json({ error: "Server configuration error: API Key missing" });
        }

        const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
        
        // Use a model that is likely to exist. 
        // 1.5 Flash is standard, but if it fails, we can try others.
        // For now, let's stick to the one we want to use.
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();
        
        res.json({ text });

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: error.message || "Failed to generate response" });
    }
});

// Wildcard handler for React Router (must be after API routes)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

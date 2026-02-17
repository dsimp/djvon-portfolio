import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

if (!apiKey) {
  console.error("API Key not found in environment variables!");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
  const modelsToTest = [
    "gemini-2.5-flash", 
    "gemini-2.0-flash"
  ];

  for (const modelName of modelsToTest) {
      try {
        console.log(`Testing ${modelName} with v1...`);
        const model = genAI.getGenerativeModel({ model: modelName, apiVersion: "v1" });
        const result = await model.generateContent("Hello");
        console.log(`✅ Success with ${modelName}!`);
        return; // Exit on first success
      } catch (error) {
        console.error(`❌ Failed with ${modelName}:`, error.message.split('\n')[0]);
      }
  }
}

listModels();

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyCBgbVflhFqMzMRjLIJEFsogKuvlTgF3HM"; 

if (!apiKey) {
  console.error("API Key not found!");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Dummy model to get client
    // Actually, getting the model doesn't list them. There is no direct listModels method on the client instance in the currrent SDK version (0.24.1) in the way I might expect, 
    // BUT usually SDKs have a listModels method. 
    // Let's check the SDK documentation or try to use the API key to just make a simple generation call to see if it works with a specific model.
    // However, the error message said "Call ListModels to see the list of available models".
    // I can assume the SDK has it or I can just try to standard model names.
    // Let's try to verify if 'gemini-1.5-flash' works with a simple prompt.
    // And also try 'gemini-1.5-flash-latest' and 'gemini-1.0-pro'.
    
    console.log("Attempting to list models (if SDK supports it) or test standard models...");
    
    // Attempt to prompt with the failing model to see the error detailed
    try {
        console.log("Testing gemini-1.5-flash...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-1.5-flash!");
    } catch (e) {
        console.error("Failed with gemini-1.5-flash:", e.message);
    }

    try {
        console.log("Testing gemini-1.5-flash-001...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-1.5-flash-001!");
    } catch (e) {
        console.error("Failed with gemini-1.5-flash-001:", e.message);
    }

      try {
        console.log("Testing gemini-2.0-flash...");
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-2.0-flash!");
    } catch (e) {
        console.error("Failed with gemini-2.0-flash:", e.message);
    }

  } catch (error) {
    console.error("Error:", error);
  }
}

listModels();

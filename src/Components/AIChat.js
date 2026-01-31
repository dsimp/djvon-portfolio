import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT } from "./portfolioData";

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm Djvon's AI assistant. Ask me anything about his work!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"});
      
      // Combine system prompt with user input for context
      const currentDate = new Date().toLocaleString();
      const fullPrompt = `${SYSTEM_PROMPT}\n\nCurrent Date/Time: ${currentDate}\n\nUser Question: ${input}`;
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();
      
      const botMessage = { role: 'bot', text: text };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);

    } catch (error) {
      console.error("Chat Error Details:", error);
      console.log("API Key present:", !!process.env.REACT_APP_GEMINI_API_KEY);
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I ran into an error connecting to the AI. Please make sure the API Key is valid." }]);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000, width: 0, height: 0, overflow: 'visible', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', pointerEvents: 'none' }}>
      
      {/* Chat Window */}
      {isOpen && (
        <div 
            className="bubbling-card"
            style={{ 
                width: '350px', 
                height: '500px', 
                marginBottom: '20px', 
                padding: '0', // Custom padding for chat layout
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                animation: 'slideUp 0.3s ease-out',
                pointerEvents: 'auto' // Re-enable clicks
            }}
        >
             {/* Header */}
            <div style={{ 
                padding: '15px', 
                background: 'rgba(255,255,255,0.5)', 
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaRobot size={20} color="#555" />
                    <span style={{ fontWeight: 'bold', color: '#333' }}>Djvon AI</span>
                </div>
                <button onClick={toggleChat} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <FaTimes size={16} color="#777" />
                </button>
            </div>

            {/* Messages Area */}
            <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {messages.map((msg, idx) => (
                    <div 
                        key={idx} 
                        style={{ 
                            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                            maxWidth: '80%',
                            padding: '10px 15px',
                            borderRadius: '15px',
                            background: msg.role === 'user' ? '#0077b5' : '#fff', // Blue for user, White for bot
                            color: msg.role === 'user' ? '#fff' : '#333',
                            boxShadow: msg.role === 'user' 
                                ? '5px 5px 10px rgba(0,0,0,0.2)' // Pop out
                                : 'inset 2px 2px 5px rgba(0,0,0,0.05), inset -2px -2px 5px rgba(255,255,255,0.8)', // Neumorphic inset for bot
                            fontSize: '0.9rem'
                        }}
                    >
                        {msg.text}
                    </div>
                ))}
                {isLoading && (
                    <div style={{ alignSelf: 'flex-start', color: '#777', fontSize: '0.8rem', paddingLeft: '10px' }}>
                        Typing...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{ padding: '15px', background: 'rgba(255,255,255,0.3)' }}>
                <div 
                    className="neumorphic-inset" 
                    style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        padding: '5px 15px', 
                        width: '100%', 
                        boxSizing: 'border-box',
                        borderRadius: '30px', // More rounded for input
                        height: 'auto'
                    }}
                >
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about my projects..."
                        style={{ 
                            flex: 1, 
                            border: 'none', 
                            background: 'transparent', 
                            outline: 'none', 
                            color: '#333',
                            fontSize: '0.9rem'
                        }} 
                    />
                    <button onClick={handleSend} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '5px' }}>
                        <FaPaperPlane color="#555" />
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* FAB Toggle */}
      <button 
        className="neumorphic-btn" 
        onClick={toggleChat}
        style={{ width: '60px', height: '60px', pointerEvents: 'auto' }} // Re-enable clicks
      >
        <FaRobot size={24} color="#555" />
      </button>

      <style>{`
        @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AIChat;

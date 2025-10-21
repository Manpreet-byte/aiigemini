import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader, LogOut, UserCircle } from 'lucide-react';
import './Chat.css';
import ProfileModal from './ProfileModal';

// --- CONFIGURATION ---
const API_KEY = "AIzaSyA8CpWSAZzuRi88v0P_tEBilieygD2FyWs"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`;
const SYSTEM_INSTRUCTION = "You are a helpful and friendly AI chat assistant. Keep your responses concise and engaging, and always answer truthfully and ethically. Respond using markdown.";

/**
 * Main application component for the AI Chatbot.
 */
const App = ({ user, onLogout }) => {
  // State for storing the conversation messages
  const [messages, setMessages] = useState([
    { sender: 'ai', text: `Hello ${user?.name || 'there'}! I'm your AI assistant. Ask me anything!` }
  ]);
  // State for the current user input
  const [input, setInput] = useState('');
  // State to track loading status
  const [isLoading, setIsLoading] = useState(false);
  // State for profile modal
  const [showProfileModal, setShowProfileModal] = useState(false);
  // Count user messages
  const [userMessageCount, setUserMessageCount] = useState(0);
  
  // Ref to automatically scroll to the bottom of the chat area
  const messagesEndRef = useRef(null);

  // Scrolls to the bottom of the chat history whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Utility function to convert chat history for the Gemini API payload
  const formatHistoryForAPI = (currentMessages) => {
    // Map application state structure to API structure (user -> user, ai -> model)
    return currentMessages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));
  };

  // Utility function to handle exponential backoff for API retries
  const fetchWithRetries = async (url, options, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          return response;
        }
        // If not OK, throw error to trigger retry (unless it's a 4xx client error)
        if (response.status < 500) {
            // Log client error and stop retrying
            console.error('Client Error:', response.status, await response.text());
            throw new Error(`Client Error: ${response.status}`);
        }
        
        throw new Error(`Server Error: ${response.status}`);

      } catch (error) {
        if (i < retries - 1) {
          const delay = Math.pow(2, i) * 1000;
          console.log(`Attempt ${i + 1} failed. Retrying in ${delay / 1000}s...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          throw error; // Re-throw last error after final attempt
        }
      }
    }
  };


  /**
   * Handles sending the user's message, updating the UI, 
   * and calling the AI API with the conversation context.
   */
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();

    if (!trimmedInput || isLoading) return;

    // 1. Add user message to local state
    const userMessage = { sender: 'user', text: trimmedInput };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    setUserMessageCount(prev => prev + 1);

    try {
      // 2. Prepare payload including the full chat history for context
      const chatHistory = formatHistoryForAPI(updatedMessages);

      const payload = {
        contents: chatHistory,
        systemInstruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }]
        },
      };

      // 3. Call the API with retries
      const response = await fetchWithRetries(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      // 4. Extract and process the AI response
      const candidate = result.candidates?.[0];
      let aiText = "I'm sorry, I couldn't generate a response."; 

      if (candidate && candidate.content?.parts?.[0]?.text) {
        aiText = candidate.content.parts[0].text;
      }
      
      const aiMessage = { sender: 'ai', text: aiText };
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      console.error('AI Chat Error:', error);
      const errorMessage = { sender: 'ai', text: "There was an error connecting to the AI service. Please check the console for details." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Component to display individual chat messages
   */
  const Message = ({ message }) => {
    const isUser = message.sender === 'user';
    
    // Simple markdown parsing (e.g., replacing **text** with bold for better display)
    const content = message.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    return (
      <div className={`message-wrapper ${isUser ? 'user' : 'ai'}`}>
        <div className={`message-bubble ${isUser ? 'user' : 'ai'}`}>
          {/* Sender Icon */}
          <div className="message-icon">
            {isUser ? <User size={16} /> : <Bot size={16} />}
          </div>
          {/* Message Content */}
          <div className="message-content" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    );
  };
  
  /**
   * Loading indicator component
   */
  const TypingIndicator = () => (
    <div className="typing-indicator">
      <div className="typing-bubble">
        <div className="message-icon">
          <Bot size={16} />
        </div>
        <span className="message-content">AI is thinking</span>
        <div className="typing-dots">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        
        {/* Header */}
        <header className="chat-header">
          <div className="chat-header-left">
            <div className="bot-icon">
              <Bot size={24} />
            </div>
            <div className="chat-header-center">
              <h1>Gemini Chat Interface</h1>
              <p>Ask me anything and I'll remember our conversation!</p>
            </div>
          </div>
          
          {/* User Profile */}
          <div className="user-profile" onClick={() => setShowProfileModal(true)} style={{ cursor: 'pointer' }}>
            <div className="user-avatar">
              {user?.photoURL ? (
                <img src={user.photoURL} alt={user.name} />
              ) : (
                user?.name?.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            <div className="user-info">
              <p className="user-name">{user?.name || 'User'}</p>
              <p className="user-email">{user?.email || ''}</p>
            </div>
          </div>
          
          {/* Logout Button */}
          <button onClick={onLogout} className="logout-button">
            <LogOut size={16} style={{ marginRight: '0.25rem' }} />
            Logout
          </button>
        </header>

        {/* Chat Messages Area */}
        <div className="messages-area">
          {messages.map((msg, index) => (
            <Message key={index} message={msg} />
          ))}
          
          {isLoading && <TypingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="input-area">
          <form onSubmit={handleSendMessage} className="input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="input-field"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="send-button"
            >
              {isLoading ? (
                <Loader className="spinner" size={20} />
              ) : (
                <Send className="send-icon" size={20} />
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <ProfileModal
          user={user}
          messageCount={userMessageCount}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </div>
  );
};

export default App;

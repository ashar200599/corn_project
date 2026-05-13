import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { chatWithAIStream } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

const SteveIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    {/* Skin base */}
    <rect x="0" y="0" width="8" height="8" fill="#AF7E58"/>
    {/* Hair top */}
    <rect x="0" y="0" width="8" height="2" fill="#31221A"/>
    <rect x="0" y="2" width="1" height="1" fill="#31221A"/>
    <rect x="7" y="2" width="1" height="1" fill="#31221A"/>
    {/* Eyes */}
    <rect x="1" y="4" width="1" height="1" fill="#FFFFFF"/>
    <rect x="2" y="4" width="1" height="1" fill="#4B4B8B"/>
    <rect x="5" y="4" width="1" height="1" fill="#FFFFFF"/>
    <rect x="6" y="4" width="1" height="1" fill="#4B4B8B"/>
    {/* Nose */}
    <rect x="3" y="5" width="2" height="1" fill="#805537"/>
    {/* Beard/Mouth */}
    <rect x="2" y="6" width="1" height="1" fill="#31221A"/>
    <rect x="3" y="6" width="2" height="1" fill="#4F2624"/>
    <rect x="5" y="6" width="1" height="1" fill="#31221A"/>
    <rect x="3" y="7" width="2" height="1" fill="#31221A"/>
  </svg>
);

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello, what do you want to cook today ?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', text: userMessage };
    
    // Append user message
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsLoading(true);

    const botMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: botMessageId, role: 'model', text: '' }]);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const stream = chatWithAIStream(userMessage, history);
      
      let fullReply = '';
      for await (const chunk of stream) {
        fullReply += chunk;
        setMessages(prev => 
          prev.map(msg => 
            msg.id === botMessageId ? { ...msg, text: fullReply } : msg
          )
        );
        setIsLoading(false); // Stop loading animation as soon as first token arrives
      }
    } catch (e) {
       setMessages(prev => 
          prev.map(msg => 
             msg.id === botMessageId ? { ...msg, text: "Error: Connection to master server lost. Please try again." } : msg
          )
       );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-game-accent text-app-bg p-4 shadow-[4px_4px_0_0_#2b2b2b,inset_2px_2px_0_0_rgba(255,255,255,0.5)] border-2 border-app-border hover:-translate-y-1 hover:shadow-[4px_6px_0_0_#2b2b2b,inset_2px_2px_0_0_rgba(255,255,255,0.5)] transition-all flex items-center justify-center font-bold tracking-widest uppercase gap-2"
          >
            <SteveIcon size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-[90vw] md:w-[400px] h-[500px] max-h-[80vh] flex flex-col bg-[#111] border-4 border-app-border shadow-[8px_8px_0_0_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="bg-app-bg border-b-4 border-app-border p-3 flex justify-between items-center text-game-accent">
              <div className="flex items-center gap-2 font-bold uppercase tracking-widest">
                <SteveIcon size={20} />
                <span>Steve</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:text-game-magenta transition-colors bg-app-border/20 p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 border-2 ${
                      msg.role === 'user' 
                        ? 'bg-game-accent/10 border-game-accent text-game-accent' 
                        : 'bg-game-magenta/10 border-game-magenta text-app-text-main'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1 opacity-70 text-xs font-bold uppercase tracking-wider">
                      {msg.role === 'user' ? <User size={12} /> : <SteveIcon size={12} />}
                      {msg.role === 'user' ? 'You' : 'Steve'}
                    </div>
                    <div className="markdown-body leading-tight text-sm">
                       <Markdown remarkPlugins={[remarkGfm]}>{msg.text}</Markdown>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-game-magenta/10 border-2 border-game-magenta text-app-text-main p-3">
                     <span className="animate-pulse">Loading blocks...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-app-bg border-t-4 border-app-border flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 bg-black border-2 border-app-border p-2 text-app-text-main font-mono text-sm focus:outline-none focus:border-game-accent transition-colors placeholder:text-app-text-muted"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-game-accent text-black font-bold border-2 border-app-border p-2 hover:bg-game-accent/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Send Message"
              >
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

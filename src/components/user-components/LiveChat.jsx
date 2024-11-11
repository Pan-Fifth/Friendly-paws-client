import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';

const genAI = new GoogleGenerativeAI("AIzaSyDFQP49YT2evf8SvHVHcWDfPazJxH3egYM");

const LiveChat = forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const chatHistoryRef = useRef([]);
    const scrollAreaRef = useRef(null);
    const nodeRef = useRef(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (messages.length === 0) {
        const welcomeMessage = {
          text: "Hello! I'm your Friendly Paws assistant. How can I help you with pet adoption, donations, or events?",
          sender: 'bot'
        };
        setMessages([welcomeMessage]);
        chatHistoryRef.current = [welcomeMessage];
      }
    }, []);
  
    useEffect(() => {
      const scrollArea = document.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    }, [messages]);
  
    const handleDrag = (e, data) => {
      setPosition({ x: data.x, y: data.y });
    };

  const initialContext = `You are a helpful assistant for Friendly Paws, a pet adoption and care platform. Here's what you need to know:

  1. Pet Adoption System:
  - We have dogs and cats available for adoption
  - Each pet has details in English and Thai (name, breed, description)
  - Pets can be: AVAILABLE, PENDING, ADOPTED, FOSTERED, or UNAVAILABLE

  2. User System:
  - Users can be: regular USERS
  - Users can adopt pet, donate, attend event
  - We verify housing conditions before adoption

  3. Adoption Process:
  - Users must provide personal information
  - Housing details are required (type, garden, fence)
  - We check family situation and work schedule
  - Users can choose delivery or pickup

  4. Events and Donations:
  - We host various events (titles in English and Thai)
  - Users can donate via credit card or promptpay
  - Events can be: PENDING, ACTIVE, COMPLETED, CANCELLED, or POSTPONED


  When responding:
  1. Keep responses concise and friendly
  2. Always suggest relevant page links using [text](/path) format, paths are in singular form (donate, adopt, event)
  3. Focus on guiding users to the right sections of the website`;

  const generateResponse = async (userInput) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const conversationHistory = chatHistoryRef.current
      .map((msg) => `${msg.sender === "user" ? "User" : "Assistant"}: ${msg.text}`)
      .join("\n");

    const prompt = `${initialContext}\n\nConversation History:\n${conversationHistory}\n\nUser: ${userInput}\nAssistant:`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error:", error);
      return "What specific information would you like about our services?";
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { text: input.trim(), sender: "user" };
    setInput("");
    setMessages((prev) => [...prev, userMessage]);
    chatHistoryRef.current = [...chatHistoryRef.current, userMessage];
    setIsLoading(true);

    try {
      const response = await generateResponse(userMessage.text);
      const botMessage = { text: response, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
      chatHistoryRef.current = [...chatHistoryRef.current, botMessage];
    } catch (error) {
      const errorMessage = {
        text: "What specific information would you like about our services?",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
      chatHistoryRef.current = [...chatHistoryRef.current, errorMessage];
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const renderMessage = (message) => {
    if (message.sender === "user") {
      return (
        <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2 max-w-[80%] break-words">
          {message.text}
        </div>
      );
    }
  
    const parts = message.text.split(/(\[[^\]]+\]\([^)]+\))/g);
  
    return (
      <div className="bg-muted rounded-lg px-4 py-2 max-w-[80%] break-words whitespace-pre-wrap">
        {parts.map((part, index) => {
          const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
          if (linkMatch) {
            const [_, text, path] = linkMatch;
            return (
              <span key={index}>
                <button
                  onClick={() => handleLinkClick(path)}
                  className="text-primary hover:underline font-medium inline-block mx-1"
                >
                  {text}
                </button>
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </div>
    );
  };
  

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div className="relative w-full h-full">
        <Draggable
          nodeRef={nodeRef}
          position={position}
          onDrag={handleDrag}
          bounds="parent"
        >
          <div ref={nodeRef} className="absolute pointer-events-auto" style={{ right: '1rem', bottom: '1rem' }}>
            {isOpen && (
              <Card className="absolute bottom-16 right-0 w-[350px] h-[500px] flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 shrink-0">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    <h3 className="font-semibold">Friendly Paws Chat</h3>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <span className="sr-only">Close</span>
                    ✕
                  </Button>
                </CardHeader>
                
                <CardContent className="flex-1 p-4 overflow-hidden">
                  <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
                    <div className="flex flex-col gap-4 pb-2">
                      {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} w-full`}>
                          {renderMessage(msg)}
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-muted rounded-lg px-4 py-2">
                            Typing...
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>

                <CardFooter className="border-t pt-4 shrink-0">
                  <form onSubmit={handleSend} className="flex w-full gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading}>
                      Send
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            )}
            
            <Button
              onClick={() => setIsOpen(!isOpen)}
              size="icon"
              className="rounded-full h-12 w-12 shadow-lg cursor-pointer"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </div>
        </Draggable>
      </div>
    </div>
  );
});

LiveChat.displayName = 'LiveChat';

export default LiveChat;

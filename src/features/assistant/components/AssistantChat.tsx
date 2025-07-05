'use client';

import { useState, useRef, useEffect } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { Bot, User, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { answerProductivityQuestion } from '@/ai/flows/answer-productivity-questions';
import { generateJoke } from '@/ai/flows/generate-joke';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const staticJokes = [
    "Why don't programmers like nature? It has too many bugs.",
    "Why did the computer keep sneezing? It had a virus!",
    "What's a computer's favorite snack? Microchips!",
    "Why was the JavaScript developer sad? Because he didn't Node how to Express himself.",
    "I've got a great UDP joke, but I'm not sure you'll get it."
];

type AssistantChatProps = {
  userId: string;
}

export default function AssistantChat({ userId }: AssistantChatProps) {
  const { geminiApiKey } = useSettings();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getGreeting = async () => {
      const greetingId = 'initial-greeting';
      setMessages([{ id: greetingId, role: 'assistant', content: 'Thinking of a good joke for you...' }]);
      
      let joke;
      
      if (geminiApiKey) {
        try {
          const result = await generateJoke();
          joke = result.joke;
        } catch (error) {
          console.error("Failed to fetch AI joke:", error);
          joke = staticJokes[Math.floor(Math.random() * staticJokes.length)];
        }
      } else {
        joke = staticJokes[Math.floor(Math.random() * staticJokes.length)];
      }

      setMessages([{ id: greetingId, role: 'assistant', content: joke + "\n\nI can also help you be more productive. What's on your mind?" }]);
    };
    
    getGreeting();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };

    if (!geminiApiKey) {
        setMessages((prev) => [...prev, userMessage, {
            id: Date.now().toString() + '-error',
            role: 'assistant',
            content: "It looks like your Gemini API key isn't set up. Please go to the Settings page to add your key so I can help you."
        }]);
        setInput('');
        return;
    }

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const question = input;
    setInput('');
    setIsLoading(true);

    try {
      const historyForAI = newMessages.slice(1, -1).map(m => ({ role: m.role, content: m.content }));
      
      const result = await answerProductivityQuestion({ 
          userId,
          question,
          history: historyForAI
      });
      const assistantMessage: Message = { id: Date.now().toString(), role: 'assistant', content: result.answer };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: Date.now().toString() + '-error',
        role: 'assistant',
        content: "Sorry, I encountered an error. This might be due to an issue with the server-side API key configuration. Please ensure it's set up correctly.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex-1 flex flex-col h-full max-h-[calc(100vh-10rem)]">
      <CardContent className="flex-1 overflow-hidden p-0 pt-6">
        <ScrollArea ref={scrollAreaRef} className="h-full px-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex items-start gap-3',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-[85%] sm:max-w-[80%] md:max-w-[75%] rounded-lg px-4 py-2 text-sm',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                 <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="max-w-sm rounded-lg px-4 py-2 text-sm md:max-w-md lg:max-w-lg bg-muted flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    <span>Thinking...</span>
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-6 border-t">
        <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            disabled={isLoading}
            autoComplete="off"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

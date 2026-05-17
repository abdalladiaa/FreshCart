"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chatbot() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "مرحباً! أنا المساعد الذكي للمتجر. إزاي أقدر أساعدك؟",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    const newMessages = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiMessages = newMessages.filter(
        (msg, index) => !(index === 0 && msg.role === "assistant")
      );

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.result },
        ]);

        if (data.navigateTo) {
          setTimeout(() => {
            router.push(data.navigateTo);
            setIsOpen(false); // Close chat after navigating
          }, 1500);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `API Error: ${data.error}` },
        ]);
      }
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Fetch Error: ${error.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" dir="rtl">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl mb-4 w-[90vw] sm:w-[380px] h-[500px] max-h-[80vh] flex flex-col overflow-hidden transition-all duration-300 transform origin-bottom-right">
          {/* Header */}
          <div className="bg-zinc-900 dark:bg-zinc-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              <div>
                <h3 className="font-semibold text-sm">المساعد الذكي</h3>
                <p className="text-xs text-zinc-300">متواجد للرد على أسئلتك</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-zinc-50 dark:bg-zinc-900/50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-2 max-w-[85%] ${
                  message.role === "user" ? "mr-auto flex-row-reverse" : "ml-auto"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${message.role === "user" ? "bg-zinc-200 dark:bg-zinc-700" : "bg-zinc-900 dark:bg-zinc-800 text-white"}`}>
                  {message.role === "user" ? <User className="w-4 h-4 text-zinc-600 dark:text-zinc-300" /> : <Bot className="w-4 h-4" />}
                </div>
                <div
                  className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    message.role === "user"
                      ? "bg-zinc-900 text-white rounded-tl-none dark:bg-zinc-100 dark:text-zinc-900"
                      : "bg-white text-zinc-800 border border-zinc-100 rounded-tr-none dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 max-w-[85%] ml-auto">
                <div className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-zinc-800 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 p-4 rounded-2xl rounded-tr-none shadow-sm flex gap-1 items-center h-10">
                  <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800"
          >
            <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800 rounded-full border border-zinc-200 dark:border-zinc-700 p-1 pr-4 focus-within:ring-2 focus-within:ring-zinc-900 dark:focus-within:ring-zinc-100 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اكتب رسالتك..."
                className="flex-1 bg-transparent text-sm outline-none text-zinc-800 dark:text-zinc-100 placeholder-zinc-400"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 disabled:opacity-50 transition-opacity shrink-0"
              >
                <Send className="w-4 h-4 rtl:-scale-x-100" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-zinc-900/20 dark:focus:ring-zinc-100/20"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}

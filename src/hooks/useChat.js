import { useState, useCallback } from "react";

export const useChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "مرحباً بك في StrategizeIT! 🗺️ أنا مساعدك الذكي للخرائط. يمكنني مساعدتك في العثور على أقرب الحوادث مكانياً أو زمنياً. جاري تحميل البيانات...",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = useCallback((sender, text, metadata = {}) => {
    const newMessage = {
      id: Date.now() + Math.random(),
      sender,
      text,
      timestamp: new Date(),
      ...metadata,
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  return {
    messages,
    input,
    setInput,
    loading,
    setLoading,
    isTyping,
    setIsTyping,
    addMessage,
    setMessages // إضافة setMessages للاستخدام في clearChat
  };
};
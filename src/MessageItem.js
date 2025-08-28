import React from "react";
import { Bot, User } from "lucide-react";

const MessageItem = ({ message }) => {
  return (
    <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-sm lg:max-w-md xl:max-w-lg rounded-2xl px-4 py-3 shadow-sm ${
          message.sender === "user"
            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
            : message.type === "system"
            ? "bg-yellow-50 border border-yellow-200 text-yellow-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        <div className="flex items-start space-x-2">
          {message.sender === "bot" && (
            <Bot className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-600" />
          )}
          {message.sender === "user" && (
            <User className="w-5 h-5 mt-0.5 flex-shrink-0" />
          )}
          <div className="flex-1">
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.text}
            </div>
            <div
              className={`text-xs mt-1 opacity-70 ${
                message.sender === "user"
                  ? "text-white/80"
                  : "text-gray-500"
              }`}
            >
              {message.timestamp?.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
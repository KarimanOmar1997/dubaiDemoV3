import { Bot, User } from 'lucide-react'
import React from 'react'
import MarkdownMessage from './MarkdownMessage'

const MessageItem = ({ message }) => {
  return (
    <div
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-sm rounded-2xl px-4 py-3 shadow-sm lg:max-w-md xl:max-w-lg ${
          message.sender === 'user'
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
            : message.type === 'system'
              ? 'border border-yellow-200 bg-yellow-50 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
        }`}
      >
        <div className="flex items-start space-x-2">
          {message.sender === 'bot' && (
            <Bot className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
          )}
          {message.sender === 'user' && (
            <User className="mt-0.5 h-5 w-5 flex-shrink-0" />
          )}
          <div className="flex-1">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              <MarkdownMessage markdown={message.text} />
            </div>
            <div
              className={`mt-1 text-xs opacity-70 ${
                message.sender === 'user' ? 'text-white/80' : 'text-gray-500'
              }`}
            >
              {message.timestamp?.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageItem

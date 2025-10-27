import {
  AlertCircle,
  Clock,
  FileText,
  Loader2,
  Map as MapIcon,
  Navigation,
  RefreshCw,
  Zap,
} from 'lucide-react'
import React from 'react'
import InputArea from './InputArea'
import MessageList from './MessageList'

const ChatPanel = ({
  messages,
  input,
  setInput,
  loading,
  connectionStatus,
  activeFeatures,
  mapStats,
  dataProcessingStatus,
  handleUserQuery,
  clearChat,
  isTyping,
}) => {
  const connectionStatusConfig = {
    connecting: {
      color: 'bg-yellow-500',
      text: 'جاري الاتصال...',
      icon: Loader2,
    },
    connected: { color: 'bg-green-500', text: 'متصل', icon: Zap },
    loading: { color: 'bg-blue-500', text: 'جاري التحميل...', icon: Loader2 },
    error: { color: 'bg-red-500', text: 'خطأ في الاتصال', icon: AlertCircle },
  }

  const currentStatus = connectionStatusConfig[connectionStatus]

  return (
    <div className="flex w-2/5 flex-col bg-gray-900 shadow-2xl">
      {/* Header */}
      <div className="bg-gray-800 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
              <img
                src="/ncemaLogoWhite.png"
                alt="NCEMA Logo"
                className="h-6 w-100"
              />
            </div>
            <div>
              <h1 className="font-bold text-xl">Atlas Chatbot</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`h-3 w-3 rounded-full ${currentStatus.color} animate-pulse`}
            ></div>
            <span className="text-sm">{currentStatus.text}</span>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Bar */}
      <div className="border-b bg-gray-800 px-4 py-3">
        <div className="flex items-center justify-between text-gray-400 text-sm">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <MapIcon className="h-4 w-4" />
              <span>تكبير: {mapStats.zoom}</span>
            </span>
            <span className="flex items-center space-x-1">
              <FileText className="h-4 w-4" />
              <span>{mapStats.features} إجمالي</span>
            </span>
            {activeFeatures > 0 && (
              <span className="flex items-center space-x-1 font-medium text-red-400">
                <Navigation className="h-4 w-4" />
                <span>{activeFeatures} معروض</span>
              </span>
            )}
            <span className="flex items-center space-x-1 text-blue-400">
              <Clock className="h-4 w-4" />
              <span>
                {dataProcessingStatus === 'completed'
                  ? 'مكتمل'
                  : dataProcessingStatus === 'loading'
                    ? 'جاري التحميل'
                    : 'متوقف'}
              </span>
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={clearChat}
              className="rounded p-1 hover:bg-gray-700"
              title="مسح النتائج"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <MessageList messages={messages} isTyping={isTyping} />

      {/* Enhanced Input */}
      <InputArea
        input={input}
        setInput={setInput}
        loading={loading}
        handleUserQuery={handleUserQuery} // تأكد أن هذه الدالة معرّفة في المكون الأب
      />
    </div>
  )
}

export default ChatPanel

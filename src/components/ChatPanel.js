import React from "react";
import { 
  MessageCircle, 
  FileText, 
  Clock, 
  Navigation, 
  RefreshCw, 
  Loader2, 
  Zap, 
  AlertCircle,
  Map
} from "lucide-react";
import MessageList from "./MessageList";
import InputArea from "./InputArea";

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
  isTyping
}) => {
  const connectionStatusConfig = {
    connecting: { color: "bg-yellow-500", text: "جاري الاتصال...", icon: Loader2 },
    connected: { color: "bg-green-500", text: "متصل", icon: Zap },
    loading: { color: "bg-blue-500", text: "جاري التحميل...", icon: Loader2 },
    error: { color: "bg-red-500", text: "خطأ في الاتصال", icon: AlertCircle },
  };

  const currentStatus = connectionStatusConfig[connectionStatus];

  return (
    <div className="w-2/5 flex flex-col bg-white shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">StrategizeIT</h1>
              <p className="text-sm opacity-90">مساعد الخرائط الذكي</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${currentStatus.color} animate-pulse`}></div>
            <span className="text-sm">{currentStatus.text}</span>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Bar */}
      <div className="bg-gray-50 px-4 py-3 border-b">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Map className="w-4 h-4" />
              <span>تكبير: {mapStats.zoom}</span>
            </span>
            <span className="flex items-center space-x-1">
              <FileText className="w-4 h-4" />
              <span>{mapStats.features} إجمالي</span>
            </span>
            {activeFeatures > 0 && (
              <span className="flex items-center space-x-1 text-red-600 font-medium">
                <Navigation className="w-4 h-4" />
                <span>{activeFeatures} معروض</span>
              </span>
            )}
            <span className="flex items-center space-x-1 text-blue-600">
              <Clock className="w-4 h-4" />
              <span>{dataProcessingStatus === "completed" ? "مكتمل" : dataProcessingStatus === "loading" ? "جاري التحميل" : "متوقف"}</span>
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={clearChat}
              className="p-1 rounded hover:bg-gray-200"
              title="مسح النتائج"
            >
              <RefreshCw className="w-4 h-4" />
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
  );
};

export default ChatPanel;
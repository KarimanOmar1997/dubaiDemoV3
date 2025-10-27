import {
  AlertTriangle,
  Loader2,
  Search,
  Send,
  Shield,
  Users,
} from 'lucide-react'
import React from 'react'

const InputArea = ({ input, setInput, loading, handleUserQuery }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleUserQuery(input)
    }
  }

  return (
    <div className="border-gray-700 border-t bg-gray-800 p-4">
      <div className="flex items-end space-x-2">
        <div className="relative flex-1">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="max-h-32 min-h-[44px] w-full resize-none rounded-xl border border-gray-600 bg-gray-700 p-3 pr-10 text-white placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            placeholder="أين توجد أكثر الحوادث ذات خطورة عالية، أو أنشئ خريطة حرارية، أو انقر على الخريطة..."
            rows="1"
            disabled={loading}
          />
          <Search className="absolute top-3 right-3 h-5 w-5 text-gray-400" />
        </div>
        <button
          type="button"
          onClick={() => handleUserQuery(input)}
          disabled={loading || !input.trim()}
          className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-3 text-white shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-purple-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? <Loader2 className="h-5 w-5 animate-spin" />
            : <Send className="h-5 w-5" />}
        </button>
      </div>
      <div className="mt-2 flex items-center justify-between text-gray-400 text-xs">
        <span>Enter للإرسال • Shift+Enter للسطر الجديد</span>
        <span>{input.length}/1000</span>
      </div>

      {/* Enhanced Quick Actions with High-Severity Analysis */}
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() =>
            handleUserQuery(
              'أين توجد أكثر الأحداث ذات خطورة عالية في حوادث الطرق'
            )
          }
          className="flex items-center gap-1 rounded-full bg-red-900/30 px-3 py-1 text-red-300 text-xs transition-colors hover:bg-red-900/50"
          disabled={loading}
        >
          <AlertTriangle className="h-3 w-3" />🚨 الحوادث الخطيرة
        </button>
        <button
          type="button"
          onClick={() =>
            handleUserQuery('أقرب 5 حوادث للإحداثيات 25.267699, 55.294676')
          }
          className="rounded-full bg-blue-900/30 px-3 py-1 text-blue-300 text-xs transition-colors hover:bg-blue-900/50"
          disabled={loading}
        >
          📍 بحث تجريبي
        </button>
        <button
          type="button"
          onClick={() => handleUserQuery('أعرض خريطة حرارية للحوادث')}
          className="rounded-full bg-orange-900/30 px-3 py-1 text-orange-300 text-xs transition-colors hover:bg-orange-900/50"
          disabled={loading}
        >
          🔥 خريطة حرارية للحوادث
        </button>
        <button
          type="button"
          onClick={() => handleUserQuery('توزيع السكان')}
          className="flex items-center gap-1 rounded-full bg-teal-900/30 px-3 py-1 text-teal-300 text-xs transition-colors hover:bg-teal-900/50"
          disabled={loading}
        >
          <Users className="h-3 w-3" />
          توزيع السكان
        </button>
        <button
          type="button"
          onClick={() => handleUserQuery('مسح النتائج')}
          className="rounded-full bg-gray-700 px-3 py-1 text-gray-300 text-xs transition-colors hover:bg-gray-600"
          disabled={loading}
        >
          🧹 مسح النتائج
        </button>
        <button
          type="button"
          onClick={() => handleUserQuery('اعرض الكوارث')}
          className="flex items-center gap-1 rounded-full bg-blue-900/30 px-3 py-1 text-blue-300 text-xs transition-colors hover:bg-blue-900/50"
          disabled={loading}
        >
          <AlertTriangle className="h-3 w-3" />
          اعرض الكوارث
        </button>
        <button
          type="button"
          onClick={() =>
            handleUserQuery('اعرض الكوارث وصنّفها بحسب الحالة: مفتوحة ومغلقة')
          }
          className="flex items-center gap-1 rounded-full bg-green-900/30 px-3 py-1 text-green-300 text-xs transition-colors hover:bg-green-900/50"
          disabled={loading}
        >
          <Shield className="h-3 w-3" />
          تصنيف الكوارث حسب الحالة
        </button>
      </div>
    </div>
  )
}

export default InputArea

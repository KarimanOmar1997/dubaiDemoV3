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
    <div className="border-t bg-white p-4">
      <div className="flex items-end space-x-2">
        <div className="relative flex-1">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="max-h-32 min-h-[44px] w-full resize-none rounded-xl border border-gray-300 p-3 pr-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
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
      <div className="mt-2 flex items-center justify-between text-gray-500 text-xs">
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
          className="flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-red-700 text-xs transition-colors hover:bg-red-100"
          disabled={loading}
        >
          <AlertTriangle className="h-3 w-3" />🚨 الحوادث الخطيرة
        </button>
        <button
          type="button"
          onClick={() =>
            handleUserQuery('أقرب 5 حوادث للإحداثيات 25.267699, 55.294676')
          }
          className="rounded-full bg-blue-50 px-3 py-1 text-blue-700 text-xs transition-colors hover:bg-blue-100"
          disabled={loading}
        >
          📍 بحث تجريبي
        </button>
        {/* <button
          onClick={() => handleUserQuery("أقرب 5 حوادث لدبي")}
          className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full hover:bg-green-100 transition-colors"
          disabled={loading}
        >
          🏙️ أقرب حوادث لدبي
        </button> */}
        {/* <button
          onClick={() => handleUserQuery("أقرب حوادث زمنياً لتاريخ 2024-12-30")}
          className="text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-100 transition-colors"
          disabled={loading}
        >
          ⏰ أقرب زمنياً
        </button> */}
        <button
          type="button"
          onClick={() => handleUserQuery('أعرض خريطة حرارية للحوادث')}
          className="rounded-full bg-orange-50 px-3 py-1 text-orange-700 text-xs transition-colors hover:bg-orange-100"
          disabled={loading}
        >
          🔥 خريطة حرارية للحوادث
        </button>
        {/* <button
          onClick={() => handleUserQuery("مستشفيات قريبة في نطاق 5 كم")}
          className="text-xs bg-red-50 text-red-700 px-3 py-1 rounded-full hover:bg-red-100 transition-colors flex items-center gap-1"
          disabled={loading}
        >
          <Building className="w-3 h-3" />
          مستشفيات قريبة
        </button> */}

        {/* <button
          onClick={() => handleUserQuery("مدارس قريبة في نطاق 5 كم")}
          className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors flex items-center gap-1"
          disabled={loading}
        >
          <GraduationCap className="w-3 h-3" />
          مدارس قريبة
        </button> */}

        {/* <button
          onClick={() => handleUserQuery("نقاط الإخلاء أو التجمع القريبة في نطاق 5 كم")}
          className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full hover:bg-green-100 transition-colors flex items-center gap-1"
          disabled={loading}
        >
          <Shield className="w-3 h-3" />
          نقاط الإخلاء/التجمع
        </button> */}
        {/* <button
          onClick={() => handleUserQuery("الموارد القريبة ضمن نطاق 5 كم")}
          className="text-xs bg-gray-50 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-1"
          disabled={loading}
        >
          🧭 الموارد القريبة
        </button> */}
        <button
          type="button"
          onClick={() => handleUserQuery('توزيع السكان')}
          className="flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1 text-teal-700 text-xs transition-colors hover:bg-teal-100"
          disabled={loading}
        >
          <Users className="h-3 w-3" />
          توزيع السكان
        </button>
        <button
          type="button"
          onClick={() => handleUserQuery('مسح النتائج')}
          className="rounded-full bg-gray-50 px-3 py-1 text-gray-700 text-xs transition-colors hover:bg-gray-100"
          disabled={loading}
        >
          🧹 مسح النتائج
        </button>
        <button
          type="button"
          onClick={() => handleUserQuery('اعرض الكوارث')}
          className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-blue-700 text-xs transition-colors hover:bg-blue-100"
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
          className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-green-700 text-xs transition-colors hover:bg-green-100"
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

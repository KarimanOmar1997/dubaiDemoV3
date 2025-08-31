import React from "react";
import { Search, Send, Loader2, AlertTriangle, Building, GraduationCap, Shield, Users } from "lucide-react";

const InputArea = ({ input, setInput, loading, handleUserQuery }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleUserQuery(input);
    }
  };

  return (
    <div className="p-4 border-t bg-white">
      <div className="flex items-end space-x-2">
        <div className="flex-1 relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full p-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[44px] max-h-32"
            placeholder="أين توجد أكثر الحوادث ذات خطورة عالية، أو أنشئ خريطة حرارية، أو انقر على الخريطة..."
            rows="1"
            disabled={loading}
          />
          <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
        </div>
        <button
          onClick={() => handleUserQuery(input)}
          disabled={loading || !input.trim()}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-xl hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
      <div className="text-xs text-gray-500 mt-2 flex justify-between items-center">
        <span>Enter للإرسال • Shift+Enter للسطر الجديد</span>
        <span>{input.length}/1000</span>
      </div>
      
      {/* Enhanced Quick Actions with High-Severity Analysis */}
      <div className="flex flex-wrap gap-2 mt-3">
        <button
          onClick={() => handleUserQuery("أين توجد أكثر الأحداث ذات خطورة عالية في حوادث الطرق")}
          className="text-xs bg-red-50 text-red-700 px-3 py-1 rounded-full hover:bg-red-100 transition-colors flex items-center gap-1"
          disabled={loading}
        >
          <AlertTriangle className="w-3 h-3" />
          🚨 الحوادث الخطيرة
        </button>
        <button
          onClick={() => handleUserQuery("أقرب 5 حوادث للإحداثيات 25.267699, 55.294676")}
          className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
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
          onClick={() => handleUserQuery("أعرض خريطة حرارية للحوادث")}
          className="text-xs bg-orange-50 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-100 transition-colors"
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
          onClick={() => handleUserQuery("توزيع السكان")}
          className="text-xs bg-teal-50 text-teal-700 px-3 py-1 rounded-full hover:bg-teal-100 transition-colors flex items-center gap-1"
          disabled={loading}
        >
          <Users className="w-3 h-3" />
          توزيع السكان
        </button>
        <button
          onClick={() => handleUserQuery("مسح النتائج")}
          className="text-xs bg-gray-50 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-100 transition-colors"
          disabled={loading}
        >
          🧹 مسح النتائج
        </button>
        <button
          onClick={() => handleUserQuery("اعرض الكوارث")}
          className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors flex items-center gap-1"
          disabled={loading}
        >
          <AlertTriangle className="w-3 h-3" />
          اعرض الكوارث
        </button>
        <button
          onClick={() => handleUserQuery("اعرض الكوارث وصنّفها بحسب الحالة: مفتوحة ومغلقة")}
          className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full hover:bg-green-100 transition-colors flex items-center gap-1"
          disabled={loading}
        >
          <Shield className="w-3 h-3" />
          تصنيف الكوارث حسب الحالة
        </button>
      </div>
      
    </div>
  );
};

export default InputArea;
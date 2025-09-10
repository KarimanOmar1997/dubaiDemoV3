// Chatbot.jsx
import React, { useState } from 'react';
import { useOllamaChat } from './useOllamaChat';

function Chatbot() {
  const [prompt, setPrompt] = useState('');
  const { response, loading, error, sendPrompt } = useOllamaChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      sendPrompt(prompt);
      setPrompt('');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          Send
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {response && (
        <div className="p-4 bg-gray-100 rounded shadow">
          <strong>AI:</strong> {response}
        </div>
      )}
    </div>
  );
}

export default Chatbot;

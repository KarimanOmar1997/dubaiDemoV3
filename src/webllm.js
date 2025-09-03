// WebLLMChatbot.jsx
import React, { useEffect, useState } from 'react';
import { Chat } from '@mlc-ai/web-llm';

function WebLLMChatbot() {
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const chatInstance = await Chat.create({
          model: 'Llama-2-7b-chat-hf-q4f16_1',  // Load model during create
        });
        setChat(chatInstance);
      } catch (err) {
        console.error('Failed to initialize WebLLM:', err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || !chat) return;

    const newEntry = { role: 'user', content: prompt };
    setResponses((prev) => [...prev, newEntry]);
    setIsGenerating(true);

    try {
      const replyText = await chat.generate(prompt);  // Generate the response
      const aiEntry = { role: 'assistant', content: replyText };
      setResponses((prev) => [...prev, aiEntry]);
    } catch (err) {
      console.error('Error generating:', err);
      setResponses((prev) => [...prev, { role: 'assistant', content: 'Error generating response.' }]);
    }

    setPrompt('');
    setIsGenerating(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">WebLLM Chatbot (Runs in Browser!)</h2>

      {loading ? (
        <p>Loading model, please wait...</p>
      ) : (
        <>
          <div className="mb-4 h-64 overflow-y-auto bg-gray-100 p-2 rounded">
            {responses.map((res, idx) => (
              <div key={idx} className={`mb-2 ${res.role === 'user' ? 'text-right' : 'text-left'}`}>
                <strong>{res.role === 'user' ? 'You' : 'AI'}:</strong> {res.content}
              </div>
            ))}
            {isGenerating && <p>AI is typing...</p>}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 p-2 border rounded"
              disabled={isGenerating}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={isGenerating}
            >
              Send
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default WebLLMChatbot;

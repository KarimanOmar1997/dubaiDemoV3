import React, { useState, useEffect } from 'react';

export default function SimpleRAGChat() {
  const [dataChunks, setDataChunks] = useState([]);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! Ask me about company data.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Load data from file when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/data.json');  // 👈 make sure the file is in /public/data.json
        const json = await res.json();
        setDataChunks(json);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    fetchData();
  }, []);

  const addMessage = (sender, text) => {
    setMessages(prev => [...prev, { sender, text }]);
  };

  const handleUserInput = async () => {
    if (!input.trim()) return;
    const userText = input.trim();
    addMessage('user', userText);
    setInput('');
    setLoading(true);

    // 1️⃣ Find the top 2 most relevant chunks
    const ranked = dataChunks
      .map(chunk => ({
        chunk,
        score: simpleSimilarity(userText, chunk),
      }))
      .sort((a, b) => b.score - a.score)
      .filter(item => item.score > 0)
      .slice(0, 2);

    const context = ranked.map(r => r.chunk).join('\n');

    // 2️⃣ Call LLM
    await realLLM(userText, context);
    setLoading(false);
  };

  const realLLM = async (question, context) => {
    const res = await fetch('http://172.189.56.93:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        prompt: `Use the following context to answer the question:\n\n${context}\n\nQuestion: ${question}`,
        stream: true
      }),
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let fullText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.trim().split('\n');
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const json = JSON.parse(line);
          if (json.response) {
            fullText += json.response;

            setMessages(prev => {
              const last = prev[prev.length - 1];
              if (last.sender === 'bot') {
                return [
                  ...prev.slice(0, -1),
                  { sender: 'bot', text: last.text + json.response },
                ];
              } else {
                return [...prev, { sender: 'bot', text: json.response }];
              }
            });
          }
        } catch (e) {
          console.error('Error parsing JSON:', e, line);
        }
      }
    }

    console.log('Full text collected:', fullText);
    return fullText || 'Sorry, no response.';
  };

  // 🔧 String similarity (keep as is)
  function simpleSimilarity(query, chunk) {
    const qWords = query.toLowerCase().split(/\W+/);
    const cWords = chunk.toLowerCase().split(/\W+/);
    const common = qWords.filter(word => cWords.includes(word));
    return common.length;
  }

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <h2 className="text-xl font-bold mb-2">🗺️ Frontend RAG Chat (from File)</h2>
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-md max-w-lg ${
              m.sender === 'bot' ? 'bg-green-200' : 'bg-blue-200 ml-auto'
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border rounded-l-md"
          placeholder="Ask about company data..."
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-r-md"
          onClick={handleUserInput}
          disabled={loading}
        >
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

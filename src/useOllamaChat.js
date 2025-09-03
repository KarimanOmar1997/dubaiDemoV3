// useOllamaChat.js
import { useState } from 'react';

export function useOllamaChat(model = 'llama3') {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendPrompt = async (prompt) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://135.222.40.6:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          prompt,
          stream: false, // you can enable streaming if you like
        }),
      });

      const data = await res.json();
      setResponse(data.response || 'No response received.');
    } catch (err) {
      console.error('Ollama error:', err);
      setError('Failed to fetch from local LLM.');
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, sendPrompt };
}

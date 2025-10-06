// Chatbot.jsx
import React, { useState } from 'react'
import { useOllamaChat } from './useOllamaChat'

function Chatbot() {
  const [prompt, setPrompt] = useState('')
  const { response, loading, error, sendPrompt } = useOllamaChat()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (prompt.trim()) {
      sendPrompt(prompt)
      setPrompt('')
    }
  }

  return (
    <div className="mx-auto max-w-md p-4">
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 rounded border p-2"
        />
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white"
          disabled={loading}
        >
          Send
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {response && (
        <div className="rounded bg-gray-100 p-4 shadow">
          <strong>AI:</strong> {response}
        </div>
      )}
    </div>
  )
}

export default Chatbot

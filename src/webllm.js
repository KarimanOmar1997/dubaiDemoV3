// WebLLMChatbot.jsx

import { Chat } from '@mlc-ai/web-llm'
import React, { useEffect, useState } from 'react'

function WebLLMChatbot() {
  const [chat, setChat] = useState(null)
  const [loading, setLoading] = useState(true)
  const [prompt, setPrompt] = useState('')
  const [responses, setResponses] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    const init = async () => {
      try {
        const chatInstance = await Chat.create({
          model: 'Llama-2-7b-chat-hf-q4f16_1', // Load model during create
        })
        setChat(chatInstance)
      } catch (err) {
        console.error('Failed to initialize WebLLM:', err)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!prompt.trim() || !chat) return

    const newEntry = { role: 'user', content: prompt }
    setResponses((prev) => [...prev, newEntry])
    setIsGenerating(true)

    try {
      const replyText = await chat.generate(prompt) // Generate the response
      const aiEntry = { role: 'assistant', content: replyText }
      setResponses((prev) => [...prev, aiEntry])
    } catch (err) {
      console.error('Error generating:', err)
      setResponses((prev) => [
        ...prev,
        { role: 'assistant', content: 'Error generating response.' },
      ])
    }

    setPrompt('')
    setIsGenerating(false)
  }

  return (
    <div className="mx-auto max-w-md p-4">
      <h2 className="mb-4 font-bold text-xl">
        WebLLM Chatbot (Runs in Browser!)
      </h2>

      {loading
        ? <p>Loading model, please wait...</p>
        : <>
            <div className="mb-4 h-64 overflow-y-auto rounded bg-gray-100 p-2">
              {responses.map((res, idx) => (
                <div
                  key={idx}
                  className={`mb-2 ${res.role === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <strong>{res.role === 'user' ? 'You' : 'AI'}:</strong>{' '}
                  {res.content}
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
                className="flex-1 rounded border p-2"
                disabled={isGenerating}
              />
              <button
                type="submit"
                className="rounded·bg-blue-500·px-4·py-2·text-white"
                disabled={isGenerating}
              >
                Send
              </button>
            </form>
          </>}
    </div>
  )
}

export default WebLLMChatbot

import MapView from '@arcgis/core/views/MapView'
import WebMap from '@arcgis/core/WebMap'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import '@arcgis/core/assets/esri/themes/light/main.css'
import esriConfig from '@arcgis/core/config'

esriConfig.apiKey = 'YOUR_API_KEY' // Replace with your valid ESRI API Key

export default function GeoChatBotApp() {
  const mapDiv = useRef(null)
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! Ask me about a location or click on the map.' },
  ])
  const [input, setInput] = useState('')

  const addMessage = useCallback((sender, text) => {
    setMessages((prev) => [...prev, { sender, text }])
  }, [])

  const fetchOllama = useCallback(async (prompt) => {
    const callOllama = async () => {
      try {
        await fetch(
          'https://apiexbot.harvestguard.ai/api/external/ollama/chat',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: 'llama3',
              messages: [{ role: 'user', content: prompt }],
            }),
          }
        )
      } catch (err) {
        console.error('Ollama error:', err)
        return 'There was an error fetching data from AI.'
      }
    }
    const res = await callOllama()

    const reader = res.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let fullText = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const chunk = decoder.decode(value)
      // Optional: parse each line if you want to stream to UI
      const lines = chunk.trim().split('\n')
      for (const line of lines) {
        if (!line) continue
        const data = JSON.parse(line)
        fullText += data.message?.content || ''
      }
    }
    return fullText || 'Sorry, no response.'
  }, [])
  useEffect(() => {
    const webmap = new WebMap({ basemap: 'osm' })

    const view = new MapView({
      container: mapDiv.current,
      map: webmap,
      center: [-74.006, 40.7128],
      zoom: 3,
    })

    view.on('click', async (event) => {
      const { longitude, latitude } = event.mapPoint
      const prompt = `Give me information about the location at coordinates: longitude ${longitude}, latitude ${latitude}.`

      addMessage('user', `Tell me about coordinates: ${longitude}, ${latitude}`)

      const reply = await fetchOllama(prompt)
      addMessage('bot', reply)
    })

    return () => view?.destroy()
  }, [addMessage, fetchOllama])

  const handleUserInput = async () => {
    if (!input.trim()) return
    const userText = input.trim()
    addMessage('user', userText)
    setInput('')

    const reply = await fetchOllama(userText)
    addMessage('bot', reply)
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/2 overflow-y-scroll bg-gray-100 p-4">
        <h2 className="mb-2 font-bold text-xl">StrategizeIT</h2>
        <div className="mb-4 space-y-2">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-xs rounded-md p-2 ${
                m.sender === 'bot' ? 'bg-green-200' : 'ml-auto bg-blue-200'
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
            className="flex-grow rounded-l-md border p-2"
            placeholder="Ask about a location..."
          />
          <button
            type="button"
            className="rounded-r-md bg-blue-500 px-4 text-white"
            onClick={handleUserInput}
          >
            Send
          </button>
        </div>
      </div>
      <div className="w-1/2" ref={mapDiv} />
    </div>
  )
}

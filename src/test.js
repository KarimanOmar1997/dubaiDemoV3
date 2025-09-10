import React, { useEffect, useRef, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import "@arcgis/core/assets/esri/themes/light/main.css";
import esriConfig from "@arcgis/core/config";

esriConfig.apiKey = "YOUR_API_KEY"; // Replace with your valid ESRI API Key

export default function GeoChatBotApp() {
  const mapDiv = useRef(null);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! Ask me about a location or click on the map." },
  ]);
  const [input, setInput] = useState("");

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  useEffect(() => {
    const webmap = new WebMap({ basemap: "osm" });

    const view = new MapView({
      container: mapDiv.current,
      map: webmap,
      center: [-74.006, 40.7128],
      zoom: 3,
    });

    view.on("click", async (event) => {
      const { longitude, latitude } = event.mapPoint;
      const prompt = `Give me information about the location at coordinates: longitude ${longitude}, latitude ${latitude}.`;

      addMessage("user", `Tell me about coordinates: ${longitude}, ${latitude}`);

      const reply = await fetchOllama(prompt);
      addMessage("bot", reply);
    });

    return () => view && view.destroy();
  }, []);

  const fetchOllama = async (prompt) => {
    try {
      const res = await fetch("https://apiexbot.harvestguard.ai/api/external/ollama/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama3",
          messages: [{ role: "user", content: prompt }],
        }),
      });
  
      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let fullText = '';
  
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        // Optional: parse each line if you want to stream to UI
        const lines = chunk.trim().split("\n");
        for (const line of lines) {
          if (!line) continue;
          const data = JSON.parse(line);
          fullText += data.message?.content || '';
        }
      }
      return fullText || "Sorry, no response.";
    } catch (err) {
      console.error("Ollama error:", err);
      return "There was an error fetching data from AI.";
    }
  };
  

  const handleUserInput = async () => {
    if (!input.trim()) return;
    const userText = input.trim();
    addMessage("user", userText);
    setInput("");

    const reply = await fetchOllama(userText);
    addMessage("bot", reply);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-4 bg-gray-100 overflow-y-scroll">
        <h2 className="text-xl font-bold mb-2">StrategizeIT</h2>
        <div className="space-y-2 mb-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-2 rounded-md max-w-xs ${
                m.sender === "bot" ? "bg-green-200" : "bg-blue-200 ml-auto"
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
            placeholder="Ask about a location..."
          />
          <button
            className="bg-blue-500 text-white px-4 rounded-r-md"
            onClick={handleUserInput}
          >
            Send
          </button>
        </div>
      </div>
      <div className="w-1/2" ref={mapDiv} />
    </div>
  );
}

// $ curl -X POST "http://localhost:3001/api/test-llm" -H "Content-Type: application/json" -d '{"prompt": "Hi"}'   


import { OllamaLLM } from "./LLMs/Ollama.ts";

function getDataLLM() {
    const apiUrl = "http://135.222.40.6:11434";
    const model = "qwen3:4b";
    const sysPrompt = "You are a helpful assistant that provides geojson data based on user queries. If there are no relevant data, respond with 'No data available'. If there is some confusion, ask for clarification.";
    const temperature = 0;
    const tools = [{
        type: "function",
        function: {
            name: "GetPopulation",
            description: "Return the population data"
        }
    }];

    return new OllamaLLM(apiUrl, model, sysPrompt, temperature, tools);
}


export async function getData(prompt) {
    const dataLLM = getDataLLM();
    const messages = [{
        role: "user",
        content: prompt
    }];
    const response = await dataLLM.chat(messages);
    console.log("LLM response:", response);
    return response;
}


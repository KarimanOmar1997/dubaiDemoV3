export class OllamaLLM {
    constructor(apiUrl, model, sysPrompt, temperature, tools) {
        this.apiUrl = apiUrl;
        this.model = model;
        this.sysPrompt = sysPrompt;
        this.temperature = temperature;
        this.tools = tools;
    }

    async chat(messages) {
        const requestBody = {
            model: this.model,
            messages: [
                {
                    role: 'system',
                    content: this.sysPrompt,
                },
                ...messages
            ],
            stream: false,
            options: {
                temperature: this.temperature,
            },
            tools: this.tools
        };
        const response = await fetch(`${this.apiUrl}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });
        if (!response.ok) {
            throw new Error(`Ollama API error: ${response.text() || response.statusText}`);
        }
        const data = await response.json();
        const tool_calls = data.message.tool_calls;
        const content = data.message.content;

        const regex = /<think>([\s\S]*?)<\/think>([\s\S]*)/;

        const match = content.match(regex);

        if (match) {
            const think = match[1].trim();
            const message = match[2].trim();
            return { tool_calls, think, message };
        }

        return { tool_calls, message: content };
    }
}
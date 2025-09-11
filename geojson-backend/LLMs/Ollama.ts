import type BaseLLM from './BaseLLM';
import type { Message } from './BaseLLM';


export class OllamaLLM implements BaseLLM {
    private apiUrl: string;
    private model: string;
    private sysPrompt: string;
    private temperature: number;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    private tools: any;

    constructor(apiUrl: string, model: string, sysPrompt: string, temperature: number, tools: any) {
        this.apiUrl = apiUrl;
        this.model = model;
        this.sysPrompt = sysPrompt;
        this.temperature = temperature;
        this.tools = tools;
    }

    async chat(messages: Message[]): Promise<string> {
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
        // console.log("Ollama request body:", requestBody);
        const response = await fetch(`${this.apiUrl}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        return data;
    }
}
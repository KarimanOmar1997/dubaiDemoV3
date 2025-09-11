
export type Message = {
    role: 'user' | 'system' | 'assistant' | 'tool';
    content: string;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    tool_calls?: Array<{ name: string; args: any }>;
};

interface BaseLLM {
  chat(messages: Message[]): Promise<string>;
}

export default BaseLLM;
export type Message = {
    role: 'user' | 'system' | 'assistant' | 'tool';
    content: string;
    tool_calls?: Array<{ name: string; args: any }>;
};

interface BaseLLM {
    chat(messages: Message[]): Promise<{
        message: string;
        tool_calls?: Array<{ name: string; args: any }>;
        think?: string;
    }>;
}

export default BaseLLM;
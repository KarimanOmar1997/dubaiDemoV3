export class CohereLLM {
  constructor(model, sysPrompt, temperature, tools, apiKey) {
    this.apiUrl = 'https://api.cohere.ai'
    this.model = model
    this.sysPrompt = sysPrompt
    this.temperature = temperature
    this.tools = tools.map((t) => {
      if (!t.function.parameters) {
        return t
      }
      for (const k in t.function.parameters.properties) {
        const v = t.function.parameters.properties[k]
        if (v.type === 'float') {
          v.type = 'number'
        }
        if (v.type === 'int') {
          v.type = 'integer'
        }
      }
      return t
    })
    this.apiKey = apiKey
  }

  async chat(messages) {
    const sanitizedMessages = [
      { role: 'system', content: this.sysPrompt },
      ...messages.map((m) => {
        const out = { role: m.role }
        if (m.role === 'tool') {
          out.tool_call_id = m.tool_call_id
          out.content = m.content
        } else if (m.role === 'assistant' && m.tool_calls?.length > 0) {
          out.tool_calls = m.tool_calls
        } else {
          out.content = m.content
        }
        return out
      }),
    ]
    const requestBody = {
      model: this.model,
      messages: sanitizedMessages,
      temperature: this.temperature,
      stream: false,
    }
    if (this.tools && Array.isArray(this.tools) && this.tools.length > 0) {
      requestBody.tools = this.tools
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 300_000) // 300 sec

    const url = `${this.apiUrl}/v2/chat`
    console.log('Cohere request body:', requestBody)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    })
    clearTimeout(timeout)

    if (!response.ok) {
      throw new Error(
        `Cohere API error: ${(await response.text()) || response.statusText}`
      )
    }

    const data = await response.json()

    console.log('Cohere response data:', data)

    const finish_reason = data?.finish_reason
    if (finish_reason === 'COMPLETE') {
      const content = data?.message?.content
      const { text, thinking } = content.reduce(
        (acc, c) => {
          if (c.type === 'text') {
            acc.text += c.text
          } else if (c.type === 'thinking') {
            acc.thinking += c.text
          }
          return acc
        },
        { text: '', thinking: '' }
      )
      return {
        tool_calls: null,
        think: thinking || null,
        message: text || null,
      }
    }
    if (finish_reason === 'TOOL_CALL') {
      const tool_calls = data?.message?.tool_calls
      const tool_plan = data?.message?.tool_plan
      return {
        tool_calls: tool_calls || null,
        think: tool_plan || null,
        message: null,
      }
    }
    throw new Error(
      `Cohere API returned unknown finish_reason: ${finish_reason}`
    )
  }
}

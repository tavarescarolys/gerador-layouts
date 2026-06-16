const PROMPT = (briefing: string) => `Você é redator criativo da marca Atlântida Moda Praia, uma marca brasileira de beachwear com voz solar, oceânica e confiante.

Gere EXATAMENTE 3 opções de texto curto para post de feed/story do Instagram, baseado no briefing abaixo.

REGRAS:
- Máximo 15 palavras por opção
- Português brasileiro, tom sensorial e acolhedor
- Pode usar all-caps para palavras de impacto
- Sem emoji
- Cada opção em uma linha separada
- Sem numeração, sem aspas, sem explicações — apenas os 3 textos

Briefing: ${briefing}`

export async function generateTexts(briefing: string, apiKey: string): Promise<string[]> {
  if (!apiKey) throw new Error('Chave da API Groq não configurada. Abra as configurações.')

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: PROMPT(briefing) }],
      temperature: 0.9,
      max_tokens: 256,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    const msg = (err as { error?: { message?: string } }).error?.message ?? `Erro ${res.status}`
    throw new Error(msg)
  }

  const data = await res.json() as {
    choices: Array<{ message: { content: string } }>
  }
  const raw = data.choices[0]?.message?.content ?? ''
  const lines = raw.split('\n').map((l: string) => l.trim()).filter(Boolean).slice(0, 3)

  if (lines.length === 0) throw new Error('Resposta vazia da IA. Tente novamente.')
  return lines
}

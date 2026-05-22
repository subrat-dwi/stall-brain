const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = 'llama-3.3-70b-versatile'

const SYSTEM_PROMPT = `You are Bazaar Brain, an AI demand forecaster for street vendors in Lucknow.
Respond ONLY in the following JSON format, with no markdown and no extra keys:
{
  "summary": "one sentence overview of today",
  "expectedCustomers": number,
  "peakHours": "e.g. 12-2pm and 6-9pm",
  "confidenceLevel": "High" | "Medium" | "Low",
  "confidenceReason": "short reason",
  "procurementList": [
    { "item": "aloo", "quantity": "12 kg", "unit": "kg", "priority": "essential" }
  ],
  "specialAdvice": "English tip || Hindi tip",
  "hindiSummary": "summary in Hindi"
}
Rules:
- specialAdvice must be one actionable tip in English, then "||", then the Hindi version.
- procurementList priorities must be one of: essential, moderate, optional.
- expectedCustomers must be a number (no quotes).
- Do not include any keys beyond the schema.`

function safeParseJson(content) {
  if (!content) return null
  const start = content.indexOf('{')
  const end = content.lastIndexOf('}')
  if (start === -1 || end === -1 || end <= start) return null

  const slice = content.slice(start, end + 1)
  try {
    return JSON.parse(slice)
  } catch (error) {
    return null
  }
}

export async function requestGroqForecast({
  stall,
  items,
  dateLabel,
  dayName,
  weather,
  weatherSignal,
  eventSummary,
  weeklyMultiplier,
  eventMultiplier,
  demandMultiplier,
}) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY
  if (!apiKey || apiKey === 'your_groq_key_here') {
    const error = new Error('MISSING_API_KEY')
    error.code = 'MISSING_API_KEY'
    throw error
  }

  const finalItems = Array.isArray(items) && items.length ? items : stall.items

  const userPrompt = `Stall type: ${stall.name}
Stock items: ${finalItems.join(', ')}
The vendor sells these specific items: ${finalItems.join(', ')}
Generate procurement quantities for each of these exact items only.
Do not add or suggest items outside this list.
Date: ${dateLabel}
Day of week: ${dayName}
Weather: ${weather.temperature}°C, ${weatherSignal.label}
Weather footfall impact: ${weatherSignal.footfallImpact}
Weather note: ${weatherSignal.recommendation}
Events today: ${eventSummary}
Event impact multiplier: ${eventMultiplier}
Weekly footfall multiplier for ${dayName}: ${weeklyMultiplier}
Combined demand multiplier (weather x event x day-of-week): ${demandMultiplier}
Return precise procurement quantities and peak hours for Hazratganj, Lucknow.`

  const response = await fetch(GROQ_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.4,
      max_tokens: 700,
    }),
  })

  if (!response.ok) {
    const error = new Error('GROQ_REQUEST_FAILED')
    error.code = 'GROQ_REQUEST_FAILED'
    throw error
  }

  const data = await response.json()
  const content = data?.choices?.[0]?.message?.content
  const parsed = safeParseJson(content)

  if (!parsed) {
    const error = new Error('GROQ_PARSE_FAILED')
    error.code = 'GROQ_PARSE_FAILED'
    throw error
  }

  return parsed
}

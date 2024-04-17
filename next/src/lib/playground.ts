import Instructor from '@instructor-ai/instructor'
import OpenAI from 'openai'
import { z } from 'zod'

const oai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? undefined,
  organization: process.env.OPENAI_ORG_ID ?? undefined,
})

const client = Instructor({
  client: oai,
  mode: 'FUNCTIONS',
})

const SentimentSchema = z.object({
  // Description will be used in the prompt
  sentiment: z
    .literal('positive')
    .or(z.literal('negative').or(z.literal('neutral')))
    .describe('The sentiment of the text'),
})

async function main() {
  const sentiment = await client.chat.completions.create({
    messages: [
      { role: 'system', content: 'What is the sentiment of the given text?' },
      { role: 'user', content: 'The instructor llm library is awesome!' },
    ],
    model: 'gpt-3.5-turbo',
    response_model: {
      schema: SentimentSchema,
      name: 'Sentiment',
    },
  })

  console.log({ sentiment })
}

main()

import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
export const runtime = 'edge';
 
export async function POST(req: Request) {
  const { prompt, question } = await req.json();
 
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'user',
        content: `
        O seu trabalho é criar queries em SQL a partir de um schema SQL abaixo.
  
        Schema SQL:
        """
        ${prompt}
        """
  
        A partir do schema acima, escreva uma query SQL a partir da solicitação abaixo.
        Me retorne some o SQL, nada além disso.
  
        Solicitação: ${question}
      `
      }
    ]
  });

  const stream = OpenAIStream(response);
  
  return new StreamingTextResponse(stream);
}
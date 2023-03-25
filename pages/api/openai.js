import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export async function generateResponse(prompt) {
  const messages = [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: prompt },
  ];

  const response = await axios.post(
    OPENAI_API_URL,
    {
      model: 'gpt-3.5-turbo', // Change the model if needed
      messages: messages,
      max_tokens: 50,
      n: 1,
      temperature: 0.7,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
    }
  );

  return response.data.choices[0].message.content.trim();
}

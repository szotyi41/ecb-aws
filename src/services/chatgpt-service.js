import axios from 'axios';

export const getChatGPTResponse = async (title) => {
  const openAiApiKey = process.env.OPENAI_API_KEY;
  const prompt = `Generate a detailed description for the following title: "${title}"`;
  
  const response = await axios.post(
    'https://api.openai.com/v1/completions',
    {
      model: 'text-davinci-003',
      prompt,
      max_tokens: 150,
    },
    {
      headers: {
        'Authorization': `Bearer ${openAiApiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data.choices[0].text.trim();
};

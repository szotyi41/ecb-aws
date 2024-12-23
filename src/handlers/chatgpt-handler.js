import { Creative } from '../db/models/creative.js';
import { getChatGPTResponse } from '../services/chatgpt-service.js';

export const chatGptHandler = async (event) => {
  try {
    const { id } = JSON.parse(event.body);
    const creative = await Creative.findByPk(id);

    if (!creative) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Creative not found' }),
      };
    }

    const chatgptResponse = await getChatGPTResponse(creative.title);
    creative.chatgpt_response = chatgptResponse;
    await creative.save();

    return {
      statusCode: 200,
      body: JSON.stringify(creative),
    };
  } catch (error) {
    console.error('ChatGPT handler error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};

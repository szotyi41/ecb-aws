import { Creative } from '../db/models/creative.js';
import { getTitleFromURL } from '../services/puppeteerService.js';

export const handler = async (event) => {
  try {
    const { action, data } = JSON.parse(event.body);

    if (action === 'saveTitle') {
      const { url } = data;
      const title = await getTitleFromURL(url);
      const creative = await Creative.create({ title, url });
      return {
        statusCode: 200,
        body: JSON.stringify(creative),
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid action' }),
    };
  } catch (error) {
    console.error('Handler error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};

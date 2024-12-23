import { Creative } from '../db/models/creative.js';
import { getTitleFromURL } from '../services/puppeteer-service.js';

export const saveTitleHandler = async (event) => {
  try {
    const { url } = JSON.parse(event.body);
    const title = await getTitleFromURL(url);
    const creative = await Creative.create({ title, url });
    return {
      statusCode: 200,
      body: JSON.stringify(creative),
    };
  } catch (error) {
    console.error('Save title handler error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};

import { connectToDatabase } from './db/connection.js';
import { sequelize } from './db/connection.js';
import { saveTitleHandler } from './handlers/save-title-handler.js';
import { chatGptHandler } from './handlers/chatgpt-handler.js';

(async () => {
  await connectToDatabase();
  // Sync models
  await sequelize.sync({ alter: true });
})();

export const saveTitle = saveTitleHandler;
export const chatGpt = chatGptHandler;

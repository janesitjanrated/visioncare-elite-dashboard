import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import { logger } from './utils/logger';

const PORT = process.env.PORT ? Number(process.env.PORT) : 9999;

app.listen(PORT, () => {
  logger.info(`Backend server running on port ${PORT}`);
});

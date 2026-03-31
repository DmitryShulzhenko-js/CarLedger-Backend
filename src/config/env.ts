import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 3001,
  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || '',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || '',
  ACCESS_TOKEN_EXPIRES: Number(process.env.ACCESS_TOKEN_EXPIRES) || 900, // 15 минут по умолчанию
  REFRESH_TOKEN_EXPIRES: Number(process.env.REFRESH_TOKEN_EXPIRES) || 604800, // 7 дней по умолчанию

  DB_NAME: process.env.DB_NAME || '',
  DB_USER: process.env.DB_USER || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_DIALECT: process.env.DB_DIALECT || 'postgres',

  TIMEZONE: process.env.TIMEZONE || 'UTC',
};
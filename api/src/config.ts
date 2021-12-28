import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../.env` });

export const config = {
  port: process.env.PORT || 5000,
  dbPassowrd: process.env.DB_PASSWORD || 'postgres',
  dbUser: process.env.DB_USER || 'postgres',
  dbName: process.env.DB_USER || 'postgres',
};

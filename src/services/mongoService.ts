import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let db: Db | null = null;

export const connectToDatabase = async (): Promise<Db> => {
  if (db) return db;

  const client = new MongoClient(process.env.MONGO_URI as string);
  await client.connect();
  db = client.db(); // Use the default database from the connection string
  console.log('Connected to MongoDB');
  return db;
};
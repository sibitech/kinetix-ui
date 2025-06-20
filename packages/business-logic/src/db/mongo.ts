// MongoDB adapter for patient management
import { MongoClient, Db, Collection } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const dbName = process.env.MONGODB_DB || 'kinetix';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getMongoDb(): Promise<Db> {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
  }
  return db!;
}

export async function getPatientsCollection(): Promise<Collection> {
  const db = await getMongoDb();
  return db.collection('patients');
}

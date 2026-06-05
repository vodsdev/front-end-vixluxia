import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URL;
const dbName = process.env.DB_NAME && process.env.DB_NAME !== 'your_database_name'
  ? process.env.DB_NAME
  : 'vixluxia';

let client;

function getClientPromise() {
  if (!uri) {
    throw new Error('MONGO_URL is not configured');
  }

  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }

  return global._mongoClientPromise;
}

export async function getDb() {
  const c = await getClientPromise();
  return c.db(dbName);
}

export default getClientPromise;

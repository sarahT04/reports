import { hash, compare } from 'bcryptjs';
import { MongoClient, ObjectId } from 'mongodb';

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return client;
}

export function stringToObjectId(str) {
  return ObjectId(str);
}

export const toDate = (str) => new Date(str).toLocaleString("en-US", { year: 'numeric', month: 'short', day: 'numeric', hour12: false, hour: '2-digit', minute: '2-digit' });

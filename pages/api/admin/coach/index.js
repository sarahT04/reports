import { connectToDatabase } from "../../../../utils/utils";

async function getAllClass(req, res) {
  if (req.method !== 'GET') {
    return res.status(404);
  }

  const client = await connectToDatabase();
  const result = await client.db('reports').collection('coaches').find().toArray();
  client.close();
  return res.status(201).json({ result })
}

export default getAllClass;

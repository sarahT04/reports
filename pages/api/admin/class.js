import { connectToDatabase } from "../../../utils/utils";

async function postNewClass(req, res) {
  // Makes sure it's post
  if (req.method !== 'POST') {
    return res.status(404);
  }
  // Get body data
  const { class_name } = req.body;
  // Connect to coaches database
  const client = await connectToDatabase();
  const reportDb = client.db('reports')
  const result = await reportDb.collection('classes').insertOne({
    class_name
  });
  // If succesful
  if (result) {
    client.close();
    return res.status(201).json({ message: 'Created Report!' });
  }
  // And not.
  client.close();
  return res.status(404).json({ message: 'Error happened.' });
}

export default postNewClass;

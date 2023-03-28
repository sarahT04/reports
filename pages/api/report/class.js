import { connectToDatabase, stringToObjectId } from "../../../utils/utils";


async function postReportToDatabase(req, res) {
  // Makes sure it's post
  if (req.method !== 'POST') {
    return res.status(404);
  }
  // Get body data
  const data = req.body;
  const { kelas, tanggal, komentar, coach_id } = data;
  // Connect to coaches database
  const client = await connectToDatabase();
  const reportDb = client.db('reports')
  const result = await reportDb.collection('class_report').insertOne({
    kelas: stringToObjectId(kelas), tanggal, komentar, coach_id: stringToObjectId(coach_id),
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

export default postReportToDatabase;

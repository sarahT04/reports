import { DB_LIMIT } from '../../../utils/constants';
import { connectToDatabase, stringToObjectId, toDate } from '../../../utils/utils';

async function getAllReportsFromCoach(req, res) {
  // Makes sure it's post
  if (req.method !== 'POST') {
    return res.status(404);
  }
  // Connect to coaches database
  const client = await connectToDatabase();
  let classDb = await client.db('classes').collection('class_name').find().toArray();
  classDb = classDb.reduce((obj, item) => (obj[item._id] = item.class_name, obj), {});
  // Get body data
  const data = req.body;
  let { coach_id, report_id } = data;
  let resultDb;
  if (report_id === undefined) {
    // Find the id of the last data
    resultDb = await client.db('reports').collection('report').find({}, { coach_id: stringToObjectId(coach_id) }).sort({ _id: -1 }).limit(DB_LIMIT).toArray();
  } else {
    // Find the data by coach id and last known id for sorting purposes
    resultDb = await client.db('reports').collection('report').find({
      $and: [
        { coach_id: stringToObjectId(coach_id) },
        { _id: { $lt: stringToObjectId(report_id) } },
      ]
    }).sort({ _id: -1 }).limit(DB_LIMIT).toArray();
  }
  // Find the first data
  const firstData = await client.db('reports').collection('report').find({}).sort({ _id: -1 }).limit(1).toArray();
  if (stringToObjectId(report_id) === firstData[0]._id) {
    return res.status(201).json({ result: undefined });
  }
  // Need to modify some of the data. The kelas data becomes its actual name instead of ObjectId, and the date becomes a readable format.
  const result = resultDb.map((db) => {
    const ph = { ...db };
    ph.kelas = classDb[db.kelas]
    ph.tanggal = toDate(db.tanggal)
    return ph;
  })
  // If succesful send the result
  if (result) {
    client.close();
    return res.status(201).json({ result });
  }
  // And not.
  client.close();
  return res.status(404).json({ message: 'Error happened.' });
}

export default getAllReportsFromCoach;

import { DB_LIMIT } from '../../../utils/constants';
import { connectToDatabase, stringToObjectId, toDate } from '../../../utils/utils';

async function getAllSharedReports(req, res) {
  // Makes sure it's post
  if (req.method !== 'POST') {
    return res.status(404);
  }
  // Connect to coaches database
  const client = await connectToDatabase();
  // Makes the object for each id
  let classDb = await client.db('classes').collection('class_name').find().toArray();
  classDb = classDb.reduce((obj, item) => (obj[item._id] = item.class_name, obj), {});
  // Get body data
  const data = req.body;
  let { coach_id, report_id } = data;
  let resultDb;
  if (report_id === undefined) {
    // Find the id of the last data
    resultDb = await client.db('shared_with').collection('reports').find({ coach_ids: stringToObjectId(coach_id) }).sort({ _id: -1 }).limit(DB_LIMIT).toArray();
  } else {
    // Find the data by coach id and last known id for sorting purposes
    resultDb = await client.db('shared_with').collection('reports').find({
      $and: [
        { coach_ids: stringToObjectId(coach_id) },
        { _id: { $lt: stringToObjectId(report_id) } },
      ]
    }).sort({ _id: -1 }).limit(DB_LIMIT).toArray();
  }
  // ^ Correct database retrieval.
  
  return;
  // It's gonna be an array of report_id
  const firstElementId = resultDb[0].report_id;
  let reportDb = await client.db('shared_with').collection('reports').aggregate(
    {
      $lookup: {
        from: 'reports',
        localField: 'report_id',
        foreignField: 'report.report_id',
        as: ''
      }
    }
  )
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

export default getAllSharedReports;

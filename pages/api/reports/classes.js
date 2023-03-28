import { DB_LIMIT } from '../../../utils/constants'
import { connectToDatabase, stringToObjectId } from '../../../utils/utils';

async function getAllReportsFromCoach(req, res) {
  // Makes sure it's post
  if (req.method !== 'POST') {
    return res.status(404);
  }
  // Connect to coaches database
  const client = await connectToDatabase();
  // Get body data
  const data = req.body;
  const { situation, class_id: classId, report_id: reportId } = data;
  let resultDb;
  // Checking if we are at the end of the query or at the start of the query.
  if (reportId !== undefined) {
    const firstData = await client.db('reports').collection('student_report')
      .find({ _id: stringToObjectId(classId) }).sort({ _id: -1 }).limit(1).toArray();
    if (stringToObjectId(reportId) === firstData[0]._id) {
      return res.status(201).json({ result: undefined });
    }
  }
  // Find the id of the last data
  resultDb = await client.db('reports').collection('student_report').aggregate([
    {
      $lookup: {
        from: 'classes',
        localField: 'kelas',
        foreignField: '_id',
        as: 'class_name'
      }
    },
    {
      $lookup: {
        from: 'coaches',
        localField: 'coach_id',
        foreignField: '_id',
        as: 'coaches_data'
      }
    },
    { $unwind: '$class_name' },
    { $unwind: '$coaches_data' },
    {
      $match:
        reportId !== undefined
          ? { '_id': { $lt: stringToObjectId(reportId) } }
          : { 'class_name._id': stringToObjectId(classId), '_id': { $lt: stringToObjectId(reportId) } }
    },
    {
      $project: {
        _id: 1,
        'class_name.class_name': 1,
        'coaches_data.name': 1,
        tanggal: 1,
        komentar: 1,
      }
    },
    {
      $sort: { _id: -1 },
    },
    { $limit: DB_LIMIT }
  ]).toArray();
  // If succesful send the result
  if (resultDb) {
    client.close();
    return res.status(201).json({ result: resultDb });
  }
  // And not.
  client.close();
  return res.status(404).json({ message: 'Error happened.' });
}

export default getAllReportsFromCoach;

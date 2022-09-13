import { DB_LIMIT } from '../../../utils/constants'
import { connectToDatabase, stringToObjectId, toDate } from '../../../utils/utils';

async function getAllReportsFromCoach(req, res) {
  // Makes sure it's post
  if (req.method !== 'POST') {
    return res.status(404);
  }
  // Connect to coaches database
  const client = await connectToDatabase();
  // Get body data
  const data = req.body;
  let { coach_id: coachId, report_id: reportId } = data;
  let resultDb;

  if (reportId === undefined) {
    // Find the id of the last data
    resultDb = await client.db('reports').collection('report').aggregate([
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
        $match: {
          'coaches_data._id': stringToObjectId(coachId),
        },
      },
      {
        $project: {
          _id: 1,
          'class_name.class_name': 1,
          'coaches_data.name': 1,
          nama: 1,
          tanggal: 1,
          komentar: 1,
          kelemahan: 1,
          kekuatan: 1,
          peningkatan: 1,
        }
      },
      {
        $sort: { _id: -1 },
      },
      { $limit: DB_LIMIT }
    ]).toArray();

  } else {
    // If the report id given is the first data, then it's the end of query.
    const firstData = await client.db('reports').collection('report').find({}).sort({ _id: -1 }).limit(1).toArray();
    if (stringToObjectId(reportId) === firstData[0]._id) {
      return res.status(201).json({ result: undefined });
    }
    // Find the data by coach id and last known id for sorting purposes
    resultDb = await client.db('reports').collection('report').aggregate([
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
        $match: {
          $and: [
            { 'coaches_data._id': stringToObjectId(coachId) },
            { '_id': { $lt: stringToObjectId(reportId) } },
          ]
        },
      },
      {
        $project: {
          _id: 1,
          'class_name.class_name': 1,
          'coaches_data.name': 1,
          nama: 1,
          tanggal: 1,
          komentar: 1,
          kelemahan: 1,
          kekuatan: 1,
          peningkatan: 1,
        }
      },
      {
        $sort: { _id: -1 },
      },
      { $limit: DB_LIMIT }
    ]).toArray();
  }

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

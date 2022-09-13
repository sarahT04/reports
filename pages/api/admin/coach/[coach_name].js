import { connectToDatabase, toDate } from "../../../../utils/utils";
import { DB_LIMIT } from '../../../../utils/constants';

async function getReportFromClassName(req, res) {
  // Makes sure it's post
  if (req.method !== 'GET') {
    return res.status(404);
  }
  const { coach_name: coachName } = req.query;
  let { report_id: reportId } = data;
  // Connect to coaches database
  const client = await connectToDatabase();
  const classDb = await client.db('reports').collection('report').aggregate([
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
        'coaches_data.name': coachName,
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
    { $limit: DB_LIMIT * 4 }
  ]).toArray();
  client.close();
  console.log(classDb)
  return res.status(201).json({ result: classDb })
}

export default getReportFromClassName;

// TODO: get class name and make it have the same logic as see-report. 
// Load more function 3x DB_limit, also descending. 
// Can also pick by DATE.

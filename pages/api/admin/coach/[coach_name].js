import { connectToDatabase, toDate } from "../../../../utils/utils";
import { DB_LIMIT } from '../../../../utils/constants';

async function getReportFromClassName(req, res) {
  // Makes sure it's post
  if (req.method !== 'GET') {
    return res.status(404);
  }
  const { coach_name: coachName } = req.query;
  // Connect to coaches database
  const client = await connectToDatabase();
  let coachDb = await client.db('coaches').collection('coach_data').find().toArray();
  coachDb = coachDb.reduce((obj, item) => (obj[item.name] = item._id, obj), {})
  const classDb = await client.db('reports').collection('report').find({ 'coach_id': coachDb[coachName] }).limit(DB_LIMIT * 3)
    .sort({ _id: -1 }).toArray();
  if (classDb.length === 0) {
    return res.status(404).json({ message: 'No query found' })
  }
  let classesNameDb = await client.db('classes').collection('class_name').find().toArray();
  classesNameDb = classesNameDb.reduce((obj, item) => (obj[item._id] = item.class_name, obj), {})
  const result = classDb.map((db) => {
    const ph = { ...db };
    ph.kelas = classesNameDb[db.kelas];
    ph.tanggal = toDate(db.tanggal);
    ph.coachName = coachDb[db.coach_id]
    return ph;
  })
  client.close();
  return res.status(201).json({ result })
}

export default getReportFromClassName;

// TODO: get class name and make it have the same logic as see-report. 
// Load more function 3x DB_limit, also descending. 
// Can also pick by DATE.

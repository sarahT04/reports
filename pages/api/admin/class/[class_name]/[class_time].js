import { connectToDatabase, toDate } from "../../../../../utils/utils";

async function getReportFromClassName(req, res) {
  // Makes sure it's post
  if (req.method !== 'GET') {
    return res.status(404);
  }
  const { class_name: className, class_time: classTime } = req.query;
  // Connect to coaches database
  const client = await connectToDatabase();
  let coachDb = await client.db('coaches').collection('coach_data').find().toArray();
  coachDb = coachDb.reduce((obj, item) => (obj[item._id] = item.name, obj), {})
  let classesNameDb = await client.db('classes').collection('class_name').find().toArray();
  classesNameDb = classesNameDb.reduce((obj, item) => (obj[item.class_name] = item._id, obj), {})
  const classDb = await client.db('reports').collection('report').find({ $and: [{ kelas: classesNameDb[className] }, { tanggal: classTime }] })
    .sort({ _id: -1 }).toArray();
  const result = classDb.map((db) => {
    const ph = { ...db };
    ph.kelas = className;
    ph.tanggal = toDate(classTime);
    ph.coachName = coachDb[ph.coach_id]
    return ph;
  })
  client.close();
  return res.status(201).json({ result })
}

export default getReportFromClassName;

// TODO: get class name and make it have the same logic as see-report. 
// Load more function 3x DB_limit, also descending. 
// Can also pick by DATE.

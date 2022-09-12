import { connectToDatabase, toDate } from "../../../../utils/utils";

async function getAllClass(req, res) {
  if (req.method !== 'GET') {
    return res.status(404);
  }

  const client = await connectToDatabase();
  let classDb = await client.db('reports').collection('report').aggregate([
    {
      $lookup: {
        from: 'classes',
        localField: 'kelas',
        foreignField: '_id',
        as: 'class_name'
      }
    },
    {
      $unwind: '$class_name'
    },
    {
      "$group": {
        "_id": "$tanggal",
        "first": {
          "$first": "$$ROOT"
        }
      }
    }, {
      "$project": {
        "_id": '$first.tanggal',
        "tanggal": "$first.tanggal",
        "kelas": "$first.class_name.class_name",
      }
    }
  ]).toArray();  
  client.close();
  return res.status(201).json({ result: classDb })
}

export default getAllClass;

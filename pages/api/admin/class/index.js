import { connectToDatabase, toDate } from "../../../../utils/utils";

async function getAllClass(req, res) {
  if (req.method !== 'GET') {
    return res.status(404);
  }

  const client = await connectToDatabase();
  let classNameDb = await client.db('classes').collection('class_name').find().toArray();
  classNameDb = classNameDb.reduce((obj, item) => (obj[item._id] = item.class_name, obj), {});
  let classDb = await client.db('reports').collection('report').aggregate([{
    "$group": {
      "_id": "$tanggal",
      "first": {
        "$first": "$$ROOT"
      }
    }
  }, {
    "$project": {
      "_id": 0,
      "tanggal": "$first.tanggal",
      "kelas": "$first.kelas",
    }
  }]).toArray();
  classDb = classDb.map((datas) => ({ _id: datas.tanggal, kelas: classNameDb[datas.kelas], tanggal: toDate(datas.tanggal) })).reverse();
  client.close();
  return res.status(201).json({ result: classDb })
}

export default getAllClass;

import SeeReport from "../../../components/SeeReport";
import { connectToDatabase } from "../../../utils/utils";

export default function AdminClassReport({ class_id }) {
  return (
    <SeeReport class_id={class_id} apiType="classes" />
  )
}

export async function getServerSideProps(ctx) {
  const { class_name } = ctx.params
  const client = await connectToDatabase();
  const db = client.db("reports");
  const classDb = await db.collection('classes').find({ 'class_name': class_name }).toArray();
  client.close();
  return {
    props: {
      class_id: JSON.parse(JSON.stringify(classDb[0]['_id'])),
    }
  }
}

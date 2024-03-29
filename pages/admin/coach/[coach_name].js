import SeeReport from "../../../components/SeeReport";
import { connectToDatabase } from "../../../utils/utils";

export default function AdminClassReport({ coach_id }) {
  return (
    <SeeReport coach_id={coach_id} apiType="students" />
  )
}

export async function getServerSideProps(ctx) {
  const { coach_name } = ctx.params
  const client = await connectToDatabase();
  const db = client.db("reports");
  const coachDb = await db.collection('coaches').find({ 'name': coach_name }).toArray();
  client.close();
  return {
    props: {
      coach_id: JSON.parse(JSON.stringify(coachDb[0]['_id'])),
    }
  }
}

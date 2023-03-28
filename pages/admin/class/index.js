import { Button, Grid, GridItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { connectToDatabase } from "../../../utils/utils";

export default function ClassReports({ classDatas }) {
  const router = useRouter();
  return (
    <>
      <Button mb={10} onClick={() => router.push('/admin/class/situation')}>Situation</Button>
      <Grid templateColumns='repeat(1, 1fr)' gap={4}>
        {classDatas.length === 0
          ? null
          : classDatas.map((classData) => (
            <GridItem key={classData._id} h='10'>
              <Button onClick={() => router.push('/admin/class/' + classData.class_name)}>{classData.class_name}</Button>
            </GridItem>
          ))}
      </Grid>
    </>
  )
}

export async function getServerSideProps() {
  const client = await connectToDatabase();
  const db = client.db("reports");
  const classes = await db.collection('classes').find().toArray();
  client.close();
  return {
    props: {
      classDatas: JSON.parse(JSON.stringify(classes)),
    }
  }
}

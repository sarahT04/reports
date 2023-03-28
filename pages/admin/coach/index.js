import { Button, Center, Flex, Grid, GridItem, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { connectToDatabase } from "../../../utils/utils";

export default function CoachNamesReports({ coachDatas }) {
  const router = useRouter();

  return (
    <Grid templateColumns='repeat(2, 1fr)' gap={10}>
      {coachDatas.length === 0
        ? <Center>No coaches found</Center>
        : coachDatas.map((coachData) => (
          <GridItem key={coachData._id} w='100%' h='10'>
            <Button onClick={() => router.push('/admin/coach/' + coachData.name)}>{coachData.name}</Button>
          </GridItem>
        ))}
    </Grid>
  )
}

export async function getServerSideProps() {
  const client = await connectToDatabase();
  const db = client.db("reports");
  const coaches = await db.collection('coaches').find().toArray();
  client.close();
  return {
    props: {
      coachDatas: JSON.parse(JSON.stringify(coaches)),
    }
  }
}

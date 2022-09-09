import { Button, Flex, Grid, GridItem, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ClassReports() {
  const [loading, setLoading] = useState(true);
  const [coachDatas, setClassDatas] = useState([]);
  const router = useRouter();
  const { pathname } = router;
  useEffect(() => {
    const getDatas = async () => {
      const { data } = await axios.get(
        '/api/admin/coach'
      )
      setClassDatas(data.result);
      setLoading(false);
      return data.result;
    }
    getDatas();
  }, [])
  return (
    <div>
      {loading
        ? <Flex justify="center" align="center">
          <Spinner />
        </Flex>
        : <Grid templateColumns='repeat(2, 1fr)' gap={10}>
          {coachDatas.map((coachData) => (
            <GridItem key={coachData._id} w='100%' h='10'>
              <Button onClick={() => router.push(pathname + '/' + coachData.name)}>{coachData.name}</Button>
            </GridItem>
          ))}
        </Grid>}
    </div>
  )
}

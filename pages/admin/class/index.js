import { Button, Flex, Grid, GridItem, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ClassReports() {
  const [loading, setLoading] = useState(true);
  const [classDatas, setClassDatas] = useState([]);
  const router = useRouter();
  const { pathname } = router;
  useEffect(() => {
    const getDatas = async () => {
      const { data } = await axios.get(
        '/api/admin/class'
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
        : <Grid templateColumns='repeat(1, 1fr)' gap={4}>
          {classDatas.map((classData) => (
            <GridItem key={classData._id} h='10'>
              <Button onClick={() => router.push(pathname + '/' + classData.kelas + '/' + classData._id)}>{classData.kelas}, {classData.tanggal}</Button>
            </GridItem>
          ))}
        </Grid>}
    </div>
  )
}

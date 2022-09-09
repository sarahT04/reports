import { Box, Flex, Spinner, Center } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ReportData from '../../../../components/ReportData';

export default function AdminClassReport() {
  const [loading, setLoading] = useState(true);
  const [classDatas, setClassDatas] = useState([]);
  const router = useRouter();
  const { class_name: className, class_time: classTime } = router.query;
  useEffect(() => {
    const getDatas = async () => {
      const { data } = await axios.get(
        `/api/admin/class/${className}/${classTime}/`
      )
      setClassDatas(data.result);
      setLoading(false);
      return data.result;
    }
    getDatas();
  }, [])
  return (
    <Box>
      {loading
        ? <Flex justify="center" align="center">
          <Spinner />
        </Flex>
        : <> {classDatas.map((data) => <ReportData key={data._id} {...data} />)}
          <Center>End of query</Center>
        </>
      }
    </Box>
  )
}

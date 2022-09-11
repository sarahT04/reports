import { Box, Flex, Spinner, Center } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ReportData from "../../../components/ReportData";

export default function AdminClassReport() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [classDatas, setClassDatas] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    const { coach_name: coachName } = router.query;
    const getDatas = async () => {
      try {
        const { data } = await axios.get(
          `/api/admin/coach/${coachName}/`
        )
        console.log(data.result);
        setClassDatas(data.result);
        setLoading(false);
        return data.result;
      } catch (e) {
        setError(true);
        setLoading(false);
        setMessage(e.response.data.message)
        return false;
      }
    }
    getDatas();
  }, [router.isReady])
  return (
    <Box>
      {loading
        ? <Flex justify="center" align="center">
          <Spinner />
        </Flex>
        : error
          ? <Center>{message}</Center>
          : <>
            {classDatas.map((data) => <ReportData key={data._id} {...data} />)}
            <Center>End of query</Center>
          </>
      }
    </Box>
  )
}

import { Box, Flex, Spinner, Center, Select } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ReportData from '../../../../components/ReportData';

export default function AdminClassReport() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [classDatas, setClassDatas] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const getDatas = async () => {
      if (!router.isReady) return;
      const { class_name: className, class_time: classTime } = router.query;
      try {
        const { data } = await axios.get(
          `/api/admin/class/${className}/${classTime}/`
        )
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
            {classDatas.map((data) => <ReportData key={data._id} {...data} coachName={data.coaches_data.name} kelas={data.class_name.class_name} />)}
            <Center>Akhir dari Data</Center>
          </>
      }
    </Box>
  )
}


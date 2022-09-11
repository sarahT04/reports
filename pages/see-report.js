import axios from 'axios';
import { Spinner, Button, Text, Flex } from '@chakra-ui/react'
import { useContext } from 'react';
import { useInfiniteQuery } from 'react-query';
import { UserIdContext } from '../components/Wrapper';
import ReportData from '../components/ReportData';

export default function SeeReport() {
  const coach_id = useContext(UserIdContext).userId
  const { data: reportsData, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(['reports-data'], async ({ pageParam = undefined }) => {
    const { data } = await axios.post(
      'api/report/see-report/',
      { coach_id, report_id: pageParam },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    return data.result
  }, {
    getNextPageParam: (lastPage) => {
      if (lastPage.length !== 0) {
        const data = lastPage[lastPage.length - 1]._id;
        return data;
      }
      return undefined
    }
  });
  return (
    <div>
      {
        isError
          ? <Text>Sorry, an error occured.</Text>
          : isLoading
            ? <Flex justify="center" align="center">
              <Spinner />
            </Flex>
            : <>
              {reportsData.pages.map(page => (page.map((reportData) => <ReportData key={reportData._id} {...reportData} />)))}
              <Button mt={4} isLoading={isLoading || isFetchingNextPage} isDisabled={!hasNextPage}
                onClick={fetchNextPage}>{hasNextPage ? 'Load More' : 'End of Query'}</Button>
            </>
      }
    </div>
  )
}

import axios from 'axios';
import { Spinner, Button, Text, Flex } from '@chakra-ui/react'
import { useState, useContext } from 'react';
import { useQueryClient, useInfiniteQuery } from 'react-query';
import { UserIdContext } from '../components/Wrapper';
import ReportData from '../components/ReportData';
import { DB_LIMIT } from '../utils/constants';

export default function SeeReport() {
  const queryClient = useQueryClient();
  const prevData = queryClient.getQueryData('reports-data')?.pages
  const prevDataId = prevData !== undefined && prevData[prevData.length - 1][DB_LIMIT]?._id
  const coach_id = useContext(UserIdContext).userId
  const { data: reportsData, isLoading, isError, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(['reports-data'], async ({ pageParam = undefined }) => {
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
    getNextPageParam: (lastPage, pages) => prevDataId
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
              <Button mt={4} isLoading={isLoading || isFetchingNextPage} onClick={fetchNextPage}>Load More</Button>
            </>
      }
    </div>
  )
}

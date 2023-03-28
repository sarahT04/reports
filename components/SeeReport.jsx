import axios from 'axios';
import { Spinner, Button, Flex, Center } from '@chakra-ui/react'
import { useInfiniteQuery } from 'react-query';
import ReportData from './ReportData';

export default function SeeReport({ coach_id, class_id, apiType }) {
    const { data: reportsData, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(['reports-data'], async ({ pageParam = undefined }) => {
        const { data } = await axios.post(
            `/api/reports/${apiType}`,
            { class_id, coach_id, report_id: pageParam },
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
        <>
            {
                isError
                    ? <Center>Sorry, an error occured.</Center>
                    : isLoading
                        ? <Flex justify="center" align="center">
                            <Spinner />
                        </Flex>
                        : <>
                            {reportsData.pages.map(page => (
                                page.map((reportData, idx) =>
                                    <ReportData
                                        key={reportData._id + idx}
                                        {...reportData}
                                        coachName={reportData.coaches_data.name}
                                        kelas={reportData.class_name.class_name} />)))}
                            <Center>{hasNextPage ? null : 'No data'}</Center>
                            <Button mt={4} isLoading={isLoading || isFetchingNextPage} isDisabled={!hasNextPage}
                                onClick={fetchNextPage}>{hasNextPage ? 'See more' : 'End of data'}</Button>
                        </>
            }
        </>
    )
}
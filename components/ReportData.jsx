import { Flex, Heading, Text, Box, Center } from "@chakra-ui/react/";
import { toDate } from "../utils/frontend";

export default function ReportData({ kelas, coachName, nama, tanggal, komentar, kelemahan, kekuatan, peningkatan }) {
    const others = [kelemahan, kekuatan, peningkatan];
    return (
        <Box mb={4} boxShadow='sm' p='6' rounded='md' bg='gray.700'>
            <Heading><Center>{kelas}</Center></Heading>
            <Flex mb={2} justify='space-between' color='grey' fontSize='xs'>
                <Text>oleh {coachName}</Text>
                <Text>{toDate(tanggal)}</Text>
            </Flex>
            <Text fontSize='xl'>{nama}</Text>
            <Text color='gray.200'>Komentar: {komentar}</Text>
            {
                others.map((other) => other === null ? null : <Text color='gray.200'>{other}</Text>)
            }
        </Box>
    )
}
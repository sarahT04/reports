import { Flex, Heading, Text, Box } from "@chakra-ui/react/";
import { toDate } from "../utils/frontend";

export default function ReportData({ kelas, coachName, nama, tanggal, komentar, kelemahan, kekuatan, peningkatan }) {
    const others = [kelemahan, kekuatan, peningkatan];
    return (
        <Box mb={4} border='1px' p={4} borderRadius={4}>
            <Flex justify={'space-between'}>
                <Heading>{kelas}</Heading>
                <Text>{coachName}</Text>
                <Text>{toDate(tanggal)}</Text>
            </Flex>
            <Text>{nama}</Text>
            <Text>Komentar: {komentar}</Text>
            {
                others.map((other) => other === null ? null : <Text>{other}</Text>)
            }
        </Box>
    )
}
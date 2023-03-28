import { Flex, Heading, Text, Box, Center, useColorMode } from "@chakra-ui/react/";
import { toDate } from "../utils/frontend";

const colorPallete = {
    'flex': {
        'light': 'blackAlpha.600',
        'dark': 'grey'
    },
    'text': {
        'light': 'black',
        'dark': 'gray.200'
    },
    'box': {
        'light': 'blackAlpha.200',
        'dark': 'gray.700'
    }
}

export default function ReportData({ kelas, coachName, nama, tanggal, komentar, kelemahan, kekuatan, peningkatan }) {
    const others = [kelemahan, kekuatan, peningkatan];
    const { colorMode } = useColorMode()
    return (
        <Box mb={4} boxShadow='sm' p='6' rounded='md' bg={colorPallete.box[colorMode]}>
            <Heading><Center>{kelas}</Center></Heading>
            <Flex mb={2} justify='space-between' color={colorPallete.flex[colorMode]} fontSize='xs'>
                <Text>by {coachName}</Text>
                <Text>{toDate(tanggal)}</Text>
            </Flex>
            <Text fontSize='xl'>{nama}</Text>
            <Text color={colorPallete.text[colorMode]}>{komentar}</Text>
            {
                others.map((other) =>
                    other === undefined
                        ? null
                        : other === null
                            ? null
                            : <Text key={other.slice(0, 5)} color={colorPallete.text[colorMode]}>{other}</Text>
                )
            }
        </Box>
    )
}
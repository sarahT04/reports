// TODO:
// By class -> slug = class/[class_name]

import { Box, Button, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";


// By coach -> slug = coach/[coach_username]
export default function AdminIndex() {
  const router = useRouter();
  const { pathname } = router;
  return (
    <Box>
      <Heading mb={4} size='md' as='h3'>Lihat Laporan dari:</Heading>
      <Button mb={4} onClick={() => router.push(pathname + '/class/')}>Kelas</Button>
      <Button onClick={() => router.push(pathname + '/coach/')}>Coach</Button>
    </Box>
  )
}

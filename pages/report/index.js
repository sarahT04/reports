// TODO:
// By class -> slug = class/[class_name]

import { Box, Button, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

// By coach -> slug = coach/[coach_username]
export default function AdminIndex() {
  const router = useRouter();
  return (
    <Box>
      <Heading mb={4} size='md' as='h3'>Create Reports for:</Heading>
      <Button mb={4} onClick={() => router.push('/report/students')}>Student</Button>
      <Button mb={20} onClick={() => router.push('/report/class')}>Class</Button>
    </Box>
  )
}

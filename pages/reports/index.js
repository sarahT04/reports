import { Box, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Reports() {
  const router = useRouter();
  return (
    <Box>
      <Text mb={4}>Milik saya:</Text>
      <Button mb={4} onClick={() => router.push('/reports/me')}>Milik saya</Button>
      <Text mb={4}>Dibagikan dengan saya:</Text>
      <Button mb={4} onClick={() => router.push('/reports/shared')}>Dibagikan dengan saya</Button>
      {}
    </Box>
  )
}

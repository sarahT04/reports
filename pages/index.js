import { Button, Flex, Spinner } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useContext } from 'react';
import { UserIdContext } from "../components/Wrapper";

// TODO: Prettier
export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isAdmin = useContext(UserIdContext).isAdmin;
  return (
    <div>
      {
        loading
          ? <Flex justify="center" align="center">
            <Spinner />
          </Flex>
          : <>
            <Button h={14} mb={4} onClick={() => { setLoading(true); router.push('/report'); }}>Create Reports</Button>
            <Button h={14} mb={4} onClick={() => { setLoading(true); router.push('/reports'); }}>See Reports</Button>
            <Button h={14} mb={4} onClick={() => { signOut() }}>Log out</Button>
            <Button h={14} isDisabled={!isAdmin} onClick={() => { setLoading(true); router.push('/admin'); }}>Admin</Button>
            </>
      }
    </div >
  )
}

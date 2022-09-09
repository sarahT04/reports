import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useContext } from 'react';
import { UserIdContext } from "../components/Wrapper";

// TODO: Prettier
export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const coach_id = useContext(UserIdContext).userId;
  return (
    <div>
      <Button h={14} mb={4} isDisabled={coach_id ? false : true} isLoading={loading} onClick={() => { setLoading(true); router.push('/report'); }}>Report</Button>
      <Button h={14} mb={4} isDisabled={coach_id ? false : true} isLoading={loading} onClick={() => { setLoading(true); router.push('/see-report'); }}>See Reports</Button>
      <Button h={14} mb={4} isDisabled={coach_id ? true : false} isLoading={loading} onClick={() => { setLoading(true); router.push('/authentication'); }}>Authenticate</Button>
      <Button h={14} isDisabled={coach_id ? false : true} isLoading={loading} onClick={() => { setLoading(true); router.push('/admin'); }}>Admin</Button>
    </div>
  )
}

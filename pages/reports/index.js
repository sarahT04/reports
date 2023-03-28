import SeeReport from '../../components/SeeReport';
import { getSession } from 'next-auth/react';

export default function Reports({ coach_id }) {
  return (
    <SeeReport coach_id={coach_id} apiType="students" />
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      coach_id: session.user.id,
      session: session
    },
  }
}

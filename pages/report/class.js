import axios from 'axios';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Select,
  Textarea,
  Button,
  Text,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons'
import { useState, useContext } from 'react';
import { UserIdContext } from '../../components/Wrapper';
import { connectToDatabase } from '../../utils/utils';

export default function CreateCoachReport({ classes }) {
  const coach_id = useContext(UserIdContext).userId;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [kelas, setKelas] = useState(classes[0]._id);
  const [tanggal, setTanggal] = useState('');
  const [komentar, setKomentar] = useState('');
  const handleReportSubmit = async (e) => {
    e.preventDefault();
    const values = {
      coach_id, kelas, tanggal, komentar
    };
    setLoading(true);
    const res = await axios.post(
      '/api/report/class',
      values,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    setLoading(false);
    setMessage(res.data.message);
  }

  return (
    <form onSubmit={handleReportSubmit}>
      <FormControl isRequired isDisabled={loading}>
        <FormLabel>Class:</FormLabel>
        <Flex mb={4}>
          <Select value={kelas} onChange={(e) => { setKelas(e.target.value) }}>
            {
              classes.map((eachClass) => <option key={eachClass._id} value={eachClass._id} >{eachClass.class_name}</option>)
            }
          </Select>
          <Input type="datetime-local" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
        </Flex>
        <FormLabel>Situation:</FormLabel>
        <Textarea placeholder="Explain class situation"
        value={komentar} onChange={(e) => setKomentar(e.target.value)} ></Textarea>
      </FormControl>
      <Button type="submit" colorScheme='teal' isDisabled={!kelas || !tanggal || !komentar}
      rightIcon={<CheckIcon />} isLoading={loading} loadingText='Submitting'>Send</Button>
      <Text mb={4}>{message}</Text>
    </form>
  )
}


export async function getServerSideProps() {
  const client = await connectToDatabase();
  const db = client.db("reports");
  const classes = await db.collection('classes').find().toArray();
  client.close();
  return {
    props: {
      classes: JSON.parse(JSON.stringify(classes)),
    }
  }
}

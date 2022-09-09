import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Select,
  Textarea,
  Button,
  Checkbox,
  Collapse,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { CheckIcon, EditIcon } from '@chakra-ui/icons'
import { useState, useContext } from 'react';
import { UserIdContext } from '../components/Wrapper';
import { connectToDatabase } from '../utils/utils';

function getCurrentDate() {
  let now = new Date();
  now.setSeconds(0, 0);
  now.setHours(now.getHours() + 7);
  return now.toISOString().replace(/:00.000Z/, "");
}

function checkIsEmptyString(str) {
  return str === '' ? null : str;
}

// TODO: Only prettier
export default function CreateReport({ classes }) {
  const coach_id = useContext(UserIdContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { isOpen, onToggle } = useDisclosure();
  const [kelas, setKelas] = useState(classes[0]._id);
  const [tanggal, setTanggal] = useState(getCurrentDate());
  const [nama, setNama] = useState('');
  const [detailKelas, setDetailKelas] = useState('');
  const [komentar, setKomentar] = useState('');
  const [kelemahan, setKelemahan] = useState('');
  const [kekuatan, setKekuatan] = useState('');
  const [peningkatan, setPeningkatan] = useState('');

  const resetHandler = () => {
    const setFunctions = [setNama, setKomentar, setKelemahan, setKekuatan, setPeningkatan, setDetailKelas, setMessage];
    for (let fns of setFunctions) {
      fns('');
    }
  }

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    const values = {
      coach_id, kelas, tanggal, nama, komentar, kelemahan: checkIsEmptyString(kelemahan),
      kekuatan: checkIsEmptyString(kekuatan), peningkatan: checkIsEmptyString(peningkatan),
    };
    setLoading(true);
    const res = await axios.post(
      'api/report/',
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
        <FormLabel >Kelas:</FormLabel>
        <Flex mb={4}>
          <Select value={kelas} onChange={(e) => { setKelas(e.target.value) }}>
            {
              classes.map((eachClass) => <option key={eachClass._id} value={eachClass._id} >{eachClass.class_name}</option>)
            }
          </Select>
          <Input type="datetime-local" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
        </Flex>
        <FormLabel >Nama Murid:</FormLabel>
        <Input value={nama} onChange={(e) => setNama(e.target.value)} mb='4' />
        <FormLabel>Komentar:</FormLabel>
        <Textarea value={komentar} onChange={(e) => setKomentar(e.target.value)} ></Textarea>
        {/* <FormLabel>Detail Kelas:</FormLabel>
        <Textarea value={detailKelas} onChange={(e) => setDetailKelas(e.target.value)} ></Textarea> */}
      </FormControl>
      <Checkbox isChecked={isOpen} onChange={onToggle} mb={4} isDisabled={loading}>Lebih Banyak</Checkbox>
      <Collapse in={isOpen} >
        <FormControl isDisabled={loading}>
          <FormLabel>Kelemahan:</FormLabel>
          <Textarea value={kelemahan} onChange={(e) => setKelemahan(e.target.value)}></Textarea>
          <FormLabel>Kekuatan:</FormLabel>
          <Textarea value={kekuatan} onChange={(e) => setKekuatan(e.target.value)}></Textarea>
          <FormLabel>Yang Bisa Ditingkatkan:</FormLabel>
          <Textarea value={peningkatan} onChange={(e) => setPeningkatan(e.target.value)}></Textarea>
        </FormControl>
      </Collapse>
      <Button type="submit" colorScheme='teal' rightIcon={<CheckIcon />} isLoading={loading} loadingText='Submitting'>Submit</Button>
      <Text mb={4}>{message}</Text>
      <Button onClick={resetHandler} variant='outline' rightIcon={<EditIcon />} colorScheme='red' isDisabled={loading} >Bikin Baru</Button>
    </form>
  )
}

export async function getServerSideProps() {
  const client = await connectToDatabase();
  const db = client.db("classes");
  const classes = await db.collection('class_name').find().toArray();
  client.close();
  return {
    props: {
      classes: JSON.parse(JSON.stringify(classes)),
    }
  }
}

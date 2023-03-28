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
import { UserIdContext } from '../../components/Wrapper';
import { connectToDatabase } from '../../utils/utils';

function checkIsEmptyString(str) {
  return str === '' ? null : str;
}

// TODO: Only prettier
export default function CreateReport({ classes }) {
  const coach_id = useContext(UserIdContext).userId;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [kelas, setKelas] = useState(classes[0]._id);
  const [tanggal, setTanggal] = useState('');
  const [nama, setNama] = useState('');
  const [komentar, setKomentar] = useState('');
  const [kelemahan, setKelemahan] = useState('');
  const [kekuatan, setKekuatan] = useState('');
  const [peningkatan, setPeningkatan] = useState('');
  const { isOpen, onToggle } = useDisclosure();

  const resetHandler = () => {
    const setFunctions = [setNama, setKomentar, setKelemahan, setKekuatan, setPeningkatan, setMessage];
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
      '/api/report/student',
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
        <FormLabel >Student Name:</FormLabel>
        <Input value={nama} onChange={(e) => setNama(e.target.value)} mb='4'
          placeholder="Student name"
        />
        <FormLabel>Comment:</FormLabel>
        <Textarea value={komentar} placeholder="Give comment to your student here"
          onChange={(e) => setKomentar(e.target.value)} ></Textarea>
      </FormControl>
      <Checkbox isChecked={isOpen} onChange={onToggle} mb={4} isDisabled={loading}>Add More Comment</Checkbox>
      <Collapse in={isOpen} >
        <FormControl isDisabled={loading}>
          <FormLabel>Weakness:</FormLabel>
          <Textarea placeholder="What seems to be your student's weakness?"
            value={kelemahan} onChange={(e) => setKelemahan(e.target.value)}></Textarea>
          <FormLabel>Strength:</FormLabel>
          <Textarea placeholder="What seems to be your student's strength?"
            value={kekuatan} onChange={(e) => setKekuatan(e.target.value)}></Textarea>
          <FormLabel>Can be Improved:</FormLabel>
          <Textarea placeholder="What can your student improve?"
            value={peningkatan} onChange={(e) => setPeningkatan(e.target.value)}></Textarea>
        </FormControl>
      </Collapse>
      <Button type="submit" colorScheme='teal' isDisabled={!kelas || !tanggal || !komentar || !nama}
        rightIcon={<CheckIcon />} isLoading={loading} loadingText='Submitting'>Send</Button>
      <Text mb={4}>{message}</Text>
      <Button onClick={resetHandler} variant='outline' rightIcon={<EditIcon />} colorScheme='red' isDisabled={loading} >Create New</Button>
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

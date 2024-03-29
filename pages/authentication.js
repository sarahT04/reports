import {
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Center,
} from '@chakra-ui/react';
import axios from "axios";
import { useState } from "react";
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react';

// TODO: Prettier
export default function Authorize() {
  const router = useRouter();
  const { query } = router;
  const [isLogin, setIsLogin] = useState(query.state === 'login' || !query.state);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [seePassword, setSeePassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        '/api/auth/signup',
        { username, password, name, secretKey },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      setLoading(false);
      setMessage(res.data.message);
    } catch (e) {
      setLoading(false);
      setMessage(e.response.data.message);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn('credentials', {
        redirect: false,
        username,
        password
      });
      if (res.ok) {
        setMessage("Logged in. Redirecting...");
        router.push('/')
        return
      }
      throw new Error(res.error);
    } catch (e) {
      setMessage(e.message);
      setLoading(false);
    }
  }

  return (
    <div>
      <FormControl isRequired isDisabled={loading}>
        <form onSubmit={(e) => { isLogin ? handleLogin(e) : handleSignUp(e) }}>
          <FormLabel>Username:</FormLabel>
          <Input type="text" value={username} placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} />
          <FormLabel>Password:</FormLabel>
          <InputGroup>
            <Input
              pr='4.5rem'
              type={seePassword ? 'text' : 'password'}
              placeholder='Password'
              autoComplete='off'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width='4.5rem'>
              <Button onClick={() => { setSeePassword(!seePassword) }}>
                {seePassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          {isLogin
            ? null
            : <>
              <FormLabel>Name:</FormLabel>
              <Input type="text" value={name} placeholder="Name" onChange={(e) => { setName(e.target.value) }} />
              <FormLabel>Secret Key:</FormLabel>
              <Input type="text" value={secretKey} placeholder="Secret Key" onChange={(e) => { setSecretKey(e.target.value) }} />
            </>
          }
          <Center mb={4}>{message}</Center>
          <Button mb={4} type='submit' disabled={loading}>{isLogin ? "Login" : "Register"}</Button>
          <Button disabled={loading} onClick={() => { setIsLogin(!isLogin); }}>Change to {!isLogin ? "Login" : "Register"}</Button>
        </form>
      </FormControl>
    </div >
  )
}

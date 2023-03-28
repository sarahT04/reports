// TODO:
// By class -> slug = class/[class_name]

import { Box, Button, FormControl, Heading, FormLabel, Input, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogCloseButton, AlertDialogBody, useDisclosure, AlertDialogHeader, AlertDialogFooter, FormHelperText, FormErrorMessage } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { AddIcon } from '@chakra-ui/icons'
import axios from "axios";

// By coach -> slug = coach/[coach_username]
export default function AdminIndex() {
  const [loading, setLoading] = useState(false);
  const [addError, setAddError] = useState(false);
  const [message, setMessage] = useState('')
  const [kelas, setKelas] = useState('');
  const { isOpen, onClose, onOpen } = useDisclosure()
  const cancelRef = useRef()
  const router = useRouter();
  const addClass = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post(
      '/api/admin/class',
      { class_name: kelas },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    ).then((res) => {
      onClose();
      setLoading(false);
      setMessage(res.data.message);
    }).catch((err) => {
      onClose();
      setLoading(false);
      setAddError(err.message)
    })

  }
  return (
    <Box>
      <Heading mb={4} size='md' as='h3'>See reports from:</Heading>
      <Button mb={4} onClick={() => router.push('/admin/coach')}>Coach</Button>
      <Button mb={20} onClick={() => router.push('/admin/class')}>Class</Button>
      <Heading mb={4} size='md' as='h3'>Add Class</Heading>
      <FormControl isRequired isDisabled={loading} isInvalid={addError}>
        <FormLabel>Class name:</FormLabel>
        <Input value={kelas} onChange={(e) => {
          setKelas(e.target.value)
          setMessage('');
        }} mb='4'
          width="sm"
        />
        <Button width="auto" ml="4" mb="1" onClick={onOpen}
          type="button" colorScheme='teal' rightIcon={<AddIcon />}
          isLoading={loading} isDisabled={kelas.length === 0} loadingText='Submitting'>Add</Button>
        {!addError ? (
          <FormHelperText mt={0}>
            {message}
          </FormHelperText>
        ) : (
          <FormErrorMessage mt={0}>{message}</FormErrorMessage>
        )}
      </FormControl>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Add Class?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            You will be adding a class with name: "{kelas}"
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Go Back
            </Button>
            <Button colorScheme='teal' ml={3} type="submit" onClick={addClass}>
              Proceed
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  )
}

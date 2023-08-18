'use client'

import {
  Box,
  Flex,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { useAuthContext } from '@/libs/provider/authContextProvider';
import { login, logout } from '@/libs/firebase/auth';

export default function HeaderPapers() {
  const user = useAuthContext()

  return (
    <Box width={"100%"}>
      <Flex
        height={"20"}
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex flex={{ base: 1 }} justify={{ base: 'start', md: 'start' }}>
          <Button
            as={'a'}
            fontSize={"xx-large"}
            fontWeight={600}
            color={'white'}
            bg={'blue.400'}
            href={'/'}
            _hover={{
              bg: 'blue.400',
            }}>
            IET
          </Button>
        </Flex>
        {user.user && (
          <Flex justify={"flex-end"}>
          <Button
              fontSize={"sm"}
              fontWeight={600}
              variant={"link"}
              onClick={() => {logout()}}
            >
              Sign out
          </Button>
        </Flex>
        )}
        {!user.user && (
          <Flex justify={"flex-end"}>
          <Button
              fontSize={"sm"}
              fontWeight={600}
              onClick={() => {login() }}
              variant={"link"}
            >
              Sign In
          </Button>
        </Flex>
        )}
      </Flex>
    </Box>
  )
}
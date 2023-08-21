'use client'

import { Flex, useColorModeValue } from '@chakra-ui/react'
import { User } from 'firebase/auth'
import { LoginButton, LogoutButton } from './button/userAuthButton'
import Logo from './logo'

export default function HeaderIndex(params: { user: User | null }) {
  return (
    <Flex
      height={'20'}
      width={'100%'}
      bg={useColorModeValue('white', 'gray.800')}
      color={useColorModeValue('gray.600', 'white')}
      minH={'60px'}
      py={{ base: 2 }}
      px={{ base: 4 }}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.900')}
      align={'center'}
    >
      <Flex flex={{ base: 1 }}>
        <Logo />
      </Flex>
      {params.user && (
        <Flex justify={'flex-end'}>
          <LogoutButton />
        </Flex>
      )}
      {!params.user && (
        <Flex justify={'flex-end'}>
          <LoginButton />
        </Flex>
      )}
    </Flex>
  )
}

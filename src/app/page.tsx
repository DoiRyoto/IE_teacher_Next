'use client'

import {
  Container,
  Box,
  Stack,
  Heading,
  Text,
} from '@chakra-ui/react'
import FooterIndex from '../components/footer_index'
import HeaderIndex from '../components/header_index'

import SearchBar from '../components/searchbar'
import { useAuthContext } from '@/lib/provider/authContextProvider'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'

export default function Home() {
  const user = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if(user.user){
      router.push(`/${user.user?.uid}/home`)
    }
  }, [user.user?.uid])

  return (
    <Stack direction={'column'} height="100%">
      <HeaderIndex user={user.user} />
      <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Quickly go back to{' '}
            <Text as={'span'} color={'blue.400'}>
              the bibliography
            </Text>
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'}>
            Survey support system for information engineering researchers who
            want to solve the time-consuming problem of surveying too many
            previous studies.
          </Text>
        </Stack>
        <SearchBar />
      </Container>
      <Box mt={'36'}>
        <FooterIndex />
      </Box>
    </Stack>
  )
}

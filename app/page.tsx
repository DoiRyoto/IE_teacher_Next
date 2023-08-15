"use client"

import { Container } from '@chakra-ui/react'
import HeaderIndex from "./components/header_index"
import { Flex, Input, Box, Stack, Heading, Text, IconButton, Spacer } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import Link from 'next/link'
import LargeWithLogoCentered from './components/footer_index'


export default function Home() {
  const [keyword, setKeyword] = useState('')

  return (
    <Box>
      <Flex direction={"column"} height="100%">
        <HeaderIndex />
        <Container maxW={'5xl'}>
          <Stack
            textAlign={'center'}
            align={'center'}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 20, md: 28 }}>
            <Heading
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}>
              Quickly go back to {' '}
              <Text as={'span'} color={'blue.400'}>
              the bibliography
              </Text>
            </Heading>
            <Text color={'gray.500'} maxW={'3xl'}>
              Survey support system for information engineering researchers who want to solve the time-consuming problem of surveying too many previous studies.
            </Text>
          </Stack>
          <Flex direction={"row"}>
              <Input placeholder='論文タイトルかキーワードを入力してください。' 
                color={'gray.500'} mr={5} _placeholder={{ opacity: 1, color: 'gray.500' }}
                type='text'
                name='keyword'
                value={keyword}
                onChange={(e) => {setKeyword(e.target.value)}}/>
            <Link key={keyword} href={`/search/${keyword}`}>
              <IconButton aria-label='Search database' icon={<SearchIcon />} />
            </Link>
          </Flex>
        </Container>
        <Spacer />
        <Box mt={200}>
          <LargeWithLogoCentered />
        </Box>
      </Flex>
    </Box>
  )
}
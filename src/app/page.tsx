"use client"

import { Container } from '@chakra-ui/react'
import HeaderIndex from "../components/header_index"
import { Flex, Box, Stack, Heading, Text, Spacer } from '@chakra-ui/react'
import LargeWithLogoCentered from '../components/footer_index'
import SearchBar from '../components/searchbar'


export default function Home() {
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
          <SearchBar />
        </Container>
        <Spacer />
        <Box mt={200}>
          <LargeWithLogoCentered />
        </Box>
      </Flex>
    </Box>
  )
}
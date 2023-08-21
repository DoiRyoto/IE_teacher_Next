'use client'

import {
  Box,
  Flex,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import SearchBar from './searchbar'

export default function HeaderPapers() {
  return (
      <Flex
        as="header" position="fixed" backgroundColor="rgba(255, 255, 255, 0.8)" backdropFilter="saturate(180%) blur(5px)" w="100%" zIndex={"sticky"} h={"20"}
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
        <Box width={"60%"}>
          <SearchBar />
        </Box>
      </Flex>
  )
}
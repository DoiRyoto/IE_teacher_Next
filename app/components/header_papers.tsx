'use client'

import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Input,
  IconButton,
  Stack
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import Link from 'next/link'



export default function HeaderIndex() {
  const [keyword, setKeyword] = useState('')
  
  return (
    <Box width={"100%"}>
      <Flex
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
        <Stack direction={"row"} width={"60%"} justify={{ base: 'center', md: 'start' }}>
              <Input placeholder='論文タイトルかキーワードを入力してください。' 
                color={'gray.500'} mr={5} _placeholder={{ opacity: 1, color: 'gray.500' }}
                type='text'
                name='keyword'
                value={keyword}
                onChange={(e) => {setKeyword(e.target.value)}}/>
            <Link key={keyword} href={`/search/${keyword}`}>
              <IconButton aria-label='Search database' icon={<SearchIcon />} />
            </Link>
          </Stack>
      </Flex>
    </Box>
  )
}
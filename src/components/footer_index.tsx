'use client'

import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

export default function LargeWithLogoCentered() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={1} spacing={8}>
          <Stack align={'center'}>
            <ListHeader>Link</ListHeader>
            <Box as="a" href={'https://github.com/DoiRyoto/IE_teacher_Next'}>
              Github
            </Box>
            <Box as="a" href={'https://ie-teacher-geek.vercel.app/'}>
              Original Product
            </Box>
            <Box as="a" href={'https://miro.com/app/board/uXjVM4W_zM4=/'}>
              Miro
            </Box>
            <Box
              as="a"
              href={
                'https://docs.google.com/forms/d/e/1FAIpQLSe9_7O1elUE_3yFz5InsYa9R8sRgS-soVp4E1Jp-iYQYsAdnQ/viewform?usp=sf_link'
              }
            >
              Feedback
            </Box>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            ml: 8,
          }}
        ></Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
          © 2023 情報工学先生 All rights reserved
        </Text>
      </Box>
    </Box>
  )
}

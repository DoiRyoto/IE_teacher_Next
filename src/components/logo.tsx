'use client'

import { Button } from '@chakra-ui/react'

export default function Logo() {
  return (
    <Button
      as={'a'}
      fontSize={'xx-large'}
      fontWeight={600}
      color={'white'}
      bg={'blue.400'}
      href={'/'}
      _hover={{
        bg: 'blue.400',
      }}
    >
      IET
    </Button>
  )
}

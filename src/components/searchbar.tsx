"use client"

import { Input, IconButton, Stack } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useRouter } from 'next/navigation'


export default function SearchBar() {
  const [keyword, setKeyword] = useState('')
  const router = useRouter()

  const pressEnter = (e: any) => {
    if (e.key == "Enter") {
        router.push(`/search/${keyword}`)
    }
  };

  return (
    <Stack direction={"row"}>
        <Input placeholder='論文タイトルかキーワードを入力してください。' 
            color={'gray.500'} mr={5} _placeholder={{ opacity: 1, color: 'gray.500' }}
            type='text'
            name='keyword'
            value={keyword}
            onChange={(e) => {setKeyword(e.target.value)}}
            onKeyDown={(e) => pressEnter(e)} />
        <IconButton aria-label='Search database' icon={<SearchIcon />} onClick={ () => router.push(`/search/${keyword}`) }/>
    </Stack>
  )
}
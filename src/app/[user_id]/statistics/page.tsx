'use client'

import { Box, Stack } from '@chakra-ui/react'
import { ParentSize } from '@visx/responsive'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import MyWordCloud from './myWordCloud'
import { paperData } from '@/app/utils/type'
import HeaderPapers from '@/components/header_papers'
import SidebarWithHeader from '@/components/sidebar'
import { db } from '@/lib/firebase/store'

export default function Home({
  params: { user_id },
}: {
  params: { user_id: string }
}) {
  const [words, setWords] = useState<string>('')
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, 'users', user_id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const likes = docSnap.data().likes as paperData[]
        setWords(likes.map((obj) => obj.abstract).join(' '))
      }
    }

    fetchData()
  }, [])

  return (
    <Box>
      <Stack direction={'column'} height="100%">
        <HeaderPapers />
        <Stack direction={'row'} mt={'20'}>
          <Box>
            <SidebarWithHeader />
          </Box>
          <Box width={'100%'}>
            <ParentSize>
              {({ width, height }) => (
                <MyWordCloud width={width} height={height} text={words} />
              )}
            </ParentSize>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}

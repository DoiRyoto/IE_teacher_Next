'use client'

import ListPapersWithHeaderSideBar from '@/components/listPapersWithHeaderSideBar'
import { useAuthContext } from '@/lib/provider/authContextProvider'

export default function Home({
  params: { keyword },
}: {
  params: { keyword: string }
}) {
  const user = useAuthContext()

  return (
    <ListPapersWithHeaderSideBar
      mode="search"
      keyword_or_id={keyword}
      user={user.user}
    />
  )
}

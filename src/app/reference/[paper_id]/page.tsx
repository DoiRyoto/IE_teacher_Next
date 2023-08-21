'use client'

import ListPapersWithHeaderSideBar from '@/components/listPapersWithHeaderSideBar'
import { useAuthContext } from '@/lib/provider/authContextProvider'

export default function Home({
  params: { paper_id },
}: {
  params: { paper_id: string }
}) {
  const user = useAuthContext()
  return (
    <ListPapersWithHeaderSideBar
      mode="reference"
      keyword_or_id={paper_id}
      user={user.user}
    />
  )
}

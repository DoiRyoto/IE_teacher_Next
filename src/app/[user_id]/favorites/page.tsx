'use client'

import ListPapersWithHeaderSideBar from '@/components/listPapersWithHeaderSideBar'
import { useAuthContext } from '@/lib/provider/authContextProvider'

export default function Home({
  params: { user_id },
}: {
  params: { user_id: string }
}) {
  const user = useAuthContext()
  return (
    <ListPapersWithHeaderSideBar
      mode="favorites"
      keyword_or_id={user_id}
      user={user.user}
    />
  )
}

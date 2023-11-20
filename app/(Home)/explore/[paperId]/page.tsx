import Papers from '@/app/ui/Explore/Papers'
import Link from 'next/link'
import clsx from 'clsx'

import React, { Suspense } from 'react'
import ModeSwitchButton from '@/app/ui/Explore/ModeSwitchButton'

const page = ({
  params,
  searchParams,
}: {
  params: {
    paperId: string
  }
  searchParams?: {
    page?: string;
    mode?: "reference" | "citation"
  }
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const currentMode = searchParams?.mode || "reference"
 
  // const totalPages = await fetchInvoicesPages(query);
  
  return (
    <section>
      <ModeSwitchButton mode={currentMode} paperId={params.paperId} />
      <Suspense>
        <div className='mt-16'>
          <Papers paperId={params.paperId} page={currentPage} mode={currentMode} />
        </div>
      </Suspense>
    </section>
  )
}

export default page
import React, { Suspense } from 'react'
import ModeSwitchButton from '@/app/ui/Explore/ModeSwitchButton'
import PapersContainer from '@/app/ui/Explore/Papers/PapersContainer'

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
  
  return (
    <section>
      <ModeSwitchButton mode={currentMode} paperId={params.paperId} />
      <Suspense>
        <div className='mt-16'>
          <PapersContainer paperId={params.paperId} page={currentPage} mode={currentMode} />
        </div>
      </Suspense>
    </section>
  )
}

export default page
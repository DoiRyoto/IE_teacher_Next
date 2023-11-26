import PapersContainer from '@/app/ui/Search/Papers/PapersContainer';
import React, { Suspense } from 'react'

const page = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  }
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const searchWord = searchParams?.query || ""
  
  return (
    <section className='w-full'>
      <Suspense>
        <PapersContainer query={searchWord} page={currentPage} />
      </Suspense>
    </section>
  )
}

export default page
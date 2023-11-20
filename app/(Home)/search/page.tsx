import Papers from '@/app/ui/Search/Papers';
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
 
  // const totalPages = await fetchInvoicesPages(query);
  
  return (
    <section className='w-full'>
      <Suspense>
        <Papers query={searchWord} page={currentPage} />
      </Suspense>
    </section>
  )
}

export default page
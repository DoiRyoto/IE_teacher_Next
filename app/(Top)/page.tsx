import React from 'react'
import SearchBarTop from '../ui/Top/SearchBarTop'

const page = () => {
  return (
    <section className='py-10 flex flex-col md:gap-20 gap-10 mb-12'>
      <div className='flex flex-col text-center gap-5'>
        <div className='xl:text-6xl md:text-5xl text-4xl font-extrabold'>
          <text>
            Quickly go back to {' '}
          </text>
          <text className='text-[#4299E1]'>
            the bibliography
          </text>
        </div>
        <text className="text-[#718096]">
          Survey support system for information engineering researchers who want to solve the time-consuming <br />
          problem of surveying too many previous studies.
        </text>
      </div>
      <SearchBarTop />
    </section>
  )
}

export default page
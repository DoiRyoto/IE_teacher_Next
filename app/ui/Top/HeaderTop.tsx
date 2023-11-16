import Link from 'next/link'
import React from 'react'

const HeaderTop = () => {
  return (
    <header className='flex justify-between p-4'>
      <Link href="/" className='font-bold text-2xl p-2'>
        IE:Teacher
      </Link>
    </header>
  )
}

export default HeaderTop
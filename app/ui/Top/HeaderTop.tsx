import Link from 'next/link'
import React from 'react'

const HeaderTop = () => {
  return (
    <header className='flex justify-between p-4 border-b border-x-gray-100'>
      <Link title="ロゴ" href="/" className='font-bold text-2xl p-2'>
        IE:Teacher
      </Link>
    </header>
  )
}

export default HeaderTop
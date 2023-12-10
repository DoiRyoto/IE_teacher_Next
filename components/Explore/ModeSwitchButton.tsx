import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

const ModeSwitchButton = (
  { mode, paperId } : { mode: string, paperId: string }
) => {

  return (
    <div className='fixed z-40 top-0 flex flex-row max-w-5xl w-full text-center border-b dark:bg-black bg-white'>
      <Link className={clsx(
        "w-1/2 p-4 border-r hover:bg-slate-900",
          {"font-bold" : mode === "reference"})} href={`/explore/${paperId}?mode=reference`}>reference</Link>
      <Link className={clsx("w-1/2 p-4 hover:bg-slate-900",
          {"font-bold" : mode === "citation"})} href={`/explore/${paperId}?mode=citation`}>citation</Link>
    </div>
  )
}

export default ModeSwitchButton
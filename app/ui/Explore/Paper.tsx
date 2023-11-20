import { paperDetailsType } from '@/lib/actions/paper.action'
import React from 'react'
import Link from 'next/link';
import { MdPictureAsPdf } from 'react-icons/md'
import { SiSemanticscholar } from 'react-icons/si'

const Paper = (
  { paper } : { paper: paperDetailsType }
) => {
  return (
    <article className='w-full relative flex flex-col gap-2 border-b p-5 hover:bg-slate-900'>
      <Link href={`/explore/${paper.paperId?.toString()}`} tabIndex={-1} className='absolute inset-0'/>
      <p className='font-bold text-xl'>{ paper.title }</p>
      <div className='flex flex-col'>
        <p className='text-base text-slate-500'>
          { paper.authors ? paper.authors[0].name : null }
          { paper.authors ? paper.authors.length > 1 ? '' : ' et al.' : null}
        </p>
        <p className='text-base text-slate-500'>{ paper.year ? paper.year.toString() : null}</p>
        <p className='text-base text-slate-500'>
          { paper.citationCount ? paper.citationCount.toString() : null} Citations, 
          { paper.referenceCount ? paper.referenceCount.toString(): null } References</p>
      </div>
      <div className='flex flex-row gap-3 z-30'>
        { paper.url ? <a href={paper.url.toString()} target='_blank' className='hover:bg-slate-700 p-2 z-30'><SiSemanticscholar /></a> : null }
        { paper.isOpenAccess && paper.openAccessPdf && paper.openAccessPdf.url ? 
          <a href={paper.openAccessPdf.url.toString()} target='_blank' className='hover:bg-slate-700 p-2 z-30'><MdPictureAsPdf /></a> : null }
      </div>
      <p className='text-xl'>tldr;{' '}{ paper.tldr ? paper.tldr.text : null }</p>
    </article>
  )
}

export default Paper
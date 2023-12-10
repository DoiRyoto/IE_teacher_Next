import { paperDetailsType } from '@/action/paper.action'
import React from 'react'
import Paper from './Paper'

const Papers = (
  { papers } : { papers: paperDetailsType[] }
) => {
  return (
    <div className='w-full'>
      <div className='flex flex-col'>
        {
          papers.map((paper) => {
            if(paper) return (paper.paperId ? <Paper key={paper.paperId} paper={paper} /> : null)
          })
        }
      </div>
    </div>
  )
}

export default Papers
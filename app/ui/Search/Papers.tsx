import { searchPapersBySearchWord } from '@/lib/actions/paper.action'
import React from 'react'
import Paper from './Paper'

const Papers = async (
  { query, page } : { query: string, page: number }
) => {
  const papers = await searchPapersBySearchWord(query, page)

  return (
    <div className='w-full'>
      <div className='flex flex-col'>
        {
          papers.map((paper) => {
            return (paper.paperId ? <Paper key={paper.paperId} paper={paper} /> : null)
          })
        }
      </div>
    </div>
  )
}

export default Papers
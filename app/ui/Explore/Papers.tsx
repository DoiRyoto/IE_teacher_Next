import React from 'react'
import Paper from './Paper'
import { fetchCitations, fetchReferences } from '@/lib/actions/paper.action'

const Papers = async (
  { paperId, page, mode } : { paperId: string, page: number, mode: "reference" | "citation" }
) => {
  const papers = mode == "reference" ? await fetchReferences(paperId, page) : await fetchCitations(paperId, page)

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
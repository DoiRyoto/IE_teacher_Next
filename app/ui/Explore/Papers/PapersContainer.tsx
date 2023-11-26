import { fetchCitations, fetchReferences } from '@/lib/actions/paper.action'
import React from 'react'
import Papers from './Papers'

const PapersContainer = async (
  { paperId, page, mode } : { paperId: string, page: number, mode: "reference" | "citation" }
) => {
  
  const papers = mode == "reference" ? await fetchReferences(paperId, page) : await fetchCitations(paperId, page)
  
  return (
    <Papers papers={papers} />
  )
}

export default PapersContainer
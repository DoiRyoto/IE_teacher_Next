import { searchPapersBySearchWord } from '@/lib/actions/paper.action'
import React from 'react'
import Papers from './Papers'

const PapersContainer = async (
  { query, page } : { query: string, page: number }
) => {
  const papers = await searchPapersBySearchWord(query, page)

  return (
    <Papers papers={papers} />
  )
}

export default PapersContainer
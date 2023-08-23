export type paperData = {
  abstract: string | null
  authors: authorsData | null
  citationCount: string | null
  fieldsOfStudy: string[] | null
  isLike?: boolean
  paperId: string
  publishTypes: string[] | null
  referenceCount: string | null
  title: string | null
  tldr: tldrData | null
  url: string | null
  venue: string | null
  year: string | null
}

export type userData = {
  likes: paperData[]
}

export type authorsData = {
  authorId: string | null
  name: string | null
}

export type tldrData = {
  model: string | null
  text: string | null
}
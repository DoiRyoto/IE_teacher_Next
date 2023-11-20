import { URLSearchParams } from "url"
import {
  Decoder,
  object,
  string,
  number,
  array,
  boolean,
  oneOf,
  constant,
  optional
} from '@mojotech/json-type-validation';

const ITEMS_PER_PAGE = 20
type authorType = {
  authorId?: String | null
  externalIds?: {
    DBLP?: Number | null
    ORCID?: Number | null
  } | null
  url?: String | null
  name?: String | null
  aliases?: String[] | null
  affiliations?: String[] | null
  homepage?: String | null
  paperCount?: Number | null
  citationCount?: Number | null
  hIndex?: Number | null
}

const authorTypeDecoder: Decoder<authorType> = object({
  authorId: optional(oneOf(string(), constant(null))),
  externalIds: optional(oneOf(object({
    DBLP: optional(oneOf(number(), constant(null))),
    ORCID: optional(oneOf(number(), constant(null))),
  }), constant(null))),
  url: optional(oneOf(string(), constant(null))),
  name: optional(oneOf(string(), constant(null))),
  aliases: optional(oneOf(array(string()), constant(null))),
  affiliations: optional(oneOf(array(string()), constant(null))),
  homepage: optional(oneOf(string(), constant(null))),
  paperCount: optional(oneOf(number(), constant(null))),
  citationCount: optional(oneOf(number(), constant(null))),
  hIndex: optional(oneOf(number(), constant(null)))
})

export type paperDetailsType = {
  paperId?: string | null
  url?: String | null
  title?: String | null
  abstract?: String | null
  venue?: String | null
  year?: Number | null
  referenceCount?: Number | null
  citationCount?: Number | null
  influentialCitationCount?: Number | null
  isOpenAccess?: boolean | null
  openAccessPdf?: {
    url?: String | null
    status?: String | null
  } | null
  fieldsOfStudy?: String[] | null
  journal?: {
    name?: String | null
    pages?: String | null
    volume?: String | null
  } | null
  authors?: authorType[] | null
  tldr?: {
    model?: String | null
    text?: String | null
  } | null
}

const paperDetailsTypeDecoder: Decoder<paperDetailsType[]> = array(object({
  paperId: optional(oneOf(string(), constant(null))),
  url: optional(oneOf(string(), constant(null))),
  title: optional(oneOf(string(), constant(null))),
  abstract: optional(oneOf(string(), constant(null))),
  venue: optional(oneOf(string(), constant(null))),
  year: optional(oneOf(number(), constant(null))),
  referenceCount: optional(oneOf(number(), constant(null))),
  citationCount: optional(oneOf(number(), constant(null))),
  influentialCitationCount: optional(oneOf(number(), constant(null))),
  isOpenAccess: optional(oneOf(boolean(), constant(null))),
  openAccessPdf: optional(oneOf(object({
    url: optional(oneOf(string(), constant(null))),
    status: optional(oneOf(string(), constant(null))),
  }), constant(null))),
  fieldsOfStudy: optional(oneOf(array(string()), constant(null))),
  journal: optional(oneOf(object({
    name: optional(oneOf(string(), constant(null))),
    pages: optional(oneOf(string(), constant(null))),
    volume: optional(oneOf(string(), constant(null)))
  }), constant(null))),
  authors: optional(oneOf(array(authorTypeDecoder), constant(null))),
  tldr: optional(oneOf(object({
    model: optional(oneOf(string(), constant(null))),
    text: optional(oneOf(string(), constant(null)))
  }), constant(null)))
}))

type paperIdType = {
  paperId: String
  title?: String | null
}

const paperIdTypeDecoder: Decoder<paperIdType> = object({
  paperId: string(),
  title: optional(oneOf(string(), constant(null)))
})

const paperIdsTypeDecoder: Decoder<paperIdType[]> = array(object({
  paperId: string(),
  title: optional(oneOf(string(), constant(null)))
}))

type fetchPaperIdsType = {
  total: Number
  offset: Number
  next: Number
  data: paperIdType[]
}

const fetchPaperIdsTypeDecoder: Decoder<fetchPaperIdsType> = object({
  total: number(),
  offset: number(),
  next: number(),
  data: paperIdsTypeDecoder
})

type fetchCitationPaperIdsType = {
  offset: Number
  next: Number
  data: {
    citingPaper: paperIdType
  }[]
}

const fetchCitationPaperIdsTypeDecoder: Decoder<fetchCitationPaperIdsType> = object({
  offset: number(),
  next: number(),
  data: array(object({
    citingPaper: paperIdTypeDecoder
  }))
})

type fetchReferencePaperIdsType = {
  offset: Number
  next: Number
  data: {
    citedPaper: paperIdType
  }[]
}

const fetchReferencePaperIdsTypeDecoder: Decoder<fetchReferencePaperIdsType> = object({
  offset: number(),
  next: number(),
  data: array(object({
    citedPaper: paperIdTypeDecoder
  }))
})

const fetchPaperIdsBySearchWord = async (searchWord: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE
  const params = {
    query: searchWord,
    field: "paperId",
    offset: offset.toString(),
    limit: ITEMS_PER_PAGE.toString()
  }

  const urlSearchParams = new URLSearchParams(params).toString()
  try {
    const res = await fetch(
      `https://api.semanticscholar.org/graph/v1/paper/search?${urlSearchParams}`, 
      {
        headers: {"x-api-key": process.env.NEXT_PUBLIC_S2_API_KEY || ''}
      }
    )
    const paperIds = res.json().then(fetchPaperIdsTypeDecoder.runPromise)
    return paperIds
  } catch (error) {
    console.log(error)
    throw new Error("Failed to fetch PaperIds")
  }
}

export const searchPapersBySearchWord = async (searchWord: string, currentPage: number) => {
  // Keys of paperDetailsType
  const params = {
    fields: "url,title,abstract,venue,year,referenceCount,citationCount,influentialCitationCount,isOpenAccess,openAccessPdf,fieldsOfStudy,journal,authors,tldr"
  }

  const urlSearchParams = new URLSearchParams(params).toString()

  try {
    const paperIds = await fetchPaperIdsBySearchWord(searchWord, currentPage)
    const res = await fetch(
      `https://api.semanticscholar.org/graph/v1/paper/batch?${urlSearchParams}`,
      {
        method: "POST",
        headers: {"x-api-key": process.env.NEXT_PUBLIC_S2_API_KEY || ''},
        body: JSON.stringify({
          ids: paperIds.data.map((value) => value.paperId)
        })
      }
    )
    const paperData = res.json().then(paperDetailsTypeDecoder.runPromise)
    return paperData
  } catch (error) {
    console.log(error)
    throw new Error("Failed to fetch Papers")
  }
}

const fetchReferencePaperIdsByPaperId = async (paperId: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE
  const params = {
    field: "paperId",
    offset: offset.toString(),
    limit: ITEMS_PER_PAGE.toString()
  }

  const urlSearchParams = new URLSearchParams(params).toString()
  try {
    const res = await fetch(
      `https://api.semanticscholar.org/graph/v1/paper/${paperId}/references?${urlSearchParams}`, 
      {
        headers: {"x-api-key": process.env.NEXT_PUBLIC_S2_API_KEY || ''}
      }
    )
    const paperIds = res.json().then(fetchReferencePaperIdsTypeDecoder.runPromise)
    return paperIds
  } catch (error) {
    console.log(error)
    throw new Error("Failed to fetch PaperIds")
  }
}

export const fetchReferences = async (paperId: string, currentPage: number) => {
  // Keys of paperDetailsType
  const params = {
    fields: "url,title,abstract,venue,year,referenceCount,citationCount,influentialCitationCount,isOpenAccess,openAccessPdf,fieldsOfStudy,journal,authors,tldr"
  }

  const urlSearchParams = new URLSearchParams(params).toString()

  try {
    const paperIds = await fetchReferencePaperIdsByPaperId(paperId, currentPage)
    const res = await fetch(
      `https://api.semanticscholar.org/graph/v1/paper/batch?${urlSearchParams}`,
      {
        method: "POST",
        headers: {"x-api-key": process.env.NEXT_PUBLIC_S2_API_KEY || ''},
        body: JSON.stringify({
          ids: paperIds.data.map((value) => value.citedPaper.paperId)
        })
      }
    )
    const paperData = res.json().then(paperDetailsTypeDecoder.runPromise)
    return paperData
  } catch (error) {
    console.log(error)
    throw new Error("Failed to fetch Papers")
  }
}

const fetchCitationsPaperIdsByPaperId = async (paperId: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE
  const params = {
    field: "paperId",
    offset: offset.toString(),
    limit: ITEMS_PER_PAGE.toString()
  }

  const urlSearchParams = new URLSearchParams(params).toString()
  try {
    const res = await fetch(
      `https://api.semanticscholar.org/graph/v1/paper/${paperId}/citations?${urlSearchParams}`, 
      {
        headers: {"x-api-key": process.env.NEXT_PUBLIC_S2_API_KEY || ''}
      }
    )
    const paperIds = res.json().then(fetchCitationPaperIdsTypeDecoder.runPromise)
    return paperIds
  } catch (error) {
    console.log(error)
    throw new Error("Failed to fetch PaperIds")
  }
}

export const fetchCitations = async (paperId: string, currentPage: number) => {
  // Keys of paperDetailsType
  const params = {
    fields: "url,title,abstract,venue,year,referenceCount,citationCount,influentialCitationCount,isOpenAccess,openAccessPdf,fieldsOfStudy,journal,authors,tldr"
  }

  const urlSearchParams = new URLSearchParams(params).toString()

  try {
    const paperIds = await fetchCitationsPaperIdsByPaperId(paperId, currentPage)
    const res = await fetch(
      `https://api.semanticscholar.org/graph/v1/paper/batch?${urlSearchParams}`,
      {
        method: "POST",
        headers: {"x-api-key": process.env.NEXT_PUBLIC_S2_API_KEY || ''},
        body: JSON.stringify({
          ids: paperIds.data.map((value) => value.citingPaper.paperId)
        })
      }
    )
    const paperData = res.json().then(paperDetailsTypeDecoder.runPromise)
    return paperData
  } catch (error) {
    console.log(error)
    throw new Error("Failed to fetch Papers")
  }
}
import { NextResponse } from 'next/server'
import { baseURL } from '../../requests'

export async function GET(request: Request, { params }: any) {
  const fields = "paperId,url,title,venue,year,authors,abstract,referenceCount,citationCount,fieldsOfStudy,publicationTypes,tldr"
  const query = new URLSearchParams({"query": params.params[0], "offset": params.params[1], "limit": "20", "fields": fields})
  const res = await fetch(
    `${baseURL}/search?${query}`,
    {headers: {'x-api-key': process.env.NEXT_PUBLIC_S2_API_KEY as string},
    method: "GET",
  }
  )
  const data = await res.json()
  return NextResponse.json({ data })
}
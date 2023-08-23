import { NextResponse } from 'next/server'
import { baseURL } from '../../requests'
import { URLSearchParams } from 'url'

export async function GET(request: Request, { params }: any) {
  const query = new URLSearchParams({offset: params.params[1], limit: "20", fields: "paperId"})
  const res = await fetch(
    `${baseURL}/${params.params[0]}/references?${query}`,
    {headers: {'x-api-key': process.env.NEXT_PUBLIC_S2_API_KEY as string},
    method: "GET",
  }
  )
  const data = await res.json()

  return NextResponse.json({ data })
}

export async function POST(request: Request, { params }: any) {
  const paperIds = await request.json()
  const fields = "paperId,url,title,venue,year,authors,abstract,referenceCount,citationCount,fieldsOfStudy,publicationTypes,tldr"
  const query = new URLSearchParams({"fields": fields})
  const res = await fetch(
    `${baseURL}/batch?${query}`,
    {headers: {'x-api-key': process.env.NEXT_PUBLIC_S2_API_KEY as string},
    method: "POST",
    body: JSON.stringify(paperIds)
  }
  )
  const data = await res.json()
  return NextResponse.json({ data })
}
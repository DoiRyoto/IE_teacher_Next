import { NextResponse } from 'next/server'
import { recommendBaseURL } from '../../requests'
import { URLSearchParams } from 'url'

export async function POST(request: Request, { params }: any) {
  const paperIds = await request.json()
  const fields = "paperId"
  const query = new URLSearchParams({"fields": fields, "offset": params.params[1], "limit": "20"})
  const res = await fetch(
    `${recommendBaseURL}?${query}`,
    {headers: {'x-api-key': process.env.NEXT_PUBLIC_S2_API_KEY as string},
    method: "POST",
    body: JSON.stringify(paperIds)
  }
  )
  const data = await res.json()
  return NextResponse.json({ data })
}
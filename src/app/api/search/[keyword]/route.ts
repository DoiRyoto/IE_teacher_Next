import { NextResponse } from 'next/server'
import { baseURL } from '../../requests'

export async function GET(request: Request, { params }: any) {
  const res = await fetch(
    `${baseURL}/paper/${params.keyword}?api_key=${process.env.NEXT_PUBLIC_S2_API_KEY}`,
  )
  const data = await res.json()

  return NextResponse.json({ data })
}

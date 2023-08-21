import { NextResponse } from 'next/server'
import { baseURL } from '../../requests'

export async function GET(request: Request, { params }: any) {
  const res = await fetch(
    `${baseURL}/reference/${params.params[0]}?api_key=${process.env.NEXT_PUBLIC_S2_API_KEY}&offset=${params.params[1]}`,
  )
  const data = await res.json()

  return NextResponse.json({ data })
}

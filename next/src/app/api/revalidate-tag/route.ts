import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { key } = body
  revalidateTag(key)
  return NextResponse.json({
    success: true,
    key,
  })
}

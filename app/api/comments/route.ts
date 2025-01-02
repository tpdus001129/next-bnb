import { NextResponse } from "next/server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import prisma from "@/db"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const roomId = searchParams.get("roomId") as string
  const limit = searchParams.get("limit") as string
  const page = searchParams.get("page") as string

  // 댓글 limit이 넘으면 무한 스크롤
  if (page) {
    const count = await prisma.comment.count({
      where: { roomId: parseInt(roomId) },
    })
    const skipPage = parseInt(page) - 1
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        roomId: roomId ? parseInt(roomId) : {},
      },
      take: parseInt(limit),
      skip: skipPage * parseInt(limit),
      include: {
        user: true,
      },
    })
    return NextResponse.json({
      page: parseInt(page),
      data: comments,
      totalCount: count,
      totalPage: Math.ceil(count / parseInt(limit)),
    })
  } else {
    // limit 값 이하면 그 숫자 기준으로 최신 데이터 가져오기
    const count = await prisma.comment.count({
      where: { roomId: parseInt(roomId) },
    })

    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
      take: parseInt(limit),
      where: {
        roomId: roomId ? parseInt(roomId) : {},
      },
      include: {
        user: true,
      },
    })

    return NextResponse.json(
      {
        data: comments,
        totalCount: count,
      },
      {
        status: 200,
      },
    )
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const formData = await req.json()

  const { roomId, body } = formData

  if (!session?.user) {
    return NextResponse.json(
      {
        error: "Unauthorized user",
      },
      {
        status: 401,
      },
    )
  }

  const comment = await prisma.comment.create({
    data: {
      roomId,
      body,
      userId: session?.user.id,
    },
  })

  return NextResponse.json(comment, {
    status: 200,
  })
}

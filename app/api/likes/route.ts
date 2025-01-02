import { NextResponse } from "next/server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

import prisma from "@/db"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json(
      {
        error: "unauthorized user",
      },
      { status: 401 },
    )
  }

  const formData = await req.json()
  const { roomId } = formData

  let like = await prisma.like.findFirst({
    where: {
      roomId,
      userId: session?.user?.id,
    },
  })

  if (like) {
    like = await prisma.like.delete({
      where: {
        id: like.id,
      },
    })

    return NextResponse.json(like, {
      status: 200,
    })
  } else {
    like = await prisma.like.create({
      data: {
        roomId,
        userId: session?.user?.id,
      },
    })

    return NextResponse.json(like, {
      status: 201,
    })
  }
}

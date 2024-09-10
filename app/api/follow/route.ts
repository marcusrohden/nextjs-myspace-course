import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const currentEmail = session?.user?.email!;
  const { targetUserId } = await req.json();

  const currentUserId = await prisma.user
    .findUnique({
      where: {
        email: currentEmail,
      },
    })
    .then((user) => user?.id!);

  const follow = await prisma.follows.create({
    data: {
      followerId: currentUserId,

      followingId: targetUserId,
    },
  });

  return NextResponse.json(follow);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const currentUserEmail = session?.user?.email!;

  const targetUserId = req.nextUrl.searchParams.get("targetUserId");

  const currentUserId = await prisma.user
    .findUnique({
      where: {
        email: currentUserEmail,
      },
    })
    .then((user) => user?.id!);

  const record = await prisma.follows.delete({
    where: {
      followerId_followingId: {
        followerId: currentUserId,
        followingId: targetUserId!,
      },
    },
  });

  return NextResponse.json(record);
}

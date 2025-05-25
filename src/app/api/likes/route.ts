import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const session = await auth();
  const { searchParams } = new URL(req.url);

  const page = searchParams.get('page') as string;
  const limit = searchParams.get('limit') as string;
  const skipPage = Number(page) - 1;

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const count = await prisma.like.count({
    where: {
      userId: session?.user?.id,
    },
  });

  const likes = await prisma.like.findMany({
    orderBy: { createdAt: 'desc' },
    where: {
      userId: session?.user?.id,
    },
    include: {
      room: true,
    },
    take: Number(limit),
    skip: skipPage * Number(limit),
  });

  return NextResponse.json(
    {
      page: Number(page),
      data: likes,
      totalCount: count,
      totalPage: Math.ceil(count / Number(limit)),
    },
    { status: 200 },
  );
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.json();
  const { roomId } = formData;

  let like = await prisma.like.findFirst({
    where: {
      roomId,
      userId: session?.user?.id,
    },
  });

  if (like) {
    like = await prisma.like.delete({
      where: {
        id: like.id,
      },
    });

    return NextResponse.json(like, { status: 200 });
  } else {
    like = await prisma.like.create({
      data: {
        userId: String(session?.user?.id),
        roomId,
      },
    });

    return NextResponse.json(like, { status: 201 });
  }
}

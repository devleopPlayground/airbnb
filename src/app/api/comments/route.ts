import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { roomId, body } = await req.json();

  const comment = await prisma.comment.create({
    data: {
      roomId,
      body,
      userId: String(session.user.id),
    },
  });

  return NextResponse.json(comment);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const roomId = searchParams.get('roomId') as string;
  const limit = searchParams.get('limit') as string;
  const page = searchParams.get('page') as string;

  if (!roomId) {
    return NextResponse.json({ error: 'RoomId is required' }, { status: 400 });
  }

  if (page) {
    // page파라미터가 존재하는 경우 댓글 무한스크롤 적용
    const count = await prisma.comment.count({
      where: {
        roomId: Number(roomId),
      },
    });
    const skipPage = Number(page) - 1;
    const comments = await prisma.comment.findMany({
      where: {
        roomId: Number(roomId),
      },
      include: {
        user: true,
      },
      orderBy: { id: 'desc' },
      take: Number(limit),
      skip: skipPage * Number(limit),
    });

    return NextResponse.json({
      page: Number(page),
      data: comments,
      totalCount: count,
      totalPage: Math.ceil(count / Number(limit)),
    });
  } else {
    // page값이 없는 경우 limit 값을 기준으로 최신 데이터 가져오기
    const count = await prisma.comment.count({
      where: {
        roomId: roomId ? Number(roomId) : {},
      },
    });
    const comments = await prisma.comment.findMany({
      where: {
        roomId: roomId ? Number(roomId) : {},
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: Number(limit),
    });

    return NextResponse.json(
      {
        comments,
        totalCount: count,
      },
      { status: 200 },
    );
  }
}

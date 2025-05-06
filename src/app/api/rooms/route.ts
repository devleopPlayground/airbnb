import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get('page') as string;
  const limit = searchParams.get('limit') as string;
  const id = searchParams.get('id') as string;

  if (page) {
    // page 존재시 무한 스크롤
    const count = await prisma.room.count();
    const skipPage = Number(page) - 1;
    const rooms = await prisma.room.findMany({
      orderBy: { id: 'asc' },
      take: Number(limit),
      skip: skipPage * Number(limit),
    });

    return NextResponse.json(
      {
        page: Number(page),
        data: rooms,
        totalCount: count,
        totalPage: Math.ceil(count / Number(limit)),
      },
      { status: 200 },
    );
  }

  if (id) {
    const roomDetail = await prisma.room.findFirst({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(roomDetail, {
      status: 200,
    });
  }

  const data = await prisma.room.findMany();

  return NextResponse.json(data, { status: 200 });
}

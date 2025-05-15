import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

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

import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session?.user?.id,
    },
    include: {
      accounts: true,
    },
  });

  return NextResponse.json(user, { status: 200 });
}

export async function PUT(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, phone, email, address } = await req.json();

  const result = await prisma.user.update({
    where: {
      id: session?.user?.id,
    },
    data: { name, phone, email, address },
  });

  return NextResponse.json(result, { status: 200 });
}

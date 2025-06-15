import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

type BookingType = {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guestCount: string;
  totalAmount: string;
  totalDays: string;
  status: 'SUCCESS' | 'CANCEL' | 'PENDING' | 'FAILED';
};

type RefundType = {
  id: string;
  status: 'SUCCESS' | 'CANCEL' | 'PENDING' | 'FAILED';
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get('id') as string;
  const page = searchParams.get('page') as string;
  const limit = searchParams.get('limit') as string;
  const userId = searchParams.get('userId') as string;

  if (id) {
    const booking = await prisma.booking.findFirst({
      where: {
        id: id ? id : {},
      },
      include: {
        user: true,
        room: true,
      },
    });

    return NextResponse.json(booking, { status: 200 });
  } else if (page && userId) {
    const skipPage = Number(page) - 1;
    const totalCount = await prisma.booking.count({
      where: {
        userId,
        NOT: {
          status: 'PENDING',
        },
      },
    });

    const bookings = await prisma.booking.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      where: {
        userId,
      },
      take: Number(limit),
      skip: Number(limit) * skipPage,
      include: {
        user: true,
        room: true,
      },
    });

    return NextResponse.json(
      {
        page: Number(page),
        totalPage: Math.ceil(totalCount / Number(limit)),
        data: bookings,
      },
      { status: 200 },
    );
  }
}

export async function POST(req: Request) {
  const session = await auth();

  const formData = await req.json();

  const { roomId, checkIn, checkOut, guestCount, totalAmount, totalDays, status }: BookingType = formData;

  const booking = await prisma.booking.create({
    data: {
      roomId: Number(roomId),
      userId: String(session?.user?.id),
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guestCount: Number(guestCount),
      totalDays: Number(totalDays),
      totalAmount: Number(totalAmount),
      status,
    },
  });

  return NextResponse.json(booking, { status: 200 });
}

export async function PUT(req: Request) {
  const formData = await req.json();
  const { id, status }: RefundType = formData;
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: 'unauthorized user' }, { status: 401 });
  }

  const result = await prisma.booking.update({
    where: {
      id: id,
    },
    data: {
      status,
    },
  });

  return NextResponse.json(result, { status: 200 });
}

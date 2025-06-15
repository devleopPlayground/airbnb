import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

type PaymentProps = {
  bookingId: string;
  amount: string;
  orderId: string;
  orderName: string;
  paymentKey: string;
  status:
    | 'READY'
    | 'IN_PROGRESS'
    | 'WAITING_FOR_DEPOSIT'
    | 'DONE'
    | 'CANCELED'
    | 'PARTIAL_CANCELED'
    | 'ABORTED'
    | 'EXPIRED';
};

type PaymentApproveProps = {
  orderId: string;
  paymentKey: string;
  amount: string;
  method: string;
  receiptUrl: string;
  approvedAt: string;
  status:
    | 'READY'
    | 'IN_PROGRESS'
    | 'WAITING_FOR_DEPOSIT'
    | 'DONE'
    | 'CANCELED'
    | 'PARTIAL_CANCELED'
    | 'ABORTED'
    | 'EXPIRED';
  bookingStatus: 'CANCEL' | 'SUCCESS' | 'PENDING' | 'FAILED';
  failureCode: string;
  failureMessage: string;
  cardNumber: string;
  type: 'NORMAL' | 'BILLING' | 'BRANDPAY';
  mId: string;
  requestedAt: string;
  cardType: string;
  checkoutUrl: string;
};

export async function POST(req: Request) {
  // 결제 요청 값을 생성한다.
  const session = await auth();
  const formData = await req.json();

  const { bookingId, amount, orderId, orderName, status }: PaymentProps = formData;

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized error' }, { status: 401 });
  }

  const payment = await prisma.payment.create({
    data: {
      bookingId,
      amount: Number(amount),
      orderId,
      orderName,
      status,
    },
  });

  return NextResponse.json(payment);
}

export async function PUT(req: Request) {
  // 결제 승인 응답 값을 업데이트 한다.
  const formData = await req.json();

  const {
    orderId,
    paymentKey,
    amount,
    method,
    receiptUrl,
    approvedAt,
    status,
    bookingStatus,
    failureCode,
    failureMessage,
    cardNumber,
    type,
    mId,
    requestedAt,
    cardType,
    checkoutUrl,
  }: PaymentApproveProps = formData;

  const payment = await prisma.payment.update({
    where: {
      orderId,
    },
    data: {
      paymentKey,
      amount: Number(amount),
      method,
      receiptUrl,
      approvedAt,
      failureCode,
      failureMessage,
      status,
      cardNumber,
      type,
      mId,
      requestedAt,
      cardType,
      checkoutUrl,
    },
  });

  await prisma.booking.update({
    where: {
      id: payment.bookingId,
    },
    data: {
      status: bookingStatus,
    },
  });

  return NextResponse.json(payment, {
    status: 200,
  });
}

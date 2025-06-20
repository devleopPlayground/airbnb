import axios from 'axios';
import dayjs from 'dayjs';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { api } from '@/apis/httpClient';

type PaymentRequestProps = {
  paymentKey: string;
  orderId: string;
  amount: string;
};

type PaymentResponseProps = {
  mId?: string;
  orderName?: string;
  approvedAt?: string;
  requestedAt?: string;
  status: string;
  receipt?: {
    url: string;
  };
  checkout?: {
    url: string;
  };
  card?: {
    number?: string;
    cardType?: string;
  };
  type?: string;
  totalAmount: number;
  method?: '카드' | '가상계좌' | '계좌이체';
};

type Payment = {
  payment?: PaymentResponseProps;
  redirect?: {
    destination?: string;
  };
};

const PaymentSuccessPage = async ({ searchParams }: { searchParams: PaymentRequestProps }) => {
  const { paymentKey, orderId, amount } = searchParams;
  const data: Payment = await getPayment({ paymentKey, orderId, amount });

  if (data.redirect) {
    redirect(data.redirect.destination || '/');
  }

  console.log('data', data);

  return (
    <div className="max-w-2xl mx-auto py-20 px-4">
      <div className="flex flex-col gap-6 border-b pb-8">
        <h2 className="font-semibold text-lg md:text-2xl">주문 내역</h2>
        <div className="rounded-md border-black p-2 border-2 cursor-pointer hover:bg-black/5">
          <h3 className="font-semibold">주문</h3>
          <p className="text-gray-800 text-sm mt-1">{data.payment?.orderName}</p>
        </div>
      </div>

      <div className="flex flex-col gap-6 border-b pb-8">
        <h2 className="font-semibold text-lg md:text-2xl">결제 내역</h2>
        <div className="rounded-md border-black p-2 border-2 cursor-pointer hover:bg-black/5">
          <h3 className="font-semibold">결제 수단</h3>
          <p className="text-gray-800 text-sm mt-1">{data.payment?.method}</p>
        </div>
      </div>

      <div className="flex flex-col gap-6 border-b pb-8">
        <h2 className="font-semibold text-lg md:text-2xl">결제 금액</h2>
        <div className="rounded-md border-black p-2 border-2 cursor-pointer hover:bg-black/5">
          <p className="text-gray-800 text-sm mt-1">{data.payment?.totalAmount.toLocaleString()}원</p>
        </div>
      </div>

      <div className="flex flex-col gap-6 border-b pb-8">
        <h2 className="font-semibold text-lg md:text-2xl">결제 일시</h2>
        <div className="rounded-md border-black p-2 border-2 cursor-pointer hover:bg-black/5">
          <p className="text-gray-800 text-sm mt-1">
            {dayjs(data.payment?.approvedAt).format('YYYY-MM-DD HH:MM:ss')}
          </p>
          <div>
            <a
              href={data.payment?.receipt?.url}
              target="_blank"
              className="bg-gray-800 text-white hover:bg-gray-600 px-6 py-3 rounded-md"
            >
              영수증 확인
            </a>
          </div>
        </div>
      </div>
      <div>
        <Link
          href="/users/bookings"
          className="bg-rose-600 hover:bg-rose-500 px-6 py-3 text-white rounded-md text-center"
        >
          예약 내역 확인
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;

async function getPayment({ paymentKey, orderId, amount }: PaymentRequestProps) {
  try {
    const { data: payment } = await axios.post<PaymentResponseProps>(
      'https://api.tosspayments.com/v1/payments/confirm',
      {
        paymentKey,
        orderId,
        amount,
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(process.env.TOSS_CLIENT_SECRET + ':').toString('base64')}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (payment) {
      await api.put('/api/payments', {
        orderId,
        paymentKey,
        amount,
        bookingStatus: 'SUCCESS',
        status: payment.status,
        method: payment?.method,
        receiptUrl: payment?.receipt?.url,
        approvedAt: payment?.approvedAt,
        cardNumber: payment?.card?.number,
        cardType: payment?.card?.cardType,
        type: payment?.type,
        mId: payment?.mId,
        checkoutUrl: payment?.checkout?.url,
      });
    }

    return {
      payment,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    api.put('/api/payments', {
      orderId,
      paymentKey,
      amount,
      bookingStatus: 'FAILED',
      failureCode: error.code,
      failureMessage: error.message,
    });

    return {
      redirect: {
        destination: `/payments/fail?code=${error.code}&message=${error.message}`,
      },
    };
  }
}

'use client';

import type { TossPaymentsWidgets } from '@tosspayments/tosspayments-sdk';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

import { api } from '@/apis/httpClient';
import { Loader } from '@/components/common/Loader';

const PaymentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const price = searchParams.get('totalAmount') || '0';
  const customerKey = searchParams.get('customerKey') || uuidv4();
  const totalDays = searchParams.get('totalDays') || '0';
  const roomTitle = searchParams.get('roomTitle') || 'Next BnB room';
  const bookingId = searchParams.get('bookingId') as string;

  const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
  const orderId = `${bookingId}_${Date.now()}`;

  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchPaymentWidgets() {
      const tossPayments = await loadTossPayments(clientKey);
      const widgets = tossPayments.widgets({ customerKey });
      setWidgets(widgets);
    }

    fetchPaymentWidgets();
  }, [clientKey, customerKey]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }

      // 결제하는 금액으로 초기화
      await widgets.setAmount({
        value: Number(price),
        currency: 'KRW',
      });

      await Promise.all([
        // 결제창을 렌더링합니다.
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT',
        }),
        // 약관을 렌더링합니다.
        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        }),
      ]);
    }

    renderPaymentWidgets();
  }, [widgets, price]);

  return (
    <div className="max-w-2xl mx-auto px-4 my-20">
      <h1 className="text-2xl font-bold mb-4">결제</h1>
      <div className="mb-4">
        <p>결제 금액: {Number(price).toLocaleString()}원</p>
      </div>
      {widgets == null && <Loader />}
      <div id="payment-method" className="w-full mb-4" />
      <div id="agreement" className="w-full mb-4" />
      <button
        type="button"
        onClick={async () => {
          try {
            // 결제 요청
            await widgets
              ?.requestPayment({
                orderId,
                orderName: `${roomTitle.slice(0, 10)}_${totalDays}박`,
                customerName: session?.user?.name || '익명',
                customerEmail: session?.user?.email || '',
                // redirect URL에서 처리하려면 successURL, failURL 필수
              })
              .then(async function (data) {
                try {
                  const response = await api.post('/api/payments', {
                    bookingId,
                    amount: price,
                    status: 'IN_PROGRESS',
                    orderId,
                    orderName: `${roomTitle.slice(0, 10)}_${totalDays}박`,
                  });

                  if (response.data && data) {
                    router.push(
                      `/payments/success?paymentKey=${data.paymentKey}&orderId=${data.orderId}&amount=${data.amount.value}`,
                    );
                  }
                } catch (error) {
                  console.error('Payment Error:', error);
                  toast.error('결제 처리 중 문제가 발생했습니다.');
                }
              })
              .catch(function (error) {
                if (error.code == 'USER_CANCEL') {
                  // 고객이 결제창을 닫았을때 발생하는 에러
                  toast.error('결제창을 닫아서 에러가 발생했습니다.');
                } else if (error.code == 'INVALID_CARD_COMPANY') {
                  // 유효하지 않는 카드 코드에 대한 에러
                  toast.error('유효하지 않는 카드 코드입니다.');
                } else {
                  // 그 외의 경우 에러
                  toast.error(error?.message || '문제가 발생했습니다. 다시 시도해주세요.');
                }
              });
          } catch (error) {
            console.error('payment error', error);
          }
        }}
        className="mt-8 w-full bg-rose-600 text-white rounded-md px-5 py-2.5 cursor-pointer hover:bg-rose-500"
      >
        결제하기
      </button>
    </div>
  );
};

export default PaymentPage;

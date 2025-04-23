import { getFaqs } from '@/apis/faqs';
import type { FaqType } from '@/interface';

export const dynamic = 'force-static';

const FaqPage = async () => {
  const data: FaqType[] = await getFaqs();

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-lg md:text-3xl font-semibold">FAQ</h1>
      <h1 className="mt-2 text-gray-600">도움말 내용을 확인해주세요.</h1>
      <div className="flex flex-col mt-8 mb-10">
        {data.map((faq) => (
          <div key={faq.id} className="py-5 border-b border-b-gray-200 text-black font-semibold">
            <div>{faq.title}</div>
            <div className="text-gray-600 font-normal mt-2">{faq.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;

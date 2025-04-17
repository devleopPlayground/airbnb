import clsx from 'clsx';

type FilterLayoutProps = {
  title: string;
  children: React.ReactNode;
  isShowFilter: boolean;
};

const FilterLayout = ({ title, children, isShowFilter = false }: FilterLayoutProps) => {
  return (
    <div
      className={clsx(
        'absolute top-80 sm:top-[80px] w-full border border-gray-200 px-8 py-10 flex flex-col bg-white sm:max-w-3xl rounded-xl left-0',
        !isShowFilter && 'hidden',
      )}
    >
      <div className="text-sm font-semibold">{title}</div>
      {children}
    </div>
  );
};

export default FilterLayout;

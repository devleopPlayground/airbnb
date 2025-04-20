'use client';

import { CATEGORY_DATA } from '@/constants/category';
import useCategory from './hooks/useCategory';
import clsx from 'clsx';

const Category = () => {
  const { filterValue, onUpdateCategory } = useCategory();

  return (
    <div className="flex gap-6 fixed top-20 inset-x-0 mx-auto overflow-x-scroll w-full flex-nowrap px-2 sm:pl-24 pr-16 bg-white z-1 mb-6">
      {CATEGORY_DATA.map((category) => (
        <button
          type="button"
          key={category.title}
          onClick={() => onUpdateCategory(category.title)}
          className={clsx(
            `w-16 flex-none text-gray-500 hover:text-gray-700 gap-3 justify-center text-center py-4 cursor-pointer`,
            category.title == filterValue.category && 'text-black font-semibold underline underline-offset-8',
          )}
        >
          <div className="flex flex-col gap-3 justify-center">
            <div className="text-2xl mx-auto">
              <category.icon />
            </div>
            <div className="text-gray-700 text-xs text-center">{category.title}</div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default Category;

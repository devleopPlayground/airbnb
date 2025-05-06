import { useAtom } from 'jotai';

import { filterValueAtom } from '@/atoms/filterAtoms';

const useCategory = () => {
  const [filterValue, setFilterValue] = useAtom(filterValueAtom);

  const onUpdateCategory = (category: string) => {
    setFilterValue((prevState) => ({ ...prevState, category }));
  };

  return {
    filterValue,
    onUpdateCategory,
  };
};

export default useCategory;

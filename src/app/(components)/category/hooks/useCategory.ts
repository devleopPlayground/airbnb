import { filterValueAtom } from '@/atoms/filterAtoms';
import { useAtom } from 'jotai';

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

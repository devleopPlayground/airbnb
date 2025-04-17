import type { DetailFilterType } from '@/atoms/filterAtoms';

type navFilterListType = {
  filterType: DetailFilterType;
  filterText: string;
  placeholder: string;
};

export const navFilterList: navFilterListType[] = [
  {
    filterType: 'location',
    filterText: '여행지',
    placeholder: '여행지 검색',
  },
  {
    filterType: 'checkIn',
    filterText: '체크인',
    placeholder: '날짜 추가',
  },
  {
    filterType: 'checkOut',
    filterText: '체크아웃',
    placeholder: '날짜 추가',
  },
  {
    filterType: 'guest',
    filterText: '여행자',
    placeholder: '게스트 추가',
  },
];

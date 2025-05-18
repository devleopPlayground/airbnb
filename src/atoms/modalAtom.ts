import { atom } from 'jotai';

type ModalState = {
  isOpen: boolean;
  children: React.ReactNode | null;
};

export const modalAtom = atom<ModalState>({
  isOpen: false,
  children: null,
});

// write-only (null은 read함수가 없다는걸 의미함)
export const openModalAtom = atom(null, (get, set, children: React.ReactNode) => {
  set(modalAtom, { isOpen: true, children });
});

// write-only
export const closeModalAtom = atom(null, (get, set) => {
  set(modalAtom, { isOpen: false, children: null });
});

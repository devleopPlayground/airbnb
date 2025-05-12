'use client';

import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { closeModalAtom, modalAtom } from '@/atoms/modalAtom';

export default function Modal() {
  const [{ isOpen, children }] = useAtom(modalAtom);
  const closeModal = useSetAtom(closeModalAtom);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" />
      <div ref={modalRef} className="relative bg-white rounded-lg p-6 w-fit min-w-sm max-w-3xl mx-4">
        {children}
      </div>
    </div>,
    document.body,
  );
}

import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

type LoaderProps = HTMLAttributes<HTMLDivElement> & {
  counts?: number;
};

type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
};

const Spinner = ({ size = 'md' }: SpinnerProps) => {
  const sizeStyle = () => {
    switch (size) {
      case 'sm':
        return 'size-10';
      case 'md':
        return 'size-12';
      case 'lg':
        return 'size-[52px]';
    }
  };

  return (
    <span
      className={`${sizeStyle()} border-4 border-white border-b-red-500 rounded-full animate-spin`}
    ></span>
  );
};

const Loader = ({ ...props }: LoaderProps) => {
  return (
    <div className={clsx('flex gap-4 justify-center', props?.className)}>
      <div className="w-2 h-2 rounded-full bg-gray-500 animate-ping"></div>
      <div className="w-2 h-2 rounded-full bg-gray-500 animate-ping"></div>
      <div className="w-2 h-2 rounded-full bg-gray-500 animate-ping"></div>
    </div>
  );
};

const LoaderGrid = ({ counts = 12, ...props }: LoaderProps) => {
  return (
    <>
      {[...Array(counts)].map((_, idx) => (
        <div
          key={idx}
          className={clsx('rounded-md w-full bg-gray-100 animate-pulse object-fit z-0', props?.className)}
        />
      ))}
    </>
  );
};

export { Loader, LoaderGrid, Spinner };

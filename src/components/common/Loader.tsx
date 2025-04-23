import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

type LoaderProps = HTMLAttributes<HTMLDivElement>;

const Loader = ({ ...props }: LoaderProps) => {
  return (
    <div className={clsx('flex gap-4 justify-center', props?.className)} {...props}>
      <div className="w-2 h-2 rounded-full bg-gray-500 animate-ping"></div>
      <div className="w-2 h-2 rounded-full bg-gray-500 animate-ping"></div>
      <div className="w-2 h-2 rounded-full bg-gray-500 animate-ping"></div>
    </div>
  );
};

const LoaderGrid = ({ ...props }: LoaderProps) => {
  return (
    <>
      {[...Array(12)].map((_, idx) => (
        <div
          key={idx}
          className={clsx(
            'rounded-md w-full h-72 md:h-64 bg-gray-100 animate-pulse object-fit z-0',
            props?.className,
          )}
        />
      ))}
    </>
  );
};

export { Loader, LoaderGrid };

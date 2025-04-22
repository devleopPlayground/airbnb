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

export default Loader;

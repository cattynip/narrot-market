import { HTMLAttributes } from 'react';
import joinClass from '@libs/client/joinClass';

interface IGlobalButton {
  children: React.ReactNode;
  className?: string;
}

const GlobalButton = ({
  children,
  className,
  ...buttonProps
}: IGlobalButton & HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={joinClass([
        'w-full rounded-lg bg-orange-400 py-2.5 text-white transition-all duration-200 hover:bg-orange-500',
        className ? className : ''
      ])}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default GlobalButton;

import joinClass from '@libs/client/joinClass';
import { HTMLAttributes } from 'react';

interface IErrorMessage {
  message: string;
  className?: string;
}

const ErrorMessage = ({
  message,
  className,
  ...props
}: IErrorMessage & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={joinClass([
        'flex items-center justify-center text-center text-red-500',
        className ? className : ''
      ])}
      {...props}
    >
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;

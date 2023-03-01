import { HTMLAttributes } from 'react';

interface IGlobalLabel {
  content: string | React.ReactNode;
  isRequired: boolean;
  className?: string;
  htmlFor?: string;
}

const GlobalLabel = ({
  content,
  isRequired,
  className,
  htmlFor,
  ...labelProps
}: IGlobalLabel & HTMLAttributes<HTMLLabelElement>) => {
  return (
    <>
      <label
        className={`flex items-center justify-between font-bold ${
          className ? className : ''
        }`}
        htmlFor={htmlFor ? htmlFor : ''}
        {...labelProps}
      >
        {content}
      </label>
    </>
  );
};

export default GlobalLabel;

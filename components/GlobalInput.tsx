import { HTMLAttributes } from 'react';
import joinClass from '@libs/joinClass';

type TGlobalInputFor = 'text' | 'email' | 'phone' | 'description';

interface IGlobalInput {
  inputFor: TGlobalInputFor;
  extraInformation?: {
    supportText: string;
  };
  className?: string;
}

const GlobalInput = ({
  inputFor,
  extraInformation,
  className,
  ...inputProps
}: IGlobalInput & HTMLAttributes<HTMLInputElement>) => {
  return (
    <>
      {inputFor === 'email' || inputFor === 'text' ? (
        <input
          className={joinClass([
            'mt-2 w-full rounded-lg border-2 border-gray-300 px-3 py-2.5 shadow-md transition-all duration-200 hover:border-orange-300 focus:border-orange-600 focus:outline-none focus:placeholder:opacity-0',
            className ? className : ''
          ])}
          type={inputFor}
          placeholder={
            inputFor === 'email'
              ? 'support@narrot.market'
              : 'Super Mega Product'
          }
          required
          {...inputProps}
        />
      ) : inputFor === 'phone' ? (
        <div className="mt-2 flex rounded-lg shadow-md">
          <span className="rounded-lg rounded-r-none border-2 border-r-0 border-gray-300 py-2.5 px-2">
            {extraInformation?.supportText}
          </span>
          <input
            className="w-full rounded-md rounded-l-none border-2 border-gray-300 py-2.5 px-3 transition-all duration-200 hover:border-orange-300 focus:border-orange-600 focus:outline-none focus:placeholder:opacity-0"
            placeholder="010-1234-5678"
            type="number"
            required
            {...inputProps}
          />
        </div>
      ) : inputFor === 'description' ? (
        <textarea
          className="mt-2 w-full rounded-md border-2 border-gray-300 py-2.5 px-3 shadow-md transition-all duration-200 hover:border-orange-300 focus:border-orange-600 focus:outline-none focus:placeholder:opacity-0"
          cols={4}
        />
      ) : null}
    </>
  );
};

export default GlobalInput;

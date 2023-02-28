import joinClass from '@libs/client/joinClass';
import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

type TGlobalInputFor = 'text' | 'email' | 'phone' | 'description' | 'price';

interface IGlobalInput {
  inputFor: TGlobalInputFor;
  extraInformation?: {
    supportText: string;
  };
  className?: string;
  register?: UseFormRegisterReturn;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  [key: string]: any;
}

const GlobalInput = ({
  inputFor,
  extraInformation,
  className,
  register,
  ...inputProps
}: IGlobalInput) => {
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
          {...register}
          {...inputProps}
        />
      ) : inputFor === 'phone' || inputFor === 'price' ? (
        <div className="mt-2 flex rounded-lg shadow-md">
          <span className="rounded-lg rounded-r-none border-2 border-r-0 border-gray-300 py-2.5 px-2">
            {extraInformation?.supportText}
          </span>
          <input
            className="w-full rounded-md rounded-l-none border-2 border-gray-300 py-2.5 px-3 transition-all duration-200 hover:border-orange-300 focus:border-orange-600 focus:outline-none focus:placeholder:opacity-0"
            placeholder={inputFor === 'phone' ? '010-1234-5678' : '666.66'}
            type="number"
            required
            {...register}
            {...inputProps}
          />
        </div>
      ) : inputFor === 'description' ? (
        <textarea
          className="mt-2 w-full rounded-md border-2 border-gray-300 py-2.5 px-3 shadow-md transition-all duration-200 hover:border-orange-300 focus:border-orange-600 focus:outline-none focus:placeholder:opacity-0"
          cols={4}
          {...register}
        />
      ) : null}
    </>
  );
};

export default GlobalInput;

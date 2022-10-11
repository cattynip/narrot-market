import { joinClass } from '@libs/client/utils';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import BeautifulLabel from './beautifulLabel';
import BeautifulTextarea from './beautifulTextarea';

interface BeautifulInputProps {
  inputType: React.HTMLInputTypeAttribute;
  placeholder: string;
  label?: string;
  error?: string | undefined;
  register?: UseFormRegisterReturn;
  id?: string;
  isRequired?: boolean;
}

const BeautifulInput = ({
  inputType,
  placeholder,
  label,
  error,
  id,
  register,
  isRequired,
  ...rest
}: BeautifulInputProps) => {
  if (!id) id = inputType + placeholder + label;

  console.log(`ERROR : ${error}`);

  return (
    <div>
      {label ? (
        <BeautifulLabel
          content={label}
          error={error}
          isRequired={isRequired}
          htmlFor={id}
        />
      ) : null}
      {inputType === 'description' ? (
        <BeautifulTextarea
          placeholder={placeholder}
          isRequired={isRequired ? true : false}
          error={error ? true : false}
          id={id}
        />
      ) : (
        <input
          type={inputType}
          placeholder={placeholder}
          required={isRequired}
          id={id}
          className={joinClass(
            'transition-colors placeholder:transition placeholder:focus:text-transparent appearance-none w-full px-3 py-2 border-gray-300 rounded-md shadow-sm placeholder:text-gray-600 focus:outline-none border',
            error
              ? 'border-red-500 border-3 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
          )}
          {...register}
          {...rest}
        />
      )}
    </div>
  );
};

export default BeautifulInput;

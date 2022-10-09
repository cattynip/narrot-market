import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import BeautifulTextarea from './beautifulTextarea';

interface BeautifulInputProps {
  inputType: React.HTMLInputTypeAttribute;
  placeholder: string;
  isRequired?: boolean;
  id?: string;
}

const BeautifulInput = ({
  inputType,
  placeholder,
  isRequired,
  id,
  ...rest
}: BeautifulInputProps) => {
  return (
    <div>
      {inputType === 'description' ? (
        <BeautifulTextarea
          placeholder={placeholder}
          isRequired={isRequired ? true : false}
          id={id}
        />
      ) : (
        <input
          type={inputType}
          placeholder={placeholder}
          required={isRequired}
          id={id}
          className="transition-colors placeholder:transition placeholder:focus:text-transparent appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-600 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          {...rest}
        />
      )}
    </div>
  );
};

export default BeautifulInput;

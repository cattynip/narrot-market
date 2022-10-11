import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import BeautifulLabel from './beautifulLabel';
import BeautifulTextarea from './beautifulTextarea';

interface BeautifulInputProps {
  inputType: React.HTMLInputTypeAttribute;
  placeholder: string;
  label?: string;
  register?: UseFormRegisterReturn;
  id?: string;
  isRequired?: boolean;
}

const BeautifulInput = ({
  inputType,
  placeholder,
  label,
  id,
  register,
  isRequired,
  ...rest
}: BeautifulInputProps) => {
  if (!id) id = inputType + placeholder + label;

  return (
    <div>
      {label ? (
        <BeautifulLabel content={label} isRequired={isRequired} htmlFor={id} />
      ) : null}
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
            {...register}
          {...rest}
        />
      )}
    </div>
  );
};

export default BeautifulInput;

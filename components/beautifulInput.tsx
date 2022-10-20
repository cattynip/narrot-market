import { joinClass } from '@libs/client/utils';
import React, { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { setFlagsFromString } from 'v8';
import BeautifulLabel from './beautifulLabel';
import BeautifulTextarea from './beautifulTextarea';

export interface BeautifulInputProps {
  inputType: React.HTMLInputTypeAttribute;
  placeholder: string;
  label?: string;
  error?: string | undefined;
  register?: UseFormRegisterReturn;
  id?: string;
  isRequired?: boolean;
}

export type BeautifulInputRef = HTMLInputElement;

const BeautifulInput = forwardRef<BeautifulInputRef, BeautifulInputProps>(
  ({ inputType, placeholder, label, error, register, id, isRequired }, ref) => {
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
            register={register}
            id={id}
          />
        ) : (
          <input
            type={inputType}
            placeholder={placeholder}
            required={isRequired}
            id={id}
            {...register}
            {...ref}
            className={joinClass(
              'transition-colors placeholder:transition placeholder:focus:text-transparent appearance-none w-full px-3 py-2 border-gray-300 rounded-md shadow-sm placeholder:text-gray-600 focus:outline-none border',
              error
                ? 'border-red-500 border-3 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
            )}
          />
        )}
      </div>
    );
  }
);

BeautifulInput.displayName = 'BeautifulInput';

export default BeautifulInput;

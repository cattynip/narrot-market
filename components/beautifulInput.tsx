import { randomId } from '@libs/client/randoms';
import { joinClass } from '@libs/client/utils';
import React, { forwardRef, useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
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
  defaultValue?: string | null;
  isChatInput?: boolean;
}

export type BeautifulInputRef = HTMLInputElement;

const BeautifulInput = forwardRef<BeautifulInputRef, BeautifulInputProps>(
  (
    {
      inputType,
      placeholder,
      label,
      error,
      register,
      id,
      isRequired,
      defaultValue,
      isChatInput
    },
    ref
  ) => {
    const [inputId, setInputId] = useState<string | undefined>(id);

    useEffect(() => {
      if (!id || !inputId) {
        setInputId(randomId({}).id);
      }
    }, []);

    return (
      <div>
        {label ? (
          <BeautifulLabel
            content={label}
            error={error}
            isRequired={isRequired}
            htmlFor={inputId}
          />
        ) : null}
        {inputType === 'description' ? (
          <BeautifulTextarea
            placeholder={placeholder}
            isRequired={isRequired ? true : false}
            error={error ? true : false}
            register={register}
            defaultValue={defaultValue ? defaultValue : ''}
            id={id}
          />
        ) : (
          <input
            type={inputType}
            placeholder={placeholder}
            required={isRequired}
            id={inputId}
            defaultValue={defaultValue ? defaultValue : ''}
            {...register}
            {...ref}
            className={joinClass(
              'transition-colors placeholder:transition placeholder:focus:text-transparent appearance-none w-full px-3 py-2 border-gray-300 rounded-md shadow-sm placeholder:text-gray-600 focus:outline-none border',
              isChatInput
                ? 'absolute w-full max-w-xl mx-auto bottom-18 z-10'
                : '',
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

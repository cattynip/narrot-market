import { joinClass } from '@libs/client/utils';
import React, { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface BeautifulTextareaProps {
  placeholder: string;
  isRequired: boolean;
  error?: boolean;
  register?: UseFormRegisterReturn;
  id?: string;
}

export type BeautifulTextareaRef = HTMLTextAreaElement;

const BeautifulTextarea = forwardRef<BeautifulTextareaRef, BeautifulTextareaProps>(
  ({ placeholder, error, register, id, isRequired }, ref) => {
    return (
      <textarea
        className={joinClass(
          'transition-all placeholder:transition placeholder:focus:text-transparent appearance-none w-full px-3 py-2 rounded-md shadow-sm placeholder:text-gray-600 focus:outline-none border',
          error
            ? 'border-red-500 border-3 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
        )}
        placeholder={placeholder}
        required={isRequired}
        id={id}
        {...register}
        {...ref}
      />
    );
  }
);

export default BeautifulTextarea;


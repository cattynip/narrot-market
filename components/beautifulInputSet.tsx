import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import BeautifulInput from './beautifulInput';
import BeautifulLabel from './beautifulLabel';

interface BeautifulInputSetProps {
  inputType: React.HTMLInputTypeAttribute;
  placeholder: string;
  label: string;
  isRequired?: boolean;
}

const BeautifulInputSet = ({
  inputType,
  placeholder,
  label,
  isRequired,
  ...rest
}: BeautifulInputSetProps) => {
  return (
    <div>
      <BeautifulLabel
        htmlFor={label}
        content={label}
        isRequired={isRequired ? true : false}
      />
      <BeautifulInput
        inputType={inputType}
        placeholder={placeholder}
        isRequired={isRequired ? true : false}
        id={label}
        {...rest}
      />
    </div>
  );
};

export default BeautifulInputSet;

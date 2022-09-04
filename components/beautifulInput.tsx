import React from 'react';

interface BeautifulInputProps {
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  isReuqired?: boolean;
  id?: string;
}

const BeautifulInput = ({
  type,
  placeholder,
  isReuqired,
  id,
  ...rest
}: BeautifulInputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      required={isReuqired}
      id={id}
      className="transition-colors placeholder:transition placeholder:focus:text-transparent appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-600 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
      {...rest}
    />
  );
};

export default BeautifulInput;
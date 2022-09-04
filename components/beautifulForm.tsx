import React from 'react';
import BeautifulButton from './beautifulButton';
import BeautifulInput from './beautifulInput';
import BeautifulLabel from './beautifulLabel';

interface Topic {
  title: string;
  placeholder: string;
  inputType: React.HTMLInputTypeAttribute;
  isRequired?: boolean;
}

interface BeautifulFormProps {
  topics: Topic[];
  applyText: string;
}

const BeautifulForm = ({ topics, applyText }: BeautifulFormProps) => {
  return (
    <div>
      {[...topics].map((value, idx) => (
        <div className="space-y-2" key={idx}>
          <BeautifulLabel
            htmlFor={value.title}
            content={value.title}
            isRequired={value.isRequired}
          />
          <BeautifulInput
            type={value.inputType}
            placeholder={value.placeholder}
            id={value.title}
          />
        </div>
      ))}
      <BeautifulButton buttonText={applyText} />
    </div>
  );
};

export default BeautifulForm;

import type { NextPage } from 'next';
import React from 'react';
import BeautifulForm from '../components/beautifulForm';
import Layout from '../components/layout';

const FormPractice: NextPage = () => {
  return (
    <Layout title="Form Practice">
      <div className="w-full space-y-2">
        <BeautifulForm
          topics={[
            {
              title: 'Username',
              placeholder: 'Enter Username',
              inputType: 'text',
              isRequired: true
            },
            {
              title: 'Email',
              placeholder: 'Enter Email',
              inputType: 'email',
              isRequired: true
            },
            {
              title: 'password',
              placeholder: 'Enter Password',
              inputType: 'password',
              isRequired: true
            }
          ]}
          applyText="Apply"
        />
      </div>
    </Layout>
  );
};

export default FormPractice;

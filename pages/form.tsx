import type { NextPage } from 'next';
import React from 'react';
import { useForm } from 'react-hook-form';
import BeautifulButton from '../components/beautifulButton';
import Layout from '../components/layout';

const FormPractice: NextPage = () => {
  const { register } = useForm();

  return (
    <Layout title="Form Practice">
      <div className="w-full space-y-2">
        <input placeholder="Username" type="text" {...register('username')} />
        <input placeholder="Email" type="email" {...register('email')} />
        <input
          placeholder="Password"
          type="password"
          {...register('password')}
        />
        <BeautifulButton buttonText="Apply" />
      </div>
    </Layout>
  );
};

export default FormPractice;

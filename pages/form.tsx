import type { NextPage } from 'next';
import React from 'react';
import { useForm } from 'react-hook-form';
import BeautifulButton from '../components/beautifulButton';
import Layout from '../components/layout';

const FormPractice: NextPage = () => {
  const { register, handleSubmit } = useForm();

  const onValid = () => {
    console.log('onvalid');
  };

  const onInvalid = () => {
    console.log('oninvalid');
  };

  return (
    <Layout title="Form Practice">
      <form onSubmit={handleSubmit(onValid, onInvalid)}>
        <input
          placeholder="Username"
          type="text"
          {...register('username', {
            required: true
          })}
        />
        <input
          placeholder="Email"
          type="email"
          {...(register('email'),
          {
            required: true
          })}
        />
        <input
          placeholder="Password"
          type="password"
          {...register('password', {
            required: true
          })}
        />
        <BeautifulButton buttonText="Apply" />
      </form>
    </Layout>
  );
};

export default FormPractice;

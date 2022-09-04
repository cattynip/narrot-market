import type { NextPage } from 'next';
import React from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import BeautifulButton from '../components/beautifulButton';
import Layout from '../components/layout';

interface LoginForm {
  username: string;
  password: string;
  email: string;
}

const FormPractice: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({
    mode: 'onChange'
  });

  const onValid = (/* data: LoginForm */) => {
    console.log('onvalid');
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <Layout title="Form Practice">
      <form onSubmit={handleSubmit(onValid, onInvalid)}>
        <input
          placeholder="Username"
          type="text"
          className={errors.username ? 'border-red-500' : ''}
          {...register('username', {
            required: {
              value: true,
              message: 'Username is required'
            },
            maxLength: {
              value: 25,
              message: 'Username is too long'
            },
            minLength: {
              value: 2,
              message: 'Username is too short'
            }
          })}
        />
        <input
          placeholder="Email"
          type="email"
          className={errors.email ? 'border-red-500' : ''}
          {...register('email', {
            required: {
              value: true,
              message: 'Email is required'
            },
            validate: {
              notGmail: value =>
                !value.includes('@gmail.com') || "We don't accept @gmail.com"
            }
          })}
        />
        <input
          placeholder="Password"
          type="password"
          className={errors.password ? 'border-red-500' : ''}
          {...register('password', {
            required: {
              value: true,
              message: 'Password is required'
            },
            minLength: {
              value: 10,
              message: 'Password has to be at least 10.'
            }
          })}
        />
        <p>{errors?.username?.message}</p>
        <p>{errors?.email?.message}</p>
        <p>{errors?.password?.message}</p>
        <BeautifulButton buttonText="Apply" />
      </form>
    </Layout>
  );
};

export default FormPractice;

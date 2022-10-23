import type { NextPage } from 'next';
import Layout from '@components/layout';
import useUser from '@libs/client/useUser';
import BeautifulInput from '@components/beautifulInput';
import { useForm } from 'react-hook-form';
import { PostEditUserBody } from 'pages/api/users/me/edit';
import BeautifulButton from '@components/beautifulButton';
import useMutation from '@libs/client/useMutation';
import { useEffect } from 'react';

const ProfileEdit: NextPage = () => {
  const { user } = useUser(true);
  const [edit, { loading, data }] = useMutation('/api/user/me/edit');
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors }
  } = useForm<PostEditUserBody>();

  useEffect(() => {
    if (user?.name) {
      setValue('name', user.name);
    }

    if (user?.email) {
      setValue('email', user.email);
    }

    if (user?.phone) {
      setValue('phone', +user.phone);
    }
  }, [user, setValue]);

  const onValid = (validForm: PostEditUserBody) => {
    if (
      (!validForm.email && validForm.phone) ||
      (validForm.email && !validForm.phone)
    ) {
      console.log(validForm);
    } else if (validForm.email && validForm.phone) {
      setError('email', { message: 'Only one field of two must exist.' });
      setError('phone', { message: 'Only one field of two must exist.' });
    }
  };

  return (
    <Layout title="Edit Profile">
      <form onSubmit={handleSubmit(onValid)} className="space-y-4">
        <div className="flex justify-start items-center space-x-3">
          <div className="w-20 h-20 bg-gray-500 rounded-full" />
          <label htmlFor="change" className="font-bold text-2xl cursor-pointer">
            Change Photo
          </label>
          <input className="hidden" type="file" id="change" accept="image/*" />
        </div>
        <div>
          <BeautifulInput
            inputType="text"
            placeholder="Your Name"
            label="Your Name"
            id="user-name"
            register={register('name', {
              required: {
                value: true,
                message: 'Name is requried.'
              }
            })}
            error={errors.name?.message}
            isRequired
          />
        </div>
        <div className="space-y-2">
          <BeautifulInput
            inputType="email"
            placeholder="Your Email Address"
            label="Email address"
            id="user-email"
            register={register('email')}
            error={errors.email?.message}
            defaultValue={user?.email}
          />
        </div>
        <div>
          <BeautifulInput
            inputType="number"
            placeholder="Your Phone Address"
            label="Phone Address"
            id="user-phone"
            register={register('phone')}
            error={errors.phone?.message}
            defaultValue={user?.phone}
          />
        </div>
        <BeautifulButton buttonText={loading ? 'Loading...' : 'Edit Profile'} />
      </form>
    </Layout>
  );
};

export default ProfileEdit;

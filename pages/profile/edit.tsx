import type { NextPage } from 'next';
import Layout from '@components/layout';
import useUser from '@libs/client/useUser';
import BeautifulInput from '@components/beautifulInput';
import { useForm } from 'react-hook-form';
import BeautifulButton from '@components/beautifulButton';
import useMutation from '@libs/client/useMutation';
import { useEffect } from 'react';
import { PostEditUserBody, PostUserMeResponse } from 'pages/api/users/me';
import { useRouter } from 'next/router';

interface PostEditUserForm extends PostEditUserBody {
  form: string;
}

const ProfileEdit: NextPage = () => {
  const { user } = useUser(true);
  const router = useRouter();
  const [editProfile, { loading, data }] =
    useMutation<PostUserMeResponse>('/api/users/me');
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors }
  } = useForm<PostEditUserForm>();

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

  useEffect(() => {
    if (data && !data.ok && data.error) {
      if (watch().email === '') {
        setError('phone', { message: data.error });
      }

      if (String(watch().phone) === '') {
        setError('email', { message: data.error });
      }
    } else if (data && data.ok && !data.error) {
      router.push('/profile');
    }
  }, [data, setError]);

  const onValid = (validForm: PostEditUserBody) => {
    if (
      (!validForm.email && validForm.phone) ||
      (validForm.email && !validForm.phone)
    ) {
      if (loading) return;
      return editProfile(validForm);
    } else if (validForm.email && validForm.phone) {
      setError('email', { message: 'Only one field of two must exist.' });
      setError('phone', { message: 'Only one field of two must exist.' });
      return;
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

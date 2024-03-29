import GlobalButton from '@components/GlobalButton';
import GlobalInput from '@components/GlobalInput';
import GlobalLabel from '@components/GlobalLabel';
import ImageBadge from '@components/ImageBadge';
import PageLayout from '@components/PageLayout';
import useMutation from '@libs/client/useMutation';
import useUser from '@libs/client/useUser';
import { IAPIEditProfileReturn } from '@pages/api/profile/edit';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface EditProfileForm {
  name: string;
  avatar: FileList;
  email?: string;
  phone?: string;
}

const ProfileEdit: NextPage = () => {
  const [editProfile, { loading: editProfileLoading }] =
    useMutation<IAPIEditProfileReturn>('/api/profile/edit');
  const { user } = useUser();
  const router = useRouter();
  const [userAvatarUrl, setUserAvatarUrl] = useState<string>(
    `https://imagedelivery.net/WBCziywbOKp6BAE-wJa2BQ/${user?.avatar}/public`
  );
  const { register, handleSubmit, setError, setValue, watch } =
    useForm<EditProfileForm>({
      defaultValues: {
        name: user?.name,
        email: user?.email,
        phone: user?.phone
      }
    });

  useEffect(() => {
    if (!user) return;

    setValue('name', user.name);
    setValue('email', user?.email);
    setValue('phone', user?.phone);
    setUserAvatarUrl(
      `https://imagedelivery.net/WBCziywbOKp6BAE-wJa2BQ/${user?.avatar}/public`
    );
  }, [user, setValue]);

  const onValid = async (formData: EditProfileForm) => {
    if (!formData) return;

    if (
      formData.email === '' &&
      formData.phone === '' &&
      formData.name === ''
    ) {
      return setError('name', {
        message: 'You have to put one of these inputs'
      });
    }

    if (avatar && avatar.length > 0 && user?.name) {
      const response = await (await fetch('/api/images')).json();

      const form = new FormData();
      form.append('file', avatar[0], user.name);

      await fetch(response.uploadURL, {
        method: 'POST',
        body: form
      });

      console.log(response);

      editProfile({
        ...formData,
        avatar: response.id
      });
    }
    router.push(`/users/${user.name}`);
  };

  const avatar = watch('avatar');

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      const blobUrl = URL.createObjectURL(file);
      setUserAvatarUrl(blobUrl);
    }
  }, [avatar]);

  return (
    <PageLayout title="Edit Profile">
      <div className="flex items-center justify-start space-x-5 border-b-2 pb-5">
        <img
          src={`https://imagedelivery.net/WBCziywbOKp6BAE-wJa2BQ/${user?.avatar}/avatar`}
          alt={'The Avatar of you'}
          width={300}
          height={300}
          className="relative h-24 w-24 overflow-hidden rounded-full bg-slate-500"
        />
        <GlobalButton className="m-0 w-auto p-0">
          <GlobalLabel
            className="cursor-pointer px-3 py-1"
            content={'Change Avatar'}
            isRequired={false}
            htmlFor="editProfile"
          />
        </GlobalButton>
        <GlobalInput
          inputFor="picture"
          id="editProfile"
          register={register('avatar')}
        />
      </div>
      <form onSubmit={handleSubmit(onValid)} className="space-y-3 pt-5">
        <div>
          <GlobalLabel content="Name" isRequired />
          <GlobalInput
            inputFor="text"
            placeholder="Cattynip"
            register={register('name')}
          />
        </div>
        <div>
          <GlobalLabel content="Email Address" isRequired />
          <GlobalInput
            inputFor="email"
            register={register('email', {
              required: false
            })}
            required={false}
          />
        </div>
        <div>
          <GlobalLabel content="Phone Address" isRequired />
          <GlobalInput
            inputFor="phone"
            extraInformation={{ supportText: '+82' }}
            register={register('phone', {
              required: false
            })}
            required={false}
          />
        </div>
        <div>
          <GlobalButton className="mt-3">
            {editProfileLoading ? 'Editing...' : 'Update'}
          </GlobalButton>
        </div>
      </form>
    </PageLayout>
  );
};

export default ProfileEdit;

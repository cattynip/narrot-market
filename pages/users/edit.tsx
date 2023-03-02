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
  const { register, handleSubmit, setError, watch } =
    useForm<EditProfileForm>();
  const [editProfile, { loading: editProfileLoading }] =
    useMutation<IAPIEditProfileReturn>('/api/profile/edit');
  const { user } = useUser();
  const router = useRouter();
  const [userAvatarUrl, setUserAvatarUrl] = useState<string>('');

  const onValid = (formData: EditProfileForm) => {
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

    editProfile({
      ...formData
    });

    router.push(`/users/${user.name}`);
  };

  const avatar = watch('avatar');

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setUserAvatarUrl(URL.createObjectURL(file));
    }
  }, [avatar]);

  return (
    <PageLayout title="Edit Profile">
      <div className="flex items-center justify-start space-x-5 border-b-2 pb-5">
        <ImageBadge
          isCircle
          className="absolute w-full"
          src={userAvatarUrl}
          alt="User Avatar"
          width={300}
          height={300}
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
            defaultValue={user?.name}
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
            defaultValue={user?.email}
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
            defaultValue={user?.phone}
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

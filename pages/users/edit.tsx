import GlobalButton from '@components/GlobalButton';
import GlobalInput from '@components/GlobalInput';
import GlobalLabel from '@components/GlobalLabel';
import PageLayout from '@components/PageLayout';
import useMutation from '@libs/client/useMutation';
import useUser from '@libs/client/useUser';
import { IAPIEditProfileReturn } from '@pages/api/profile/edit';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

interface EditProfileForm {
  name: string;
  email?: string;
  phone?: string;
}

const ProfileEdit: NextPage = () => {
  const { register, handleSubmit } = useForm<EditProfileForm>();
  const [editProfile, { loading: editProfileLoading }] =
    useMutation<IAPIEditProfileReturn>('/api/profile/edit');
  const { user } = useUser();
  const router = useRouter();

  const onValid = (formData: EditProfileForm) => {
    if (!formData) return;

    editProfile({
      ...formData
    });

    router.push(`/users/${user.name}`);
  };

  return (
    <PageLayout title="Edit Profile">
      <div className="flex items-center justify-start space-x-5 border-b-2 pb-5">
        <div className="h-24 w-24 rounded-full bg-slate-500" />
        <GlobalButton className="w-auto p-3">Change Avatar</GlobalButton>
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

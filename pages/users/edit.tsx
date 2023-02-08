import GlobalButton from '@components/GlobalButton';
import GlobalInput from '@components/GlobalInput';
import GlobalLabel from '@components/GlobalLabel';
import PageLayout from '@components/PageLayout';
import type { NextPage } from 'next';

const ProfileEdit: NextPage = () => {
  return (
    <PageLayout title="Edit Profile">
      <div className="flex items-center justify-start space-x-5 border-b-2 pb-5">
        <div className="h-24 w-24 rounded-full bg-slate-500" />
        <GlobalButton className="w-auto p-3">Change Avatar</GlobalButton>
      </div>
      <div className="space-y-3 pt-5">
        <div>
          <GlobalLabel content="Name" isRequired />
          <GlobalInput inputFor="text" placeholder="Cattynip" />
        </div>
        <div>
          <GlobalLabel content="Email Address" isRequired />
          <GlobalInput inputFor="email" />
        </div>
        <div>
          <GlobalLabel content="Phone Address" isRequired />
          <GlobalInput
            inputFor="phone"
            extraInformation={{ supportText: '+82' }}
          />
        </div>
        <div>
          <GlobalButton className="mt-3">Update</GlobalButton>
        </div>
      </div>
      <div></div>
    </PageLayout>
  );
};

export default ProfileEdit;

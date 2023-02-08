import PageLayout from '@components/PageLayout';
import useUser from '@libs/client/useUser';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProfileIndexPage: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(`/users/${user.name}/`);
    }
  }, [user, router]);

  return (
    <PageLayout title="Wait for a second...">
      <div />
    </PageLayout>
  );
};

export default ProfileIndexPage;

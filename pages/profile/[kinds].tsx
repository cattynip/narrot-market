import type { NextPage } from 'next';
import Layout from '@components/layout';
import useUser from '@libs/client/useUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  checkKinds,
  generateKinds,
  translateToKorean
} from '@libs/client/generateKinds';
import ProductsList from '@components/productsList';

const ProfileBought: NextPage = () => {
  const { user } = useUser(true);
  const router = useRouter();
  const kinds = router.query.kinds;

  useEffect(() => {
    if (!checkKinds({ kind: kinds, forQuery: true })) {
      router.replace('/profile');
    }
  }, [router.query]);

  return (
    <Layout title="Profile" canGoBack>
      <div className="p-5">
        <h1 className="font-extrabold text-4xl pb-5">
          {user?.name} 의 {translateToKorean(generateKinds(kinds))}목록
        </h1>
        <ProductsList kind={generateKinds(kinds)} userId={user?.id} />
      </div>
    </Layout>
  );
};

export default ProfileBought;

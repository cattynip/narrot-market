import PageLayout from '@components/PageLayout';
import ProductItem from '@components/ProductItem';
import capitalizeFirstLetter from '@libs/client/stringManagement';
import { convertKindToNumber } from '@libs/server/cleanId';
import { IAPIGetUserKindProductsReturns } from '@pages/api/profile/[id]/[kind]';
import { IAPIUserSearchForName } from '@pages/api/users/search/[name]';
import { RecordType } from '@prisma/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

const ProfileDetail: NextPage = () => {
  const router = useRouter();
  const {
    query: { user, kind }
  } = router;

  const [convertedKind, setConvertedKind] = useState<number>(0);

  const { data: userId } = useSWR<IAPIUserSearchForName>(
    user ? `/api/users/search/${user}` : ''
  );

  const { data } = useSWR<IAPIGetUserKindProductsReturns>(
    convertedKind !== 0 && userId?.id
      ? `/api/profile/${userId.id}/${convertedKind}`
      : ''
  );

  useEffect(() => {
    if (typeof kind === 'undefined' || typeof user === 'undefined') {
      return;
    }

    if (kind !== 'purchase' && kind !== 'sale' && kind !== 'fav') {
      router.back();
      return;
    }

    setConvertedKind(
      convertKindToNumber(capitalizeFirstLetter(kind) as RecordType)
    );
  }, [kind, router, user]);

  return (
    <PageLayout
      title={
        typeof kind !== 'string'
          ? 'wait for a second...'
          : capitalizeFirstLetter(kind as string)
      }
    >
      <div>
        {data?.foundRecords.map((profileItem, profileItemIndex) => (
          <ProductItem
            key={profileItemIndex}
            title={profileItem.product.name}
            price={profileItem.product.price}
            imageSrc="/"
            isFirst={profileItemIndex === 0}
            productId={profileItem.product.id}
            favourite={{
              value: profileItem.product._count.favourites,
              isFavourite: Boolean(profileItem.product.favourites.length === 1)
            }}
            comment={{
              value: profileItem.product.comments,
              isCommented: false
            }}
          />
        ))}
      </div>
    </PageLayout>
  );
};

export default ProfileDetail;

import PageLayout from '@components/PageLayout';
import ProductItem from '@components/ProductItem';
import { NextPage } from 'next';

const ProfileDetail: NextPage = () => {
  return (
    <PageLayout title="Kind">
      <div>
        {[...Array(40)].map((_profileItem, profileItemIndex) => (
          <ProductItem
            key={profileItemIndex}
            title="iPhone 20"
            price={699}
            imageSrc="/"
            isFirst={profileItemIndex === 0}
            favourite={{
              value: 24,
              isFavourite: true
            }}
            comment={{
              value: 44,
              isCommented: false
            }}
          />
        ))}
      </div>
    </PageLayout>
  );
};

export default ProfileDetail;

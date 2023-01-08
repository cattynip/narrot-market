import ProductItem from '@components/ProductItem';
import { NextPage } from 'next';

const ProfileDetail: NextPage = () => {
  return (
    <div>
      <div>
        {[...Array(40)].map((_profileItem, profileItemIndex) => (
          <ProductItem
            key={profileItemIndex}
            title="iPhone 20"
            price={699}
            imageSrc="/"
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
    </div>
  );
};

export default ProfileDetail;

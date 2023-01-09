import type { NextPage } from 'next';
import HelpButton from '@components/HelpButton';
import Icon from '@components/Icon';
import ProductItem from '@components/ProductItem';
import PageLayout from '@components/PageLayout';

const Home: NextPage = () => {
  return (
    <PageLayout title="Home">
      {[...Array(10)].map((_productItem, productItemIndex) => (
        <ProductItem
          key={productItemIndex}
          title="New iPhone 14"
          imageSrc="/"
          price={56}
          isFirst={productItemIndex === 0}
          favourite={{
            value: 34,
            isFavourite: true
          }}
          comment={{
            value: 102,
            isCommented: false
          }}
        />
      ))}
      <HelpButton linkTo="/items/upload">
        <Icon
          d="plus"
          size={30}
          hightColor={{
            variable: true,
            highlightType: {
              true: 'whiteHightlight',
              false: 'whiteHightlight'
            }
          }}
        />
      </HelpButton>
    </PageLayout>
  );
};

export default Home;

import type { NextPage } from 'next';
import HelpButton from '../components/HelpButton';
import Icon from '../components/Icon';
import ProductItem from '../components/ProductItem';

const Home: NextPage = () => {
  return (
    <div>
      {[...Array(10)].map((_productItem, productItemIndex) => (
        <ProductItem
          key={productItemIndex}
          title="New iPhone 14"
          imageSrc="/"
          price={56}
          favourite={{
            value: 34,
            isFavourite: true
          }}
          comment={{
            value: 102,
            isCommented: true
          }}
        />
      ))}
      <HelpButton>
        <Icon
          d="plus"
          size={7}
          isHighlighted={false}
          fill="#ffffff"
          stroke="#ffffff"
        />
      </HelpButton>
    </div>
  );
};

export default Home;

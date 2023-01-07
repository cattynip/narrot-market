import type { NextPage } from 'next';
import HelpButton from '../components/HelpButton';
import ProductItem from '../components/ProductItem';

const Home: NextPage = () => {
  return (
    <div>
      {[...Array(10)].map((_value, itemIndex) => (
        <ProductItem
          key={itemIndex}
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
        <svg
          className="h-7 w-7"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </HelpButton>
    </div>
  );
};

export default Home;

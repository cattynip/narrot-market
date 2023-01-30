import type { NextPage } from 'next';
import HelpButton from '@components/HelpButton';
import Icon from '@components/Icon';
import ProductItem from '@components/ProductItem';
import PageLayout from '@components/PageLayout';
import useSWR from 'swr';
import { IAPIProductsReturn } from './api/products';

const Home: NextPage = () => {
  const { data, isLoading: productLoading } =
    useSWR<IAPIProductsReturn>('/api/products/');

  return (
    <PageLayout title="Home">
      {productLoading
        ? 'Finding Carrots...'
        : data?.datas?.map((productItem, productItemIndex) => (
            <ProductItem
              key={productItemIndex}
              productId={productItem.id}
              title={productItem.name}
              imageSrc="/"
              price={productItem.price}
              isFirst={productItemIndex === 0}
              favourite={{
                value: productItem._count.favourites,
                isFavourite: false
              }}
              comment={{
                value: productItem.comments,
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

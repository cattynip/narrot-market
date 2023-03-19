import type { NextPage } from 'next';
import HelpButton from '@components/HelpButton';
import Icon from '@components/Icon';
import ProductItem from '@components/ProductItem';
import PageLayout from '@components/PageLayout';
import { IAPIProductsReturn, IProduct } from '@pages/api/products/index';
import useSWR, { SWRConfig } from 'swr';
import client from '@libs/server/client';

const Home: NextPage = () => {
  const { data } = useSWR<IAPIProductsReturn>('/api/products');

  return (
    <PageLayout title="Home">
      {!data
        ? 'Loading...'
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
                isFavourite: Boolean(productItem.favourites.length === 1)
              }}
              comment={{
                value: productItem.comments,
                isCommented: false
              }}
            />
          ))}
      {/* <Image */}
      {/*   src={Bodwell} */}
      {/*   className="w-full" */}
      {/*   placeholder="blur" */}
      {/*   alt="Bodwell Logo" */}
      {/*   quality={100} */}
      {/* /> */}
      <HelpButton linkTo="/products/upload">
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

const Page: NextPage<{ products: IProduct }> = ({ products }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          '/api/products': {
            ok: true,
            products
          }
        }
      }}
    >
      <Home />
    </SWRConfig>
  );
};

export async function getServerSideProps() {
  const products = await client.product.findMany({});

  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  };
}

export default Page;

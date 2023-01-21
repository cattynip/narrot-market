import type { NextPage } from 'next';
import HelpButton from '@components/HelpButton';
import Icon from '@components/Icon';
import ProductItem from '@components/ProductItem';
import PageLayout from '@components/PageLayout';
import useSWR from 'swr';
import useUser from '@libs/client/useUser';

interface IProduct {
  id: number;
  name: string;
  price: number;
  descriptoin: string;
  userId: number;
  userName: string;
  userAvatar: string;
  favourites: IFavourtie[];
}

interface IFavourtie {
  id: string;
  userId: number;
}

interface IAPIProductsReturn {
  ok: boolean;
  datas: IProduct[];
}

const Home: NextPage = () => {
  const { data, isLoading: productLoading } =
    useSWR<IAPIProductsReturn>('/api/products/');
  const { user, isLoading: userLoading } = useUser();

  return (
    <PageLayout title="Home">
      {productLoading
        ? 'Finding Carrots...'
        : data?.datas.map((productItem, productItemIndex) => (
            <ProductItem
              key={productItemIndex}
              productId={productItem.id}
              title={productItem.name}
              imageSrc="/"
              price={productItem.price}
              isFirst={productItemIndex === 0}
              favourite={{
                value: productItem.favourites.length,
                isFavourite: userLoading
                  ? false
                  : Boolean(
                      productItem.favourites.find(object => {
                        return object.userId === user?.id;
                      })
                    )
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

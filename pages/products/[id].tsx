import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import GlobalButton from '@components/GlobalButton';
import Icon from '@components/Icon';
import SmilarItem from '@components/SmilarItem';
import PageLayout from '@components/PageLayout';
import useSWR from 'swr';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { IAPISimilarProductReturn } from '@pages/api/products/[id]/similar';
import useMutation from '@libs/client/useMutation';
import { IAPIProductReturn } from '@pages/api/products/[id]';
import useUser from '@libs/client/useUser';
import Image from 'next/image';
import client from '@libs/server/client';
import cleanId from '@libs/server/cleanId';

const ItemDetail: NextPage<IAPIProductReturn> = ({ foundProduct }) => {
  const router = useRouter();
  const { id } = router.query;
  const user = useUser();

  const { data: productData, mutate: productMutate } =
    useSWR<IAPIProductReturn>(id ? `/api/products/${id}` : null);
  const { data: similarData, isLoading: isSimilarDataLoading } =
    useSWR<IAPISimilarProductReturn>(id ? `/api/products/${id}/similar` : '');
  const [toggleFav] = useMutation(`/api/products/${id}/fav`);

  useEffect(() => {
    if (!foundProduct) {
      return;
    }
  }, [foundProduct]);

  const onFavButtonClick = () => {
    if (!productData || !foundProduct) return;

    const wasFav = Boolean(foundProduct.favourites.length === 1);

    toggleFav();

    console.log(wasFav);

    productMutate(
      prev =>
        prev && {
          ...prev,
          foundProduct: {
            ...prev.foundProduct,
            favourites: wasFav ? [] : [{ userId: user.user.id }]
          }
        },
      false
    );
  };

  return (
    <PageLayout title={foundProduct.name}>
      <div>
        <div className="relative">
          <Image
            src={`https://imagedelivery.net/WBCziywbOKp6BAE-wJa2BQ/${foundProduct.image}/cover`}
            alt={`The image of ${foundProduct.name}`}
            width={728}
            height={364}
            className="w-full object-cover"
          />
          <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black to-transparent px-5 pb-5 text-6xl font-black text-white opacity-75">
            <h1>{foundProduct.name}</h1>
            <p>${foundProduct.price}</p>
          </div>
        </div>
        <div className="pt-5 pb-3">
          <Link href={`/users/${foundProduct.userName}`}>
            <div className="flex items-center justify-start">
              <Image
                src={`https://imagedelivery.net/WBCziywbOKp6BAE-wJa2BQ/${foundProduct.userAvatar}/avatar`}
                alt={`The Avatar of ${foundProduct.userName}`}
                width={56}
                height={56}
                quality={10}
                className={'h-14 w-14 rounded-full'}
              />
              <span className="ml-3 text-2xl font-bold">
                {foundProduct.userName}
              </span>
            </div>
          </Link>
        </div>
        <div className="space-y-2">
          <h4 className="mt-2 text-lg font-semibold">Description</h4>
          <p className="cursor-default pb-2 text-gray-600">
            {foundProduct.description}
          </p>
          <div className="flex items-center justify-between space-x-2">
            <GlobalButton className="flex-1 py-2">Talk to seller</GlobalButton>
            <button
              className="rounded-lg border-2 border-gray-300 p-1.5 shadow-lg"
              onClick={onFavButtonClick}
            >
              <Icon
                d={'heart'}
                size={24}
                hightColor={{
                  variable: Boolean(
                    productData
                      ? productData.foundProduct.favourites.length === 1
                      : foundProduct.favourites.length === 1
                  ),
                  highlightType: {
                    true: 'orangeHighlight',
                    false: 'empty'
                  }
                }}
              />
            </button>
          </div>
        </div>
      </div>
      <div>
        <h2 className="border-b-2 border-gray-400 pt-5 pb-1 text-2xl font-semibold">
          Similar Items
        </h2>
        <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 md:grid-cols-3">
          {isSimilarDataLoading
            ? 'Finding Similar Carrots'
            : similarData?.similarProducts.map(
                (similarItems, similarItemsIndex) => (
                  <SmilarItem
                    key={similarItemsIndex}
                    id={similarItems.id}
                    title={similarItems.name}
                    price={similarItems.price}
                    imageSrc={'/'}
                  />
                )
              )}
        </div>
      </div>
    </PageLayout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  // Fallback blocking
  //
  // This feature is that...
  // If the user visit to a route that has the getStaticProps or the getStaticPaths and it does not have any kind of HTMLs,
  // it will make the user wait just for a moment,
  // and generate the HTML file for it, and render it.
  return {
    paths: [],
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async context => {
  if (!context.params?.id) {
    return {
      props: {}
    };
  }

  if (typeof context.params?.id !== 'string') {
    return {
      props: {}
    };
  }

  const cleanProductId = cleanId(context.params.id);

  const foundProduct = await client.product.findUnique({
    where: {
      id: cleanProductId
    },
    select: {
      name: true,
      price: true,
      description: true,
      image: true,
      userName: true,
      userAvatar: true,
      favourites: {
        where: {
          userId: 1
        },
        select: {
          userId: true
        }
      }
    }
  });

  return {
    props: {
      foundProduct: JSON.parse(JSON.stringify(foundProduct))
    }
  };
};

export default ItemDetail;

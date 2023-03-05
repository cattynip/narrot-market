import { NextPage } from 'next';
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

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const user = useUser();

  const { data: productData, mutate: productMutate } =
    useSWR<IAPIProductReturn>(id ? `/api/products/${id}` : null);
  const { data: similarData, isLoading: isSimilarDataLoading } =
    useSWR<IAPISimilarProductReturn>(id ? `/api/products/${id}/similar` : '');
  const [toggleFav] = useMutation(`/api/products/${id}/fav`);

  useEffect(() => {
    if (!productData) {
      return;
    }

    if (productData.ok === false) {
      router.push('/');
    }
  }, [productData, router, similarData]);

  const onFavButtonClick = () => {
    if (!productData) return;

    const wasFav = Boolean(productData?.foundProduct.favourites.length === 1);

    toggleFav();

    productMutate(
      {
        ...productData,
        foundProduct: {
          ...productData.foundProduct,
          favourites: wasFav ? [] : [{ userId: user.user.id }]
        }
      },
      false
    );
  };

  return (
    <PageLayout title={productData?.foundProduct.name}>
      <div>
        <div className="relative">
          <img
            src={`https://imagedelivery.net/WBCziywbOKp6BAE-wJa2BQ/${productData?.foundProduct.image}/cover`}
            alt={`The image of ${productData?.foundProduct.name}`}
            className="w-full object-cover"
          />
          <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black to-transparent px-5 pb-5 text-6xl font-black text-white opacity-75">
            <h1>{productData?.foundProduct.name}</h1>
            <p>${productData?.foundProduct.price}</p>
          </div>
        </div>
        <Link href={`/users/${productData?.foundProduct.userName}`}>
          <div className="flex items-center justify-start pt-5 pb-3">
            <div className="h-14 w-14 rounded-full bg-slate-500" />
            <span className="ml-3 text-2xl font-bold">
              {productData?.foundProduct.userName}
            </span>
          </div>
        </Link>
        <div className="space-y-2">
          <h4 className="mt-2 text-lg font-semibold">Description</h4>
          <p className="cursor-default pb-2 text-gray-600">
            {productData?.foundProduct.description}
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
                    productData?.foundProduct.favourites.length === 1
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

export default ItemDetail;

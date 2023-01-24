import { NextPage } from 'next';
import GlobalButton from '@components/GlobalButton';
import Icon from '@components/Icon';
import SmilarItem from '@components/SmilarItem';
import PageLayout from '@components/PageLayout';
import useSWR from 'swr';
import { IAPIProductReturn } from '@pages/api/products/[id]';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import isUserIn from '@libs/client/isUserIn';
import useUser from '@libs/client/useUser';
import Link from 'next/link';
import { IAPISimilarProductReturn } from '@pages/api/products/[id]/similar';
import { IAPIGetProductFavReturn } from '@pages/api/products/[id]/fav';
import useMutation from '@libs/client/useMutation';

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useSWR<IAPIProductReturn>(
    id ? `/api/products/${id}` : ''
  );
  const { data: similarData, isLoading: isSimilarDataLoading } =
    useSWR<IAPISimilarProductReturn>(id ? `/api/products/${id}/similar` : '');
  const { data: favData } = useSWR<IAPIGetProductFavReturn>(
    id ? `/api/products/${id}/fav` : ''
  );
  const [fav] = useMutation(`/api/products/${id}/fav`);
  const { user } = useUser();

  useEffect(() => {
    if (!data) {
      return;
    }

    if (data.ok === false) {
      router.push('/');
    }
  }, [data, router, similarData]);

  const onFavButtonClick = () => {
    fav({
      favId: favData?.foundFav?.id
    });
  };

  return (
    <PageLayout title={data?.foundProduct.name}>
      <div>
        <div className="relative flex h-80 w-full items-end justify-between bg-slate-400 bg-gradient-to-t from-black to-transparent px-4 pb-4 text-6xl font-black text-white">
          <h1>{data?.foundProduct.name}</h1>
          <p>${data?.foundProduct.price}</p>
        </div>
        <Link href={`/users/${data?.foundProduct.userName}`}>
          <div className="flex items-center justify-start pt-5 pb-3">
            <div className="h-14 w-14 rounded-full bg-slate-500" />
            <span className="ml-3 text-2xl font-bold">
              {data?.foundProduct.userName}
            </span>
          </div>
        </Link>
        <div className="space-y-2">
          <h4 className="mt-2 text-lg font-semibold">Description</h4>
          <p className="cursor-default pb-2 text-gray-600">
            {data?.foundProduct.description}
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
                  variable:
                    isLoading || !data?.foundProduct
                      ? false
                      : isUserIn(data?.foundProduct?.favourites, user?.id),
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

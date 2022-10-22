import type { NextPage } from 'next';
import Layout from '@components/layout';
import SimilarItems from '@components/smiliarItem';
import useSWR, { useSWRConfig } from 'swr';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GetProductResponse } from 'pages/api/products/[id]';
import useMutation from '@libs/client/useMutation';
import { GetProductFaveResponse } from 'pages/api/products/[id]/fav';

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data, mutate: boundMutate } = useSWR<GetProductResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );

  const [toggleFav] = useMutation<GetProductFaveResponse>(
    `/api/products/${router.query.id}/fav`
  );

  const onFavClick = () => {
    if (!data) return;
    boundMutate(prev => prev && { ...prev, isLiked: !prev.isLiked }, false);
    // mutate("/api/users/me", {ok: false}, false);
    toggleFav({});
  };

  return (
    <Layout title={`Items - ${data?.product.name}`} canGoBack>
      <div>
        <div>
          <div className="relative">
            <div className="h-96 bg-slate-300 bg-gradient-to-b from-transparent to-gray-500" />
            <div className="absolute w-full bottom-6 px-7 font-extrabold text-white text-5xl flex justify-between">
              <h1>{data?.product.name}</h1>
              <p>${data?.product.price}</p>
            </div>
          </div>
          <div className="px-5">
            <div className="flex flex-col pt-7 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 rounded-full bg-gray-500" />
                  <p className="text-lg font-medium">
                    {data?.product?.user?.name}
                  </p>
                </div>
                <div>
                  <Link href={`/users/profile/${data?.product.user.name}`}>
                    <a className="text-gray-500 text-sm">View profile &rarr;</a>
                  </Link>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-500 font-medium text-lg leading-5 tracking-wide">
                  {data?.product.description}
                </p>
                <div className="flex items-center justify-between mt-5 space-x-4">
                  <button className="transition-colors ease-in-out bg-orange-400 p-3 w-full text-white rounded-md hover:bg-orange-500 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 shadow-lg">
                    Talk to seller
                  </button>
                  <button
                    onClick={onFavClick}
                    className="transition-colors p-3 shadow-lg rounded-md"
                  >
                    <svg
                      className="h-7 w-7"
                      xmlns="http://www.w3.org/2000/svg"
                      fill={data?.isLiked ? '#f97316' : '#ffffff'}
                      viewBox="0 0 24 24"
                      stroke={data?.isLiked ? '#f97316' : '#6b7280'}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-extrabold text-2xl pb-3">Similar Items</h2>
              <div className="border-t-2 border-t-gray-300 pt-5 grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2">
                {data?.relatedProducts.map(product => (
                  <SimilarItems
                    title={product.name}
                    price={product.price}
                    id={product.id}
                    userInfo={{
                      name: product.user.name,
                      avatar: product.user.avatar
                    }}
                    key={product.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;

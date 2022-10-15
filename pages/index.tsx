import type { NextPage } from 'next';
import Item from '@components/item';
import Layout from '@components/layout';
import useUser from '@libs/client/useUser';
import Link from 'next/link';
import useSWR from 'swr';
import { GetProductsResponse } from './api/products';
import Badge from '@components/badge';

// `index` means the default route of a router of its father.
// All of the pages must have the type `NextPage` which Next.js provide for Typescript.

const Home: NextPage = props => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<GetProductsResponse>('/api/products');

  return (
    <Layout title="Home">
      <div className="flex flex-col">
        {data?.products?.map(product => (
          <Item
            title={product.name}
            price={product.price}
            favorites={product._count.favorites}
            isFavorited={Boolean(
              product.favorites.find(fav => {
                return fav.userId === user.id;
              })
            )}
            comments={5000}
            id={product.id}
            key={product.id}
          />
        ))}

        <Badge href='/products/upload'>
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
        </Badge>
      </div>
    </Layout >
  );
};

export default Home;

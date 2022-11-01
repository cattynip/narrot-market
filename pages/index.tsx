import type { NextPage } from 'next';
import Item from '@components/item';
import Layout from '@components/layout';
import useUser from '@libs/client/useUser';
import useSWR from 'swr';
import { GetProductsResponse } from './api/products';
import Badge from '@components/badge';
import Image from 'next/image';
import bodwellLogo from '../public/local.png';

const Home: NextPage = props => {
  const { user } = useUser(true);
  const { data } = useSWR<GetProductsResponse>('/api/products');

  return (
    <Layout title="Home">
      <div className="flex flex-col">
        {data?.products?.map(product => (
          <Item
            title={product.name}
            price={product.price}
            favorites={product._count.favs}
            isFavorited={Boolean(
              product.favs.find(fav => {
                if (!user?.id) return false;

                return fav.userId === user.id;
              })
            )}
            comments={5000}
            id={product.id}
            key={product.id}
          />
        ))}

        <Badge href="/products/upload">
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
        <Image src={bodwellLogo} placeholder="blur" quality={10} />
      </div>
    </Layout>
  );
};

export default Home;

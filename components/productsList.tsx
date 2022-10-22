import {
  checkKinds,
  generatedKindType,
  generateKinds,
  kindType
} from '@libs/client/generateKinds';
import { GetRecordsResponse } from 'pages/api/users/me/records';
import useSWR from 'swr';
import Item from './item';

interface IProductsListProps {
  kind: kindType | generatedKindType;
  userId: number | undefined;
}

const ProductsList = ({ kind, userId }: IProductsListProps) => {
  const { data } = useSWR<GetRecordsResponse>(
    checkKinds({ kind, forAPI: true })
      ? `/api/users/me/records?kind=${generateKinds(kind)}`
      : null
  );

  return (
    <div>
      {data?.foundItems?.map(item => (
        <Item
          title={item.product.name}
          price={item.product.price}
          favorites={item.product._count.favs}
          isFavorited={Boolean(
            item.product.favs.find(fav => {
              if (kind === 'fav' || kind === 'loved') return true;
              if (!userId) return false;
              return fav.userId === userId;
            })
          )}
          comments={5000}
          id={item.product.id}
          key={item.product.id}
        />
      ))}
    </div>
  );
};

export default ProductsList;

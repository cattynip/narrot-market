import Link from 'next/link';
import { RelatedProductUser } from 'pages/api/products/[id]';

interface SimilarItemsProps {
  title: string;
  price: number;
  userInfo: RelatedProductUser;
  id: number;
}

const SimilarItems = ({ title, price, id, userInfo }: SimilarItemsProps) => {
  return (
    <div>
      <Link href={`/products/${id}`}>
        <a>
          <div className="w-full aspect-square bg-slate-500 rounded-md" />
        </a>
      </Link>
      <div className="mt-2 flex justify-between items-center">
        <div className="flex items-center justify-center space-x-2">
          <Link href={`/users/profile/${userInfo.name}`}>
            <a>
              <div className="w-10 h-10 rounded-full bg-slate-500" />
            </a>
          </Link>
          <Link href={`/products/${id}`}>
            <a>
              <h3 className="font-bold">{title}</h3>
            </a>
          </Link>
        </div>
        <p className="text-gray-500">${price}</p>
      </div>
    </div>
  );
};

export default SimilarItems;

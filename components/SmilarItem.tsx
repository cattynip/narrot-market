import Link from 'next/link';

interface ISmilarItem {
  id: number;
  title: string;
  price: number;
  imageSrc: string;
}

/* eslint-disable */
const SmilarItem = ({ id, title, price, imageSrc }: ISmilarItem) => {
  return (
    <Link href={`/products/${id}`}>
      <div className="mb-4 h-60 w-full rounded-lg bg-slate-500" />
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-black">{title}</h5>
        <span className="text-gray-500">${price}</span>
      </div>
    </Link>
  );
};

export default SmilarItem;

import Link from 'next/link';

interface IStreamItem {
  id: number;
  title: string;
  price: string | number;
  userName: string;
}

const StreamItem = ({ id, title, price, userName }: IStreamItem) => {
  return (
    <Link href={`/streams/${id}`} className="border-b-2 pb-2">
      <div className="aspect-video rounded-md bg-slate-500" />
      <div className="-mb-2 flex  items-center justify-between">
        <Link href={`/users/${userName}`} className="flex pt-2 pl-2">
          <div className="mr-3 mb-2 h-8 w-8 rounded-full bg-slate-500" />
          <h2 className="text-lg font-semibold">{title}</h2>
        </Link>
        <h3 className="text-gray-600">${price}</h3>
      </div>
    </Link>
  );
};

export default StreamItem;

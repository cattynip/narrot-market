import Link from "next/link";

interface ItemProps {
  title: string;
  price: number;
  favorites: number;
  isFavorited: boolean;
  comments: number;
  id: number;
}

const Item = ({ title, price, favorites, isFavorited, comments, id }: ItemProps) => {
  return (
    <Link href={`/products/${id}`} >
      <a
        className="flex border-b py-4 px-4 cursor-pointer justify-between"
      >
        <div className="flex space-x-4">
          <div className="w-20 h-20 bg-gray-400 rounded" />
          <div>
            <h3 className="font-bold text-lg">{title}</h3>
            <div className="flex flex-col">
              <span className="text-sm">${price}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center space-x-3">
          <div className="flex justify-center items-center space-x-0.5">
            <svg
              className="w-5 h-5 mr-1"
              fill={isFavorited ? "#f97316" : "#00000000"}
              stroke={isFavorited ? "#f97316" : "#6b7280"}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
            <span>{favorites}</span>
          </div>
          <div className="flex justify-center items-center  space-x-0.5">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            <span>{comments}</span>
          </div>
        </div>
      </a>

    </Link>
  );
};

export default Item;

import ProductImage from './ProductImage';

interface IProductItem {
  title: string;
  price: number;
  imageSrc: string;
  favourite: {
    value: number;
    isFavourite: boolean;
  };
  comment: {
    value: number;
    isCommented: boolean;
  };
}

const ProductItem = ({
  title,
  price,
  imageSrc,
  favourite,
  comment
}: IProductItem) => {
  return (
    <div className="mt-2 flex w-full items-center justify-between border-t-2 border-gray-300 py-3">
      <div className="flex items-center justify-items-center">
        <ProductImage
          src={imageSrc}
          alt={title}
          className="h-28 w-28 rounded-md"
        />
        <div className="ml-4 mb-auto">
          <h3 className="text-xl">{title}</h3>
          <span>${price}</span>
        </div>
      </div>
      <div className="mt-auto flex space-x-2">
        <div className="text-md flex items-center justify-items-center space-x-1">
          <svg
            className="h-5 w-5"
            fill={favourite.isFavourite ? '#f97316' : 'none'}
            stroke={favourite.isFavourite ? '#f97316' : 'currentColor'}
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
          <span>{favourite.value}</span>
        </div>
        <div className="text-md flex items-center justify-items-center space-x-1">
          <svg
            className="h-5 w-5"
            fill={favourite.isFavourite ? '#f97316' : 'none'}
            stroke={favourite.isFavourite ? '#f97316' : 'currentColor'}
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
          <span>{comment.value}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

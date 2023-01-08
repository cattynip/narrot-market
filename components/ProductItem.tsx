import Icon from './Icon';
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
    <div className="flex w-full items-center justify-between border-t-2 border-gray-300 py-3">
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
        <div className="text-md flex items-center justify-items-center space-x-2">
          <Icon
            d="heart"
            size={19}
            hightColor={{
              variable: favourite.isFavourite,
              highlightType: {
                true: 'orangeHighlight',
                false: 'empty'
              }
            }}
          />
          <span>{favourite.value}</span>
        </div>
        <div className="text-md flex items-center justify-items-center space-x-1">
          <Icon
            d={'comment'}
            size={19}
            hightColor={{
              variable: comment.isCommented,
              highlightType: {
                true: 'orangeHighlight',
                false: 'empty'
              }
            }}
          />
          <span>{comment.value}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

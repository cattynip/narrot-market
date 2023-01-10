import { ImageProps } from 'next/image';
import joinClass from '@libs/client/joinClass';

interface IProductImage {
  src: string;
  className?: string;
}

const ProductImage = ({
  /* eslint-disable @typescript-eslint/no-unused-vars */
  src,
  className,
  ...imagePros
}: IProductImage & ImageProps) => {
  return (
    <div
      className={joinClass(['bg-slate-400', className ? className : ''])}
      {...imagePros}
    />
  );
};

export default ProductImage;

import Image, { ImageProps } from 'next/image';

interface IImageBadgeProps {
  isCircle?: boolean;
}

const ImageBadge = ({
  isCircle,
  ...imageProps
}: IImageBadgeProps & ImageProps) => {
  return (
    <>
      <div
        className={`relative h-24 w-24 overflow-hidden ${
          isCircle ? 'rounded-full' : 'rounded-none'
        } bg-slate-500`}
      >
        <Image {...imageProps} />
      </div>
    </>
  );
};

export default ImageBadge;

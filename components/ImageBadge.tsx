import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

interface IImageBadgeProps {
  isCircle?: boolean;
  alt: string;
  width?: number;
  height?: number;
  avatarUrl?: string | undefined;
}

const ImageBadge = ({
  isCircle,
  alt,
  width = 300,
  height = 300,
  avatarUrl
}: IImageBadgeProps) => {
  const [avatarSrc, setAvatarSrc] = useState<string>(
    `https://imagedelivery.net/WBCziywbOKp6BAE-wJa2BQ/${avatarUrl}/public`
  );

  useEffect(() => {
    setAvatarSrc(
      `https://imagedelivery.net/WBCziywbOKp6BAE-wJa2BQ/${avatarUrl}/public`
    );
  }, [avatarUrl]);

  return (
    <>
      <div
        className={`relative h-24 w-24 overflow-hidden ${
          isCircle ? 'rounded-full' : 'rounded-none'
        } bg-slate-500`}
      >
        <Image src={avatarSrc} alt={alt} width={width} height={height} />
      </div>
    </>
  );
};

export default ImageBadge;

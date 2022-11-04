import Link from 'next/link';
import Image from 'next/image';

interface StreamItemProps {
  title: string;
  videoId: string;
  streamId: string | number;
}

const StreamItem = ({ title, streamId, videoId }: StreamItemProps) => {
  return (
    <div className="pt-6">
      <Link href={`/stream/${streamId}`}>
        <a>
          <div className="w-full rounded-md shadow-sm aspect-video relative">
            <Image
              src={`https://videodelivery.net/${videoId}/thumbnails/thumbnail.jpg`}
              layout="fill"
              className="rounded-md"
            />
          </div>
          <span>{videoId}</span>
          <h3 className="font-semibold text-2xl text-gray-700 mt-2">{title}</h3>
        </a>
      </Link>
    </div>
  );
};

// src={`https://videodelivery.net/${videoId}/thumbnails/thumbnail.jpg?time=68s&height=270`}
export default StreamItem;

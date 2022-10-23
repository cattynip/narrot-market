import Link from 'next/link';

interface StreamItemProps {
  title: string;
  streamId: string | number;
}

const StreamItem = ({ title, streamId }: StreamItemProps) => {
  return (
    <div className="pt-6">
      <Link href={`/stream/${streamId}`}>
        <a>
          <div className="w-full rounded-md shadow-sm bg-slate-500 aspect-video" />
          <h3 className="font-semibold text-2xl text-gray-700 mt-2">{title}</h3>
        </a>
      </Link>
    </div>
  );
};

export default StreamItem;

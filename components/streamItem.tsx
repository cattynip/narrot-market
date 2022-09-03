interface StreamItemProps {
  title: string;
  streamId: string;
}

const StreamItem = ({ title, streamId }: StreamItemProps) => {
  return (
    <div className="pt-6">
      <a href={`/stream/${streamId}`}>
        <div className="w-full rounded-md shadow-sm bg-slate-500 aspect-video" />
        <h3 className="text-2xl text-gray-700 mt-2">{title}</h3>
      </a>
    </div>
  );
};

export default StreamItem;

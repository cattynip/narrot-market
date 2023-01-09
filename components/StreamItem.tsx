interface IStreamItem {
  title: string;
}

const StreamItem = ({ title }: IStreamItem) => {
  return (
    <div className="border-b-2 pb-2">
      <div className="aspect-video rounded-md bg-slate-500" />
      <h2 className="pt-2 pl-2 text-lg font-semibold">{title}</h2>
    </div>
  );
};

export default StreamItem;

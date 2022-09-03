interface SimilarItemsProps {
  title: string;
  price: number;
  id: number;
}

const SimilarItems = ({ title, price, id }: SimilarItemsProps) => {
  return (
    <a href={`${id}`}>
      <div className="w-full aspect-square bg-slate-500 rounded-md" />
      <div className="mt-2 flex justify-between items-center">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-slate-500" />
          <h3 className="font-bold">{title}</h3>
        </div>
        <p className="text-gray-500">${price}</p>
      </div>
    </a>
  );
};

export default SimilarItems;

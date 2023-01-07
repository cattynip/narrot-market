import { NextPage } from 'next';
import GlobalButton from '../../components/GlobalButton';
import Icon from '../../components/Icon';
import SmilarItem from '../../components/SmilarItem';

const ItemDetail: NextPage = () => {
  return (
    <div>
      <div>
        <div className="relative flex h-80 w-full items-end justify-between bg-slate-400 bg-gradient-to-t from-black to-transparent px-4 pb-4 text-6xl font-black text-white">
          <h1>Galzy S50</h1>
          <p>$140</p>
        </div>
        <div className="flex items-center justify-start pt-5 pb-3">
          <div className="h-14 w-14 rounded-full bg-slate-500" />
          <span className="ml-3 text-2xl font-bold">Steve Jebs</span>
        </div>
        <div className="space-y-2">
          <h4 className="mt-2 text-lg font-semibold">Description</h4>
          <p className="cursor-default pb-2 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            consectetur interdum accumsan. Mauris ornare laoreet suscipit. Ut
            ornare dapibus nisl, at rhoncus purus maximus sed. Curabitur
            interdum vestibulum tellus et commodo. Mauris vel felis nec massa
            sollicitudin gravida eu ut arcu. Suspendisse eleifend blandit dolor
            a posuere. Vivamus blandit, quam ultrices viverra sodales, libero
            est tempor nulla, non tristique nunc sem nec enim. Etiam maximus
            magna sed dignissim rhoncus. Ut pellentesque tincidunt nisi, a
            consequat dui volutpat vulputate. Curabitur volutpat, arcu id
            blandit volutpat, nunc orci volutpat leo, sodales vestibulum nibh
            eros eu magna. Integer ac fermentum nunc, a dignissim urna. Nunc
            erat eros, egestas sit amet ex ac, tincidunt lobortis erat. Cras
            mattis quam urna, ac pretium metus auctor id. Ut id sem lorem.
          </p>
          <div className="flex items-center justify-between space-x-2">
            <GlobalButton className="flex-1 py-2">Talk to seller</GlobalButton>
            <button className="rounded-lg border-2 border-gray-300 p-1.5 shadow-lg">
              <Icon d={'heart'} size={6} isHighlighted={true} />
            </button>
          </div>
        </div>
      </div>
      <div>
        <h2 className="border-b-2 border-gray-400 pt-5 pb-1 text-2xl font-semibold">
          Similar Items
        </h2>
        <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(10)].map((_similarItems, similarItemsIndex) => (
            <SmilarItem
              key={similarItemsIndex}
              title={'Gralzy S60'}
              price={300}
              imageSrc={'/'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;

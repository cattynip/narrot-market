import { TIconDs } from '@libs/iconDs';
import Icon from './Icon';

interface IProfileInforItem {
  icon: TIconDs;
  title: string;
}

const ProfileInforItem = ({ icon, title }: IProfileInforItem) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-400 transition-colors hover:bg-orange-500">
        <Icon
          d={icon}
          size={10}
          isHighlighted={false}
          stroke="#ffffff"
          fill="#ffffff"
        />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
};

export default ProfileInforItem;

import { TIconDs } from '@libs/client/iconDs';
import Link from 'next/link';
import Icon from './Icon';

interface IProfileInforItem {
  icon: TIconDs;
  title: string;
  userName: string;
  linkLabel: string;
}

const ProfileInforItem = ({
  icon,
  title,
  userName,
  linkLabel
}: IProfileInforItem) => {
  return (
    <Link href={`/users/${userName}/${linkLabel}`}>
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-400 transition-colors hover:bg-orange-500">
          <Icon
            d={icon}
            size={40}
            hightColor={{
              variable: true,
              highlightType: {
                true: 'whiteHightlight',
                false: 'whiteHightlight'
              }
            }}
          />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </Link>
  );
};

export default ProfileInforItem;

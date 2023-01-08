import { TIconDs } from '@libs/iconDs';
import Link from 'next/link';
import Icon from './Icon';

interface INavBarComponent {
  name: string;
  iconName: TIconDs;
  linkTo: string;
}

const NavBarArr: INavBarComponent[] = [
  {
    name: 'Home',
    iconName: 'house',
    linkTo: '/'
  },
  {
    name: 'Community',
    iconName: 'community',
    linkTo: '/community'
  },
  {
    name: 'Chats',
    iconName: 'chats',
    linkTo: '/chats'
  },
  {
    name: 'Stream',
    iconName: 'stream',
    linkTo: '/streams'
  },
  {
    name: 'Profile',
    iconName: 'cog',
    linkTo: '/profile'
  }
];

const NavBarComponent = ({ name, iconName, linkTo }: INavBarComponent) => {
  return (
    <Link href={linkTo}>
      <div className="flex flex-col items-center justify-center -space-y-1">
        <Icon
          d={iconName}
          size={26}
          hightColor={{
            variable: true,
            highlightType: {
              true: 'blackHightlight',
              false: 'blackHightlight'
            }
          }}
        />
        <span className="text-sm">{name}</span>
      </div>
    </Link>
  );
};

const NavBar = () => {
  return (
    <div className="flex w-full items-center justify-around">
      {NavBarArr.map((navBarItem, navBarItemIndex) => (
        <NavBarComponent
          key={navBarItemIndex}
          name={navBarItem.name}
          iconName={navBarItem.iconName}
          linkTo={navBarItem.linkTo}
        />
      ))}
    </div>
  );
};

export default NavBar;

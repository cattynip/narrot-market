import React from 'react';
import Navigation from './navigation';
import { joinClass } from '../libs/utils';

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

const Layout = ({ title, canGoBack, hasTabBar, children }: LayoutProps) => {
  console.log(canGoBack);
  return (
    <div>
      <div className="bg-white w-full text-lg font-medium py-4 fixed text-gray-700 border-b top-0 right-0 flex items-center justify-center">
        {title ? <span>{title}</span> : null}
      </div>

      <div className={joinClass('pt-16', hasTabBar ? 'pb-16' : '')}>
        {children}
      </div>

      {hasTabBar ? <Navigation /> : null}
    </div>
  );
};

export default Layout;

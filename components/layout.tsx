import React from 'react';
import Navigation from './navigation';

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  children: React.ReactNode;
}

const Layout = ({ title, canGoBack, children }: LayoutProps) => {
  console.log(canGoBack);
  return (
    <div>
      <div className="bg-white w-full text-lg font-medium py-3 fixed text-gray-700 border-b top-0 right-0 flex items-center justify-center">
        {title ? <span>{title}</span> : null}
      </div>

      <div className="py-16">{children}</div>

      <Navigation />
    </div>
  );
};

export default Layout;

import { useRouter } from 'next/router';
import React from 'react';
import Navigation from './navigation';

interface LayoutProps {
  title?: string;
  canGoBack?: boolean | string;
  children: React.ReactNode;
}

const Layout = ({ title, canGoBack, children }: LayoutProps) => {
  const router = useRouter();
  const goBack = () => {
    if (typeof canGoBack === 'string') {
      router.replace(canGoBack);
    } else {
      router.back();
    }
  };

  return (
    <div>
      <div className="bg-white w-full text-lg font-medium py-3 fixed text-gray-700 border-b top-0 right-0 flex items-center justify-center">
        {canGoBack ? (
          <button className="absolute left-5" onClick={goBack}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        ) : null}
        {title ? <span>{title}</span> : null}
      </div>

      <div className="py-16">{children}</div>

      <Navigation />
    </div>
  );
};

export default Layout;

import Link from 'next/link';
import React from 'react';

interface ProfileOptionProps {
  title: string;
  link: string;
  children: React.ReactNode;
}

const ProfileOption = ({ title, link, children }: ProfileOptionProps) => {
  return (
    <Link href={link}>
      <a>
        <div className="flex flex-col items-center justify-center space-y-1">
          <div className="p-5 bg-orange-500 text-white rounded-full">
            {children}
          </div>
          <span>{title}</span>
        </div>
      </a>
    </Link>
  );
};

export default ProfileOption;

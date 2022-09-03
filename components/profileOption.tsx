import React from 'react';

interface ProfileOptionProps {
  title: string;
  children: React.ReactNode;
}

const ProfileOption = ({ title, children }: ProfileOptionProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-1">
      <div className="p-5 bg-orange-500 text-white rounded-full">
        {children}
      </div>
      <span>{title}</span>
    </div>
  );
};

export default ProfileOption;

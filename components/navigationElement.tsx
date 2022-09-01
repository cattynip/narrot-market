import Link from 'next/link';
import React from 'react';

interface NavigationElementProps {
  href: string;
  name: string;
  children: React.ReactNode;
}

const NavigationElement = ({
  href,
  name,
  children
}: NavigationElementProps) => {
  return (
    <Link href={href}>
      <a className="flex flex-col items-center space-y-0.5">
        {children}
        <span className="text-xs">{name}</span>
      </a>
    </Link>
  );
};

export default NavigationElement;

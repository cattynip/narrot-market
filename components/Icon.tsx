import { SVGAttributes } from 'react';
import IconDs, { TIconDs } from '@libs/iconDs';

interface IIcon {
  d: TIconDs;
  size: number;
  isHighlighted: boolean;
}

const Icon = ({
  d,
  size,
  isHighlighted,
  ...svgProps
}: IIcon & SVGAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      className={`w-${size} h-${size} text-white`}
      xmlns="http://www.w3.org/2000/svg"
      fill={isHighlighted ? '#f97316' : 'none'}
      stroke={isHighlighted ? '#f97316' : 'black'}
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...svgProps}
    >
      {IconDs[d].map((iconPath, iconPathIndex) => (
        <path
          key={iconPathIndex}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d={iconPath}
        />
      ))}
    </svg>
  );
};

export default Icon;

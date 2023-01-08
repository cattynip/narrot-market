import { SVGAttributes } from 'react';
import IconDs, { TIconDs } from '@libs/iconDs';

const ColorObj = {
  transparent: 'none',
  white: '#ffffff',
  black: '#000000',
  orange: '#f97316'
};
type TIconColor = keyof typeof ColorObj;

interface ISnipColroSet {
  [key: string]: TIconColor[];
}

// First is for `fill`
// Second is for `stroke`
const SnipColorSet: ISnipColroSet = {
  empty: ['white', 'black'],
  orangeHighlight: ['orange', 'orange'],
  whiteHightlight: ['white', 'white'],
  blackHightlight: ['white', 'black'],
  whiteStrokeTransparentFill: ['transparent', 'white']
};
type TSnipColorSet =
  | 'empty'
  | 'orangeHighlight'
  | 'whiteHightlight'
  | 'blackHightlight'
  | 'whiteStrokeTransparentFill';

export interface IHightColor {
  variable: boolean;
  highlightType: {
    true: TSnipColorSet;
    false: TSnipColorSet;
  };
}

interface IIcon {
  d: TIconDs;
  size: number;
  hightColor: IHightColor;
}

const Icon = ({
  d,
  size,
  hightColor,
  ...svgProps
}: IIcon & SVGAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill={
        hightColor.variable
          ? ColorObj[SnipColorSet[hightColor.highlightType['true']][0]]
          : ColorObj[SnipColorSet[hightColor.highlightType['false']][0]]
      }
      stroke={
        hightColor.variable
          ? ColorObj[SnipColorSet[hightColor.highlightType['true']][1]]
          : ColorObj[SnipColorSet[hightColor.highlightType['false']][1]]
      }
      viewBox="0 0 24 24"
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

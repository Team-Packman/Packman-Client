import { css } from 'styled-components';

interface Font {
  size: number;
  weight: 'L' | 'R' | 'M' | 'SB' | 'EB';
  type:
    | 'display1'
    | 'display2'
    | 'display3'
    | 'headline1'
    | 'headline2'
    | 'subhead1'
    | 'subhead2'
    | 'body1'
    | 'body2'
    | 'body3'
    | 'body4'
    | 'caption1'
    | 'caption2';
}

const getFontWeight = (weight: Font['weight']) => {
  switch (weight) {
    case 'L':
      return 300;
    case 'R':
      return 400;
    case 'M':
      return 500;
    case 'SB':
      return 600;
    case 'EB':
      return 800;
  }
};

const getLineHeight = (type: Font['type']) => {
  switch (type) {
    case 'display3':
      return 34;
    case 'display2':
      return 29;
    case 'display1':
      return 29;
    case 'headline2':
      return 24;
    case 'headline1':
      return 22;
    case 'subhead2':
      return 22;
    case 'subhead1':
      return 19;
    case 'body4':
      return 18;
    case 'body3':
      return 18;
    case 'body2':
      return 17;
    case 'body1':
      return 17;
    case 'caption2':
      return 14;
    case 'caption1':
      return 14;
  }
};

export const FONT = ({ size, weight, type }: Font) => css`
  font-family: 'Noto Sans';
  font-size: ${size / 10}rem;
  font-weight: ${getFontWeight(weight)};
  line-height: ${getLineHeight(type) / 10}rem;
`;

export const FONT_STYLES = {
  DISPLAY1_LIGHT: FONT({ size: 24, weight: 'L', type: 'display1' }),
  DISPLAY2_SEMIBOLD: FONT({ size: 24, weight: 'SB', type: 'display2' }),
  DISPLAY3_EXTRABOLD: FONT({ size: 28, weight: 'EB', type: 'display3' }),
  HEADLINE1_MEDIUM: FONT({ size: 18, weight: 'M', type: 'headline1' }),
  HEADLINE2_SEMIBOLD: FONT({ size: 20, weight: 'SB', type: 'headline2' }),
  SUBHEAD1_SEMIBOLD: FONT({ size: 16, weight: 'SB', type: 'subhead1' }),
  SUBHEAD2_SEMIBOLD: FONT({ size: 18, weight: 'SB', type: 'subhead2' }),
  BODY1_REGULAR: FONT({ size: 14, weight: 'R', type: 'body1' }),
  BODY2_SEMIBOLD: FONT({ size: 14, weight: 'SB', type: 'body2' }),
  BODY3_REGULAR: FONT({ size: 15, weight: 'R', type: 'body3' }),
  BODY4_SEMIBOLD: FONT({ size: 15, weight: 'SB', type: 'body4' }),
  CAPTION1_REGULAR: FONT({ size: 12, weight: 'R', type: 'caption1' }),
  CAPTION2_SEMIBOLD: FONT({ size: 12, weight: 'SB', type: 'caption2' }),
};

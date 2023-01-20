import Image from 'next/image';
import { PropsWithChildren } from 'react';
import styled, { css, CSSProp } from 'styled-components';
import { packmanColors } from '../../styles/color';
import { FONT_STYLES } from '../../styles/font';

interface CardProps {
  cardStyle?: CSSProp;
  onClick?: VoidFunction;
}

interface LeftContainerProps {
  leftContainerStyle?: CSSProp;
}

interface RightContainerProps {
  rightContainerStyle?: CSSProp;
}

interface IconProps {
  icon: string;
  width?: number;
  height?: number;
  iconStyle?: CSSProp;
}

interface RenderTextItemProps {
  value: string;
  customStyle?: CSSProp;
  defaultStyle?: CSSProp;
}

function RenderTextItem(props: RenderTextItemProps) {
  const { value, customStyle, defaultStyle } = props;

  return (
    <StyledRenderTextItem defaultStyle={defaultStyle} customStyle={customStyle}>
      {value}
    </StyledRenderTextItem>
  );
}

function Card(props: PropsWithChildren<CardProps>) {
  const { children, cardStyle, onClick } = props;

  return (
    <StyledCard cardStyle={cardStyle} onClick={onClick}>
      {children}
    </StyledCard>
  );
}

Card.LeftContainer = function LeftContainer(props: PropsWithChildren<LeftContainerProps>) {
  const { children, leftContainerStyle } = props;

  return (
    <StyledLeftContainer leftContainerStyle={leftContainerStyle}>{children}</StyledLeftContainer>
  );
};

Card.RightContainer = function RightContainer(props: PropsWithChildren<RightContainerProps>) {
  const { children, rightContainerStyle } = props;

  return (
    <StyledRightContainer rightContainerStyle={rightContainerStyle}>
      {children}
    </StyledRightContainer>
  );
};

Card.Title = (props: RenderTextItemProps) => (
  <RenderTextItem {...props} defaultStyle={StyledDefaultTitle} />
);

Card.SubTitle = (props: RenderTextItemProps) => (
  <RenderTextItem {...props} defaultStyle={StyledDefaultSubTitle} />
);

Card.Label = (props: RenderTextItemProps) => (
  <RenderTextItem {...props} defaultStyle={StyledDefaultLabel} />
);

Card.DDay = (props: RenderTextItemProps) => (
  <RenderTextItem {...props} defaultStyle={StyledDefaultDDay} />
);

Card.Description = (props: RenderTextItemProps) => (
  <RenderTextItem {...props} defaultStyle={StyledDefaultDescription} />
);

Card.Icon = function Icon(props: IconProps) {
  const { icon, width = 2.4, height = 2.4, iconStyle } = props;
  return (
    <StyledIcon iconStyle={iconStyle}>
      <Image src={icon} width={width} height={height} alt="right-arrow" layout="responsive" />
    </StyledIcon>
  );
};

export default Card;

const StyledCard = styled.section<{ cardStyle?: CSSProp }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 8.4rem;

  margin: 1rem 0 4.5rem 0;
  padding: 0 2rem;
  border-radius: 1rem;
  background-color: ${packmanColors.pmBlueGrey};

  ${({ cardStyle }) => cardStyle}
`;

const StyledLeftContainer = styled.div<{ leftContainerStyle?: CSSProp }>`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  ${({ leftContainerStyle }) => leftContainerStyle}
`;

const StyledRightContainer = styled.div<{ rightContainerStyle?: CSSProp }>`
  display: flex;
  flex-direction: column;
  align-items: end;

  ${({ rightContainerStyle }) => rightContainerStyle}
`;

const StyledDefaultTitle = css`
  font-style: ${FONT_STYLES.SUBHEAD2_SEMIBOLD};
  color: ${packmanColors.black};
`;

const StyledDefaultSubTitle = css`
  font-style: ${FONT_STYLES.BODY1_REGULAR};
  color: ${packmanColors.pmDeepGrey};
`;

const StyledDefaultLabel = css`
  font-style: ${FONT_STYLES.BODY1_REGULAR};
  color: ${packmanColors.pmDeepGrey};
  margin-bottom: 0.3rem;
`;

const StyledDefaultDDay = css`
  font-style: ${FONT_STYLES.DISPLAY3_EXTRABOLD};
  color: ${packmanColors.pmGreen};
`;

const StyledDefaultDescription = css`
  font-size: 1.2rem;
  color: ${packmanColors.pmBlack};
`;

const StyledIcon = styled.div<{ iconStyle?: CSSProp }>`
  display: 'flex';
  width: 2.4rem;
  height: 2.4rem;

  ${({ iconStyle }) => iconStyle}
`;

const StyledRenderTextItem = styled.p<{ defaultStyle?: CSSProp; customStyle?: CSSProp }>`
  ${({ defaultStyle }) => defaultStyle}
  ${({ customStyle }) => customStyle}
`;

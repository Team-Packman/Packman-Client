import Image from 'next/image';
import { PropsWithChildren } from 'react';
import styled, { css, CSSProp } from 'styled-components';
import { packmanColors } from '../../styles/color';
import { FONT_STYLES } from '../../styles/font';

interface CardProps {
  overlay?: CSSProp;
  onClick?: VoidFunction;
}

interface LeftContainerProps {
  overlay?: CSSProp;
}

interface RightContainerProps {
  overlay?: CSSProp;
}

interface IconProps {
  icon: string;
  width?: number;
  height?: number;
  overlay?: CSSProp;
}

interface RenderTextItemProps {
  value?: string;
  defaultStyle?: CSSProp;
  overlay?: CSSProp;
}

function RenderTextItem(props: PropsWithChildren<RenderTextItemProps>) {
  const { children, value, defaultStyle, overlay } = props;

  return (
    <StyledRenderTextItem overlay={overlay} defaultStyle={defaultStyle}>
      {children ? children : value}
    </StyledRenderTextItem>
  );
}

function Card(props: PropsWithChildren<CardProps>) {
  const { children, overlay, onClick } = props;

  return (
    <StyledCard overlay={overlay} onClick={onClick}>
      {children}
    </StyledCard>
  );
}

Card.LeftContainer = function LeftContainer(props: PropsWithChildren<LeftContainerProps>) {
  const { children, overlay } = props;

  return <StyledLeftContainer overlay={overlay}>{children}</StyledLeftContainer>;
};

Card.RightContainer = function RightContainer(props: PropsWithChildren<RightContainerProps>) {
  const { children, overlay } = props;

  return <StyledRightContainer overlay={overlay}>{children}</StyledRightContainer>;
};

Card.Title = (props: PropsWithChildren<RenderTextItemProps>) => (
  <RenderTextItem {...props} defaultStyle={StyledDefaultTitle} />
);

Card.SubTitle = (props: PropsWithChildren<RenderTextItemProps>) => (
  <RenderTextItem {...props} defaultStyle={StyledDefaultSubTitle} />
);

Card.Label = (props: PropsWithChildren<RenderTextItemProps>) => (
  <RenderTextItem {...props} defaultStyle={StyledDefaultLabel} />
);

Card.DDay = (props: PropsWithChildren<RenderTextItemProps>) => (
  <RenderTextItem {...props} defaultStyle={StyledDefaultDDay} />
);

Card.Description = (props: PropsWithChildren<RenderTextItemProps>) => (
  <RenderTextItem {...props} defaultStyle={StyledDefaultDescription} />
);

Card.Icon = function Icon(props: IconProps) {
  const { icon, width = 2.4, height = 2.4, overlay } = props;
  return (
    <StyledIcon overlay={overlay}>
      <Image src={icon} width={width} height={height} alt="right-arrow" layout="responsive" />
    </StyledIcon>
  );
};

export default Card;

const StyledCard = styled.section<{ overlay?: CSSProp }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 8.4rem;

  margin: 1rem 0 4.5rem 0;
  padding: 0 2rem;
  border-radius: 1rem;
  background-color: ${packmanColors.pmBlueGrey};

  ${({ overlay }) => overlay}
`;

const StyledLeftContainer = styled.div<{ overlay?: CSSProp }>`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  ${({ overlay }) => overlay}
`;

const StyledRightContainer = styled.div<{ overlay?: CSSProp }>`
  display: flex;
  flex-direction: column;
  align-items: end;

  ${({ overlay }) => overlay}
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

const StyledIcon = styled.div<{ overlay?: CSSProp }>`
  display: 'flex';
  width: 2.4rem;
  height: 2.4rem;

  ${({ overlay }) => overlay}
`;

const StyledRenderTextItem = styled.div<{ overlay?: CSSProp; defaultStyle?: CSSProp }>`
  ${({ overlay }) => overlay}
  ${({ defaultStyle }) => defaultStyle}
`;

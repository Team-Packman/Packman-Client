import Image from 'next/image';
import { PropsWithChildren } from 'react';
import styled, { css, CSSProp } from 'styled-components';
import { packmanColors } from '../../styles/color';
import { FONT_STYLES } from '../../styles/font';

interface CardProps {
  style?: CSSProp;
  onClick?: VoidFunction;
}

interface LeftContainerProps {
  style?: CSSProp;
}

interface RightContainerProps {
  style?: CSSProp;
}

interface IconProps {
  icon: string;
  width?: number;
  height?: number;
  style?: CSSProp;
}

interface RenderTextItemProps {
  value: string;
  customStyle?: CSSProp;
  style?: CSSProp;
}

function RenderTextItem(props: RenderTextItemProps) {
  const { value, customStyle, style } = props;

  return (
    <StyledRenderTextItem css={style} customStyle={customStyle}>
      {value}
    </StyledRenderTextItem>
  );
}

function Card(props: PropsWithChildren<CardProps>) {
  const { children, style, onClick } = props;

  return (
    <StyledCard css={style} onClick={onClick}>
      {children}
    </StyledCard>
  );
}

Card.LeftContainer = function LeftContainer(props: PropsWithChildren<LeftContainerProps>) {
  const { children, style } = props;

  return <StyledLeftContainer css={style}>{children}</StyledLeftContainer>;
};

Card.RightContainer = function RightContainer(props: PropsWithChildren<RightContainerProps>) {
  const { children, style } = props;

  return <StyledRightContainer css={style}>{children}</StyledRightContainer>;
};

Card.Title = (props: RenderTextItemProps) => (
  <RenderTextItem {...props} style={StyledDefaultTitle} />
);

Card.SubTitle = (props: RenderTextItemProps) => (
  <RenderTextItem {...props} style={StyledDefaultSubTitle} />
);

Card.Label = (props: RenderTextItemProps) => (
  <RenderTextItem {...props} style={StyledDefaultLabel} />
);

Card.DDay = (props: RenderTextItemProps) => <RenderTextItem {...props} style={StyledDefaultDDay} />;

Card.Description = (props: RenderTextItemProps) => (
  <RenderTextItem {...props} style={StyledDefaultDescription} />
);

Card.Icon = function Icon(props: IconProps) {
  const { icon, width = 2.4, height = 2.4, style } = props;
  return (
    <StyledIcon css={style}>
      <Image src={icon} width={width} height={height} alt="right-arrow" layout="responsive" />
    </StyledIcon>
  );
};

export default Card;

const StyledCard = styled.section<{ css?: CSSProp }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 8.4rem;

  margin: 1rem 0 4.5rem 0;
  padding: 0 2rem;
  border-radius: 1rem;
  background-color: ${packmanColors.pmBlueGrey};

  ${({ css }) => css}
`;

const StyledLeftContainer = styled.div<{ css?: CSSProp }>`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  ${({ css }) => css}
`;

const StyledRightContainer = styled.div<{ css?: CSSProp }>`
  display: flex;
  flex-direction: column;
  align-items: end;

  ${({ css }) => css}
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

const StyledIcon = styled.div<{ css?: CSSProp }>`
  display: 'flex';
  width: 2.4rem;
  height: 2.4rem;

  ${({ css }) => css}
`;

const StyledRenderTextItem = styled.p<{ css?: CSSProp; customStyle?: CSSProp }>`
  ${({ css }) => css}
  ${({ customStyle }) => customStyle}
`;

import { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import { packmanColors } from '../../styles/color';
import { FONT_STYLES } from '../../styles/font';

interface ButtonProps {
  onClick?: VoidFunction;
  color?: string;
  background?: string;
  disabled?: boolean;
}
function Button(props: PropsWithChildren<ButtonProps>) {
  const {
    children,
    onClick,
    color = packmanColors.pmWhite,
    background = packmanColors.pmPink,
    disabled = false,
  } = props;

  return (
    <StyledButton onClick={onClick} color={color} background={background} disabled={disabled}>
      {children}
    </StyledButton>
  );
}

export default Button;

const StyledButton = styled.button<{
  color: string;
  background: string;
  disabled: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  ${FONT_STYLES.BODY4_SEMIBOLD};
  border: 1px solid ${({ color }) => color};
  border-radius: 0.8rem;
  color: ${({ color }) => color};
  background-color: ${({ background }) => background};

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${packmanColors.pmWhite};
      border: 1px solid ${packmanColors.pmGrey};
      background-color: ${packmanColors.pmGrey};
    `}
`;

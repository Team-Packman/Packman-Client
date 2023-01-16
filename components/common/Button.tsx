import { PropsWithChildren, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { packmanColors } from '../../styles/color';
import { FONT_STYLES } from '../../styles/font';

interface ButtonProps {
  children: ReactNode;
  onClick?: VoidFunction;
  color?: string;
  background?: string;
  disabled?: boolean;
  outline?: boolean;
}
function Button(props: PropsWithChildren<ButtonProps>) {
  const { children, onClick, color, background, disabled, outline } = props;

  return (
    <StyledButton
      onClick={onClick}
      color={color || packmanColors.pmWhite}
      background={background || packmanColors.pmPink}
      disabled={disabled || false}
      outline={outline || false}
    >
      {children}
    </StyledButton>
  );
}

export default Button;

const StyledButton = styled.button<{
  color: string;
  background: string;
  disabled: boolean;
  outline: boolean;
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

  ${({ outline }) =>
    outline &&
    css`
      color: ${packmanColors.black};
      border: 1px solid ${packmanColors.black};
      background-color: ${packmanColors.pmWhite};
    `}
`;

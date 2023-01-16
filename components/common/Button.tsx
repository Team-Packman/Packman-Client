import { PropsWithChildren, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { packmanColors } from '../../styles/color';
import { FONT_STYLES } from '../../styles/font';

interface ButtonProps {
  children: ReactNode;
  onClick: VoidFunction;
}

interface LongButtonProps {
  children: ReactNode;
  onClick: VoidFunction;
}

interface CancelButtonProps {
  children: ReactNode;
  onClick?: VoidFunction;
}
interface ConfirmButtonProps {
  children: ReactNode;
  onClick?: VoidFunction;
  isActive?: boolean;
}

function Button(props: PropsWithChildren<ButtonProps>) {
  const { children, onClick } = props;

  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

Button.Contents = function Contents({ children }: PropsWithChildren) {
  return <StyledContents>{children}</StyledContents>;
};

Button.LongButton = function LongButton(props: PropsWithChildren<LongButtonProps>) {
  const { children, onClick } = props;

  return (
    <Button onClick={onClick}>
      <StyledLongButton>
        <Button.Contents>{children}</Button.Contents>
      </StyledLongButton>
    </Button>
  );
};

Button.CancelButton = function CancelButton(props: PropsWithChildren<CancelButtonProps>) {
  const { children, onClick } = props;

  return (
    <StyledCancelButton onClick={onClick}>
      <Button.Contents>{children}</Button.Contents>
    </StyledCancelButton>
  );
};

Button.ConfirmButton = function ConfirmButton(props: PropsWithChildren<ConfirmButtonProps>) {
  const { children, onClick, isActive } = props;

  return (
    <StyledConfirmButton onClick={onClick} isActive={isActive ?? true} disabled={!isActive}>
      <Button.Contents>{children}</Button.Contents>
    </StyledConfirmButton>
  );
};

export default Button;

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledContents = styled.div`
  ${FONT_STYLES.BODY4_SEMIBOLD};
`;

const StyledLongButton = styled.button`
  width: 100%;
  height: 4.1rem;
  color: ${packmanColors.pmWhite};
  background-color: ${packmanColors.pmPink};
  border-radius: 0.8rem;
  border: none;
`;

const StyledCancelButton = styled.button`
  width: 100%;
  height: 100%;
  border: 1px solid ${packmanColors.pmDeepGrey};
  color: ${packmanColors.pmDeepGrey};
  background-color: ${packmanColors.pmWhite};
  border-radius: 0.8rem;
  ${FONT_STYLES.BODY4_SEMIBOLD};
`;
const StyledConfirmButton = styled.button<{ isActive: boolean }>`
  width: 100%;
  height: 100%;
  border: none;
  color: ${packmanColors.pmWhite};
  background-color: ${packmanColors.pmPink};
  border-radius: 0.8rem;
  ${FONT_STYLES.BODY4_SEMIBOLD};

  ${({ isActive }) =>
    !isActive &&
    css`
      color: ${packmanColors.pmWhite};
      background-color: ${packmanColors.pmGrey};
    `}
`;

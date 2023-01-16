import { PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import { FONT_STYLES } from '../../styles/font';

interface ButtonProps {
  children: ReactNode;
  onClick: VoidFunction;
}

function Button(props: PropsWithChildren<ButtonProps>) {
  const { children, onClick } = props;

  return (
    <>
      <StyledButton onClick={onClick}>
        <Button.Contents>{children}</Button.Contents>
      </StyledButton>
    </>
  );
}

Button.Contents = function Contents({ children }: PropsWithChildren) {
  return <StyledContents>{children}</StyledContents>;
};

export default Button;

const StyledButton = styled.button`
  width: calc(100vw - 4rem);
  height: 4.7rem;
  background-color: ${packmanColors.pmPink};
  border: none;
  border-radius: 0.5rem;
`;

const StyledContents = styled.div`
  ${FONT_STYLES.BODY4_SEMIBOLD};
  color: #fff;
`;

import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';

function DropBox({ children }: PropsWithChildren) {
  return (
    <StyledRoot>
      <StyledDropBox>{children}</StyledDropBox>
    </StyledRoot>
  );
}

export default DropBox;

const StyledRoot = styled.div`
  position: absolute;
  top: 4.2rem;
  display: flex;
  justify-content: center;
  width: 18rem;
  z-index: 100;
`;
const StyledDropBox = styled.div`
  width: 16rem;
  background-color: ${packmanColors.pmWhite};
  border-radius: 0.8rem;
  filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.1));
  overflow: hidden;
`;

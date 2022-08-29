import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';

function DropBox({ children }: PropsWithChildren) {
  return <StyledRoot>{children}</StyledRoot>;
}

export default DropBox;

const StyledRoot = styled.div`
  position: absolute;
  width: 16rem;
  top: 4.2rem;
  background-color: ${packmanColors.pmWhite};
  border-radius: 0.8rem;
  filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.1));
  z-index: 100;
`;

import React from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
function UpdateNotification() {
  return (
    <>
      <StyledBg />
      <StyledModal>
        <button onClick={() => window.location.reload()}>update</button>
      </StyledModal>
    </>
  );
}

export default UpdateNotification;

const StyledBg = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.48);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9999;
  left: 0;
  top: 0;
`;

const StyledModal = styled.div`
  width: calc(100% - 6rem);
  background-color: ${packmanColors.pmWhite};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.8rem 0 2.4rem 0;
  border-radius: 1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999;
`;

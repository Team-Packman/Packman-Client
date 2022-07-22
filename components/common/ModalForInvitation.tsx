import React from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import ButtonX from '/public/assets/png/ButtonX.png';
import Image from 'next/image';

function ModalForInvitation() {
  return (
    <StyledRoot>
      <StyledModal>
        <ButtonContainer>
          <Image src={ButtonX} alt="closeModal" width="24" height="24" />
        </ButtonContainer>
        <Description>함께 패킹할 멤버를 초대해보세요!</Description>
        <CopyLinkButton>멤버 초대 링크 복사하기</CopyLinkButton>
      </StyledModal>
    </StyledRoot>
  );
}

export default ModalForInvitation;

const StyledRoot = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.48);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const StyledModal = styled.div`
  width: calc(100% - 6rem);
  background-color: ${packmanColors.pmWhite};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.8rem 0 2.4rem 0;
  border-radius: 10px;
  position: absolute;
  top: 35vh;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  padding-right: 0.8rem;
  margin-bottom: 1.1rem;
`;

const Description = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${packmanColors.pmBlack};
`;

const CopyLinkButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 3.2rem);
  height: 4rem;
  background: ${packmanColors.pmPink};
  border-radius: 0.8rem;

  color: ${packmanColors.pmWhite};
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.8rem;
  display: flex;
  align-items: center;
  text-align: center;

  margin-top: 4.2rem;
`;

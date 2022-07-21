import React from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import ButtonX from '/public/assets/png/ButtonX.png';
import forShare from '/public/assets/png/forShare.png';
import Image from 'next/image';

function ModalForShare() {
  return (
    <StyledRoot>
      <StyledModal>
        <ButtonContainer>
          <Image src={ButtonX} alt="closeModal" width="24" height="24" />
        </ButtonContainer>
        <Description>패킹 리스트 공유</Description>
        <Image src={forShare} alt="forShare" width="260" height="260" />
        <SubDescription>나의 패킹 리스트를 공유해보세요!</SubDescription>
        <SeeListButton>링크 복사</SeeListButton>
      </StyledModal>
    </StyledRoot>
  );
}

export default ModalForShare;

const StyledRoot = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.48);
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  border-radius: 1rem;
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
  font-size: 1.6rem;
  line-height: 1.9rem;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${packmanColors.pmBlack};
`;

const SubDescription = styled.div`
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.7rem;
  display: flex;
  align-items: center;
  text-align: center;

  color: ${packmanColors.pmDeepGrey};
`;

const SeeListButton = styled.div`
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
  margin-top: 1rem;
`;

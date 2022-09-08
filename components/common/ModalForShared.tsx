import React from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import ButtonX from '/public/assets/png/ButtonX.png';
import Image from 'next/image';
import { useRouter } from 'next/router';

function ModalForShared() {
  const router = useRouter();
  return (
    <StyledRoot>
      <StyledModal>
        <ButtonContainer>
          <Image src={ButtonX} alt="closeModal" width="24" height="24" />
        </ButtonContainer>
        <Description>친구가 패킹 리스트를 공유했어요! 🎁</Description>
        <SeeListButton onClick={() => router.push('/login')}>
          3초만에 로그인하고 리스트 보기
        </SeeListButton>
      </StyledModal>
    </StyledRoot>
  );
}

export default ModalForShared;

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
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 32rem;
  height: 17.6rem;

  padding: 0.8rem 0 2.4rem 0;

  border-radius: 10px;
  background-color: ${packmanColors.pmWhite};

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

  margin-top: 4.2rem;
`;

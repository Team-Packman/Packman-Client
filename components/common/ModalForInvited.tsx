import React from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import ButtonX from '/public/assets/png/ButtonX.png';
import Image from 'next/image';
import Link from 'next/link';

interface ModalForInvitedProps {
  title: string;
}

function ModalForInvited(props: ModalForInvitedProps) {
  const { title } = props;

  return (
    <>
      <StyledBg />
      <StyledModal>
        <ButtonContainer>
          <Image src={ButtonX} alt="closeModal" width="24" height="24" />
        </ButtonContainer>
        <ListName>{title}</ListName>
        <Description>패킹 멤버로 초대되었습니다.</Description>
        <Description>
          <Packman>팩맨</Packman>과 함께 패킹을 시작해보세요!
        </Description>
        <Link href={'/login'}>
          <SeeListButton>3초만에 로그인하고 리스트 보기</SeeListButton>
        </Link>
      </StyledModal>
    </>
  );
}

export default ModalForInvited;

const StyledBg = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  background-color: rgba(0, 0, 0, 0.48);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9999;
`;

const StyledModal = styled.div`
  position: fixed;
  width: calc(100% - 6rem);
  background-color: ${packmanColors.pmWhite};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.8rem 0 2.4rem 0;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  padding-right: 0.8rem;
`;

const ListName = styled.h1`
  font-weight: 800;
  font-size: 2.8rem;
  line-height: 3.4rem;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${packmanColors.pmBlack};
  margin: 1.5rem 0;
`;

const Description = styled.div`
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.7rem;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${packmanColors.pmBlack};
`;

const Packman = styled.span`
  color: ${packmanColors.pmPink};
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

  margin-top: 3.3rem;
`;

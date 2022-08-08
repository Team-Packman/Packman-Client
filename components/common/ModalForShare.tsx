import React, { useState } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import ButtonX from '/public/assets/png/ButtonX.png';
import forShare from '/public/assets/png/forShare.png';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface ModalForShareProps {
  onClick?: () => void;
}

function ModalForShare(props: ModalForShareProps) {
  const { onClick: modalHandler } = props;

  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_DOMAIN}/alone/invited/${router.query.id}`,
    );
    setIsCopied(true);
  };

  return (
    <>
      <StyledBg onClick={modalHandler} />
      <StyledModal>
        <ButtonContainer>
          <Image src={ButtonX} alt="closeModal" width="24" height="24" onClick={modalHandler} />
        </ButtonContainer>
        <Description>패킹 리스트 공유</Description>
        <Image src={forShare} alt="forShare" width="260" height="260" />
        <SubDescription>
          {isCopied ? '복사되었습니다!' : '나의 패킹 리스트를 공유해보세요!'}
        </SubDescription>
        <SeeListButton onClick={copyToClipboard}>링크 복사</SeeListButton>
      </StyledModal>
    </>
  );
}

export default ModalForShare;

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

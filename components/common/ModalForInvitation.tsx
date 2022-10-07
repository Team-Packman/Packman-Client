import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { packmanColors } from '../../styles/color';
import iClose from '/public/assets/svg/iClose.svg';
import Image from 'next/image';
import { useResetRecoilState } from 'recoil';
import { listState } from '../../utils/recoil/atom/atom';

interface ModalForInvitationProps {
  inviteCode: string;
}

function ModalForInvitation(props: ModalForInvitationProps) {
  const { inviteCode } = props;

  const closeModal = useResetRecoilState(listState);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_DOMAIN}/together/invited?inviteCode=${inviteCode}`,
    );
    setIsCopied(true);
  };

  return (
    <>
      <StyledBg onClick={closeModal} />
      <StyledModal>
        <ButtonContainer>
          <Image src={iClose} alt="closeModal" width="24" height="24" onClick={closeModal} />
        </ButtonContainer>
        <Description>함께 패킹할 멤버를 초대해보세요!</Description>
        <CopyLinkButton onClick={copyToClipboard} isCopied={isCopied}>
          멤버 초대 링크 복사하기
        </CopyLinkButton>
      </StyledModal>
    </>
  );
}

export default ModalForInvitation;

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
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${packmanColors.pmBlack};
`;

const CopyLinkButton = styled.div<{
  isCopied: boolean;
}>`
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
  position: relative;
  margin-top: 4.2rem;

  ${({ isCopied }) =>
    isCopied &&
    css`
      &::after {
        position: absolute;
        content: '복사완료';
        width: 12.5rem;
        height: 1.7rem;
        top: -2.5rem;
        font-size: 1.4rem;
        font-weight: 400;
        color: ${packmanColors.deepGray};
      }
    `}
`;

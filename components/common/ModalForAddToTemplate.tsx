import React from 'react';
import styled from 'styled-components';
import ButtonX from '/public/assets/png/ButtonX.png';
import { packmanColors } from '../../styles/color';
import Image from 'next/image';

interface ModalForAddToTemplateProps {
  title: string;
  onClick: () => void;
}

function ModalForAddToTemplate(props: ModalForAddToTemplateProps) {
  const { title, onClick: modalHandler } = props;
  return (
    <>
      <StyledBg onClick={modalHandler} />
      <StyledModal>
        <StyledButtonContainer onClick={modalHandler}>
          <Image src={ButtonX} alt="closeModal" width="24" height="24" />
        </StyledButtonContainer>
        <div>
          <StyledTitle>{title}</StyledTitle>
          <StyledDescription>
            <span>나만의 템플릿</span>
            <span>으로 추가되었습니다.</span>
          </StyledDescription>
        </div>
        <StyledConfirmButton onClick={modalHandler}>확인</StyledConfirmButton>
      </StyledModal>
    </>
  );
}

export default ModalForAddToTemplate;

const StyledBg = styled.div`
  position: fixed;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
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

const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  padding-right: 0.8rem;
  margin-bottom: 1.1rem;
`;

const StyledTitle = styled.div`
  font-weight: 800;
  font-size: 2.8rem;
  text-align: center;
  color: ${packmanColors.black};
`;
const StyledDescription = styled.div`
  margin-top: 2.4rem;

  & > span {
    font-size: 1.4rem;
    color: ${packmanColors.black};
  }
  & > span:first-child {
    font-weight: 600;
    color: ${packmanColors.pmPink};
  }
`;
const StyledConfirmButton = styled.div`
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
`;

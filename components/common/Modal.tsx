import React, { PropsWithChildren, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import styled from 'styled-components';
import iClose from '/public/assets/svg/iClose.svg';
import { packmanColors } from '../../styles/color';

interface ModalProps {
  onClick: VoidFunction;
  closeBtn?: boolean;
}

function Modal({ children, onClick, closeBtn = true }: PropsWithChildren<ModalProps>) {
  return ReactDOM.createPortal(
    <>
      <Modal.Bg onClick={onClick}></Modal.Bg>
      <StyledModal>
        {closeBtn && <Modal.CloseBtn onClick={onClick} />}
        {children}
      </StyledModal>
    </>,
    document.querySelector('#__next') as Element,
  );
}

type BgProps = ModalProps;

Modal.Bg = function Bg({ onClick }: BgProps) {
  return <StyledBg onClick={onClick} />;
};

type CloseBtnProps = ModalProps;

Modal.CloseBtn = function CloseBtn({ onClick }: CloseBtnProps) {
  return (
    <StyledButtonContainer>
      <StyledCloseBtn onClick={onClick}>
        <Image src={iClose} alt="closeModal" width="24" height="24" />
      </StyledCloseBtn>
    </StyledButtonContainer>
  );
};

Modal.Body = function Body({ children }: PropsWithChildren) {
  return <StyledBody>{children}</StyledBody>;
};

interface ControlsProps {
  controls: ReactElement;
}

Modal.Controls = function Controls({ controls }: ControlsProps) {
  return controls;
};

export default Modal;

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
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 99999;
  transform: translate(-50%, -50%);

  width: 32rem;

  background-color: ${packmanColors.pmWhite};

  padding: 0.8rem 1.6rem 2.4rem 1.6rem;

  border-radius: 1rem;
`;

const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  margin-right: -1.6rem;
  margin-bottom: 1.1rem;
`;

const StyledCloseBtn = styled.button`
  height: 2.4rem;

  background: ${packmanColors.pmWhite};

  border: none;
`;

const StyledBody = styled.div`
  width: 100%;
`;

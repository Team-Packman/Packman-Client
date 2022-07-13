import styled from 'styled-components';
import iClose from '../../public/assets/svg/iClose.svg';
import Image from 'next/image';
import { packmanColors } from '../../styles/color';
// import { packmanColors } from '../../styles/color';

interface ModalProps {
  content: string;
  leftButtonContent: string;
  rightButtonContent?: string;
  closeModal: () => void;
}
export default function Modal(props: ModalProps) {
  const { content, leftButtonContent, rightButtonContent, closeModal } = props;

  return (
    <>
      <StyledRoot onClick={closeModal} />
      <StyledModalWrapper>
        <StyledImageWrapper>
          <Image src={iClose} alt="닫기" onClick={closeModal} />
        </StyledImageWrapper>
        <StyledModalInfo>
          <p>{content}</p>
          <StyledButtonWrapper>
            <StyledLeftButton onClick={closeModal}>{leftButtonContent}</StyledLeftButton>
            {rightButtonContent && <StyledRightButton>{rightButtonContent}</StyledRightButton>}
          </StyledButtonWrapper>
        </StyledModalInfo>
      </StyledModalWrapper>
    </>
  );
}
const StyledRoot = styled.div`
  /* display: block; */
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.47);
  z-index: 10;
  overflow: hidden;
`;
const StyledModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 31.5rem;
  height: 17.6rem;
  background-color: #fff;
  border-radius: 1.34rem;

  z-index: 10;

  & > span {
    position: absolute;
    top: 0.7rem;
    right: 1.5rem;
  }
`;
const StyledImageWrapper = styled.div`
  position: absolute;
  top: 0.7rem;
  right: 1.4rem;
`;
const StyledModalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.95rem;
  & > p {
    font-weight: 400;
    font-size: 1.6rem;
    color: #282828;
  }
`;
const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.9rem;
`;

const ButtonStyle = styled.button`
  width: 13.1rem;
  height: 4.1rem;
  border-radius: 0.3rem;
  background-color: ${packmanColors.pink};
  color: ${packmanColors.white};
  border-radius: 0.8rem;
  font-weight: 400;
  font-size: 1.4rem;
  border: none;
`;

const StyledLeftButton = styled(ButtonStyle)`
  background-color: ${packmanColors.white};
  color: ${packmanColors.lightGray};
  border: 1px solid ${packmanColors.lightGray};
`;

const StyledRightButton = styled(ButtonStyle)``;

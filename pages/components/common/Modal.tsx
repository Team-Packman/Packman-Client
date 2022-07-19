import styled from 'styled-components';
import iClose from '../../../public/assets/svg/iClose.svg';
import Image from 'next/image';

interface ModalProps {
  title: string;
  image?: React.ReactNode;
  button?: React.ReactNode;
  closeModal: () => void;
}
export default function Modal(props: ModalProps) {
  const { title, image, button, closeModal } = props;

  return (
    <>
      <StyledBackground onClick={closeModal} />
      <StyledRoot>
        <StyledImageWrapper>
          <Image src={iClose} alt="close" onClick={closeModal} />
        </StyledImageWrapper>
        <StyledModalInfo>
          <p>{title}</p>
          {image}
          {button}
        </StyledModalInfo>
      </StyledRoot>
    </>
  );
}
const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.47);
  z-index: 110;
  overflow: hidden;
`;
const StyledRoot = styled.div`
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

  z-index: 115;

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

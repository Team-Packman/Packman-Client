import styled from 'styled-components';
import iClose from '/public/assets/svg/iClose.svg';
import Image from 'next/image';
import { FONT_STYLES } from '../../styles/font';

interface ModalProps {
  title: string;
  button?: React.ReactNode;
  closeModal: () => void;
}
export default function Modal(props: ModalProps) {
  const { title, button, closeModal } = props;

  return (
    <StyledBackground>
      <StyledRoot>
        <StyledImageWrapper>
          <Image src={iClose} alt="close" onClick={closeModal} />
        </StyledImageWrapper>
        <StyledModalInfo>
          <p>{title}</p>
          {button}
        </StyledModalInfo>
      </StyledRoot>
    </StyledBackground>
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
  width: 32rem;
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
  justify-content: center;

  & > p {
    ${FONT_STYLES.SUBHEAD1_SEMIBOLD};
    padding-bottom: 3.7rem;
    color: #282828;
  }
`;

import Image from 'next/image';
import styled from 'styled-components';
import pmLogo from '../../../public/assets/svg/pmLogo.svg';
import { packmanColors } from '../../../styles/color';

function Footer() {
  return (
    <StyledRoot>
      <Image src={pmLogo} alt="로고" />
      <StyledInfo>
        <div>
          <p>Contact</p>
          <p>teampackman123@gmail.com</p>
        </div>
        <div>
          <p>Copyright</p>
          <p>Packman. All rights reserved</p>
        </div>
      </StyledInfo>
    </StyledRoot>
  );
}

export default Footer;

const StyledRoot = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.776rem;
`;
const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  & > div {
    display: flex;
    gap: 1.718rem;
    & > p {
      font-size: 1.2rem;
      color: ${packmanColors.pmDarkGrey};
    }
    & > p:first-child {
      font-weight: 500;
    }
    & > p:nth-child(2) {
      font-weight: 300;
    }
  }
`;

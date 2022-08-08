import Image from 'next/image';
import styled from 'styled-components';
import pmLogo from '/public/assets/svg/pmLogo.svg';
import { packmanColors } from '../../styles/color';
import { FONT_STYLES } from '../../styles/font';

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
      color: ${packmanColors.pmDarkGrey};
    }
    & > p:first-child {
      ${FONT_STYLES.CAPTION2_SEMIBOLD};
    }
    & > p:nth-child(2) {
      ${FONT_STYLES.CAPTION1_REGULAR};
    }
  }
`;

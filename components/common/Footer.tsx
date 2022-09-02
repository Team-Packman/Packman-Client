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
          <p>Copyright</p>
        </div>
        <div>
          <p>teampackman123@gmail.com</p>
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
  gap: 0.3rem 1.5rem;

  & > div {
    display: flex;
    flex-direction: column;
    & > p {
      color: ${packmanColors.pmDarkGrey};
      ${FONT_STYLES.CAPTION2_SEMIBOLD};
    }
  }
  & > div:first-child {
    align-items: flex-end;
  }
  & > div:nth-child(2) {
    align-items: flex-start;
    & > p {
      ${FONT_STYLES.CAPTION1_REGULAR};
    }
  }
`;

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
`;
const StyledInfo = styled.div`
  display: flex;
  margin-top: 0.776rem;

  & > div {
    display: flex;
    flex-direction: column;
    margin-right: 1.4rem;
    & > p {
      color: ${packmanColors.pmDarkGrey};
      ${FONT_STYLES.CAPTION2_SEMIBOLD};
      margin: 0.3rem 0;
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

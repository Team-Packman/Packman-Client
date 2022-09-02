import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import ErrorImage from '/public/assets/png/ErrorImage.png';
import { FONT_STYLES } from '../../styles/font';
import { packmanColors } from '../../styles/color';

function Error() {
  return (
    <StyledRoot>
      <Image src={ErrorImage} alt="error" width="182" height="165" />
      <ErrorTitle>앗차차..!</ErrorTitle>
      <ErrorSubTitle>오류가 났어요</ErrorSubTitle>
      <ErrorSubTitle>다시 시도해 주세요</ErrorSubTitle>
    </StyledRoot>
  );
}

export default Error;

const StyledRoot = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorTitle = styled.div`
  font-style: ${FONT_STYLES.DISPLAY2_SEMIBOLD};
  color: ${packmanColors.pmBlack};
  margin: 3rem 0 1rem 0;
`;

const ErrorSubTitle = styled.div`
  font-style: ${FONT_STYLES.BODY3_REGULAR};
  color: ${packmanColors.pmBlack};
`;

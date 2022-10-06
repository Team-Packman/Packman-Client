import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import ErrorImage from '/public/assets/png/ErrorImage.webp';
import { FONT_STYLES } from '../../styles/font';
import { packmanColors } from '../../styles/color';
import HomeIC from '/public/assets/svg/refresh_ic.svg';
import { useRouter } from 'next/router';

interface ErrorProps {
  reset?: (...args: unknown[]) => void;
}

function Error({ reset }: ErrorProps) {
  const router = useRouter();

  const handleClick = () => {
    reset?.();
    router.reload();
  };

  return (
    <StyledRoot>
      <Image src={ErrorImage} placeholder="blur" alt="error" width="182" height="165" priority />
      <ErrorTitle>앗차차..!</ErrorTitle>
      <ErrorSubTitle>오류가 났어요</ErrorSubTitle>
      <ErrorSubTitle>다시 시도해 주세요</ErrorSubTitle>
      <ErrorReset onClick={handleClick}>
        <Image src={HomeIC} alt="refresh_ic" /> <em>새로고침</em>
      </ErrorReset>
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

const ErrorReset = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 33.6rem;
  height: 4.1rem;

  border: none;
  background-color: ${packmanColors.pmPink};

  font-size: 1.5rem;
  font-weight: 600;
  color: ${packmanColors.pmWhite};

  border-radius: 8px;

  margin-top: 13rem;

  & > em {
    margin-left: 1rem;
  }
`;

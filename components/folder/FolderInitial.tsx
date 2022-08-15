import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import InitLogo from '/public/assets/svg/home_init.svg';
import InitAloneLogo from '/public/assets/svg/home_init_alone.svg';

export interface FolderInitialProps {
  categoryName: string;
  isRecentListExist: boolean;
  onClick(): void;
}

function FolderInitial(props: FolderInitialProps) {
  const { categoryName, isRecentListExist, onClick } = props;
  const currentIndex = categoryName === 'together' ? 0 : 1;

  const [initialLables] = useState<string[]>([
    '친구와 함께 짐 목록을 작성해보세요',
    '짐 목록을 작성해보세요',
  ]);
  const [initialButtons] = useState<string[]>(['함께 패킹 시작하기', '혼자 패킹 시작하기']);

  return (
    <StyledRoot>
      {currentIndex === 0 ? (
        <Image src={InitLogo} width={273} height={273} alt="test" />
      ) : (
        <Image src={InitAloneLogo} width={273} height={273} alt="test" />
      )}
      <StyledInitialWrapper>
        <StyledLabel>{initialLables[currentIndex]}</StyledLabel>
        {!isRecentListExist && (
          <StyledStratButton onClick={onClick}>{initialButtons[currentIndex]}</StyledStratButton>
        )}
      </StyledInitialWrapper>
    </StyledRoot>
  );
}

export default FolderInitial;

const StyledRoot = styled.div`
  width: calc(100vw - 4rem);
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
  overflow-x: hidden;
`;

export const StyledInitialWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8rem;
  width: 100%;
`;

export const StyledLabel = styled.p`
  font-size: 1.4rem;
  color: ${packmanColors.pmDeepGrey};
  margin-bottom: 1rem;
`;

export const StyledStratButton = styled.button`
  width: 100%;
  padding: 1.2rem 2.9rem;
  font-size: 1.4rem;
  color: ${packmanColors.pmWhite};
  background: ${packmanColors.pmPink};
  border: none;
  border-radius: 8px;
`;

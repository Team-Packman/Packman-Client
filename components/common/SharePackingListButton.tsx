import Image from 'next/image';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import ShareIc from '/public/assets/svg/share_ic.svg';
import { packmanColors } from '../../styles/color';

interface SharePackingListButtonProps {
  children?: ReactNode;
  icon?: boolean;
}

function SharePackingListButton(props: SharePackingListButtonProps) {
  const { children, icon } = props;
  return (
    <StyledRoot>
      {icon && (
        <div>
          <Image src={ShareIc} alt="share_ic" layout="fill" />
        </div>
      )}
      {children}
    </StyledRoot>
  );
}

export default SharePackingListButton;

const StyledRoot = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  background-color: ${packmanColors.pink};
  border: 1px solid ${packmanColors.pink};
  border-radius: 0.8rem;
  font-weight: 600;
  font-size: 1.5rem;
  color: ${packmanColors.pmWhite};

  & > div {
    position: relative;
    width: 1.6rem;
    height: 1.3rem;
    margin-right: 1rem;
  }
`;

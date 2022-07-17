import Image from 'next/image';
import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { packmanColors } from '../../styles/color';
import BackIC from '/public/assets/svg/back_ic.svg';
import ProfileIC from '/public/assets/svg/profile_ic.svg';
import MemberIC from '/public/assets/svg/member_ic.svg';
import Logo from '/public/assets/svg/logo.svg';
import Link from 'next/link';

type Icon = 'profile' | 'member';

interface HeaderProps {
  children?: ReactNode;
  back?: boolean;
  title?: string;
  icon?: Icon;
}

function Header(props: HeaderProps) {
  const { back, title, icon } = props;
  return (
    <StyledRoot>
      {/* <StyledBlock /> */}
      <StyledContent>
        {back && (
          <StyledBack>
            <Image src={BackIC} layout="fill" alt="back_icon" />
          </StyledBack>
        )}
        {title ? (
          title === 'logo' ? (
            <Link href={'/'}>
              <picture>
                <Image src={Logo} layout="fill" alt="logo" />
              </picture>
            </Link>
          ) : (
            title
          )
        ) : null}
        {icon ? (
          icon === 'profile' ? (
            <Link href={'/profile/userId'}>
              <StyledIcon width={2.4} height={2.4}>
                <Image src={ProfileIC} layout="fill" alt="profile_icon" />
              </StyledIcon>
            </Link>
          ) : (
            <Link href={'/member'}>
              <StyledIcon width={6} height={2.4}>
                <Image src={MemberIC} layout="fill" alt="member_icon" />
              </StyledIcon>
            </Link>
          )
        ) : null}
      </StyledContent>
    </StyledRoot>
  );
}

export default Header;

const StyledRoot = styled.header`
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const StyledBlock = styled.div`
  width: 100%;
  height: 4.4rem;
  background-color: ${packmanColors.pmWhite};
`;

const StyledContent = styled.div`
  width: 100%;
  height: 5.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${packmanColors.pmWhite};
  font-size: 1.8rem;
  color: ${packmanColors.pmDeepGrey};

  & > picture {
    position: absolute;
    width: 11.4rem;
    height: 2.4rem;
  }
`;

const StyledBack = styled.div`
  position: absolute;
  width: 2.4rem;
  height: 2.4rem;
  left: 2rem;
`;

const StyledIcon = styled.div<{
  width: number;
  height: number;
}>`
  position: absolute;
  ${({ width, height }) => css`
    width: ${width}rem;
    height: ${height}rem;
  `}
  right: 2rem;
`;

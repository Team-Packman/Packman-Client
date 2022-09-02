import Image from 'next/image';
import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { packmanColors } from '../../styles/color';
import BackIC from '/public/assets/svg/back_ic.svg';
import ProfileIC from '/public/assets/svg/profile_ic.svg';
import MemberIC from '/public/assets/svg/member_ic.svg';
import Logo from '/public/assets/svg/logo.svg';
import Link from 'next/link';
import useGlobalState from '../../utils/hooks/useGlobalState';
import { FONT_STYLES } from '../../styles/font';
import { useHeaderRouter } from '../../utils/hooks/useHeaderRouter';

type Icon = 'profile' | 'member';

interface HeaderProps {
  children?: ReactNode;
  back?: boolean;
  title?: string;
  icon?: Icon;
}

function Header(props: HeaderProps) {
  const { back, title, icon } = props;

  const route = useHeaderRouter();
  const [scroll] = useGlobalState<boolean>('scroll');

  return (
    <StyledRoot>
      <StyledContent scroll={scroll}>
        {back && (
          <StyledBack onClick={() => route()}>
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
            <Link href={'/edit-profile'}>
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
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

const StyledContent = styled.div<{
  scroll: boolean;
}>`
  width: 100%;
  height: 5.2rem;
  transition: height 0.3s ease, opacity 0.3s ease;
  display: flex;
  ${({ scroll }) =>
    scroll &&
    css`
      height: 0;
      opacity: 0;
    `};
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${packmanColors.pmWhite};
  ${FONT_STYLES.SUBHEAD2_SEMIBOLD};
  color: ${packmanColors.pmBlack};

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

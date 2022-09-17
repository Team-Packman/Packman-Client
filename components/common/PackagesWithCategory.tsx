import Image from 'next/image';
import React, { PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import Plus from '/public/assets/svg/plus_ic.svg';

interface PackagesWithCategoryProps {
  creating?: ReactNode;
  packages?: ReactNode;
  preview?: boolean;
  isCreating?: boolean;
  createHandler?: () => void;
}
function PackagesWithCategory(props: PropsWithChildren<PackagesWithCategoryProps>) {
  const { children, packages, isCreating, creating, preview, createHandler } = props;

  return (
    <StyledRoot>
      {children}
      <ul>
        {packages}
        {isCreating && creating}
        {!preview && (
          <li>
            <StyledAddButton onClick={createHandler}>
              <Image src={Plus} alt="plus_ic" layout="fill" priority />
            </StyledAddButton>
          </li>
        )}
      </ul>
    </StyledRoot>
  );
}

export default PackagesWithCategory;

const StyledRoot = styled.ul`
  & > ul {
    margin-top: 0.8rem;
  }

  & > ul > li {
    padding: 0;
  }
  margin-bottom: 1.2rem;
`;

const StyledAddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 3.2rem;

  position: relative;

  background-color: transparent;

  border: 1px dashed ${packmanColors.pmDashGrey};
  border-radius: 0.8rem;

  margin-top: 0.4rem;
  padding: 0;

  cursor: pointer;
`;

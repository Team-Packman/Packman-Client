import Image from 'next/image';
import React, { PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';
import AddItem from '/public/assets/svg/add_item_ic.svg';

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
              <Image src={AddItem} alt="addItem_ic" layout="responsive" />
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
  position: relative;
  width: 100%;
  padding: 0;
  background-color: transparent;
  border: none;
  border-radius: 0.8rem;
  margin-top: 0.4rem;
  cursor: pointer;
`;

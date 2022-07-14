import Image from 'next/image';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import PlucIC from '/public/assets/svg/plus_ic.svg';
interface PackagesWithCategoryProps {
  children?: ReactNode;
  category: ReactNode;
  packages: ReactNode;
}

function PackagesWithCategory(props: PackagesWithCategoryProps) {
  const { category, packages } = props;

  return (
    <StyledRoot>
      {category}
      <ul>{packages}</ul>

      <StyledAddButton>
        <Image src={PlucIC} alt="pluc_ic" layout="fill" />
      </StyledAddButton>
    </StyledRoot>
  );
}

export default PackagesWithCategory;

const StyledRoot = styled.li`
  & > ul {
    margin-top: 0.8rem;
  }
  margin-bottom: 1.2rem;
`;

const StyledAddButton = styled.button`
  position: relative;
  width: 100%;
  height: 3.2rem;
  background-color: transparent;
  border: 1px dashed ${packmanColors.dashGray};
  border-radius: 0.8rem;
  margin-top: 0.4rem;
`;

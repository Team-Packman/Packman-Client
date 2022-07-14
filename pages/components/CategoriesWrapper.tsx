import React from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import Image from 'next/image';

function CategoriesWrapper() {
  return (
    <StyledRoot>
      <CategoryWrapper>
        <CategoryNameWrapper>
          <CategoryName>필수</CategoryName>
          <Image src={'/assets/png/kebabButton.png'} alt={'categoryName'} width={24} height={24} />
        </CategoryNameWrapper>
        <ListItemWrapper>
          <input type="checkbox" />
          <ListItemName maxLength={12} />
        </ListItemWrapper>
      </CategoryWrapper>
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.6rem 0;
`;

const CategoryWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CategoryNameWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.4rem 0 0.4rem 1.2rem;
  height: 3.2rem;
  background-color: ${packmanColors.pmLightGrey};
  border-radius: 0.8rem;
`;

const CategoryName = styled.div`
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 1.7rem;
  display: inline;
  color: ${packmanColors.pmBlack};
`;

const ListItemWrapper = styled.div``;

const ListItemName = styled.input``;

export default CategoriesWrapper;

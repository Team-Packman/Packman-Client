import React from 'react';
import styled from 'styled-components';
import { packmanColors } from '../styles/color';
import Image from 'next/image';
import PackingListHeader from './components/PackingListHeader';
import CategoriesWrapper from './components/CategoriesWrapper';

function WritingPackingList() {
  return (
    <>
      <WritingPackingListComponent>
        <PackingListHeader />
        <CategoriesWrapper />
        <StyledButtonsWrapper>
          <StyledAddMyTemplate>나만의 템플릿으로 추가</StyledAddMyTemplate>
          <StyledPackingListShare>패킹리스트 공유</StyledPackingListShare>
        </StyledButtonsWrapper>
      </WritingPackingListComponent>
    </>
  );
}

export default WritingPackingList;

const WritingPackingListComponent = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 2.5rem 2rem 0 2rem;
`;

const StyledButtonsWrapper = styled.section``;

const StyledAddMyTemplate = styled.button``;

const StyledPackingListShare = styled.button``;

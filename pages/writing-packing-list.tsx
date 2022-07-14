import React from 'react';
import styled from 'styled-components';
import { packmanColors } from '../styles/color';
import Image from 'next/image';
import PackingListHeader from './components/packingListHeader';

function WritingPackingList() {
  return (
    <>
      <WritingPackingListComponent>
        <PackingListHeader />
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

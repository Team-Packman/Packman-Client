import React from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import { MyType } from '../folder';

function FolderBox(props: MyType) {
  const { id, title, listNum } = props;

  return (
    <StyledRoot key={id}>
      <StyledInfo>
        <StyledTitle>{title}</StyledTitle>
        <StyledFolderInfo>{listNum}개의 리스트</StyledFolderInfo>
      </StyledInfo>
    </StyledRoot>
  );
}

export default FolderBox;

export const StyledRoot = styled.section`
  width: 16.4rem;
  height: 16.4rem;
  background-color: ${packmanColors.pmBlueGrey};
  border-radius: 1rem;
`;

export const StyledInfo = styled.div``;

export const StyledTitle = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
`;

export const StyledFolderInfo = styled.p`
  font-size: 1.2rem;
  color: ${packmanColors.pmDeepGrey};
`;

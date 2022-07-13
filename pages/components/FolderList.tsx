import React from 'react';
import styled from 'styled-components';
import { MyArrayType } from '../folder';
import FolderBox from './FolderBox';

// Mock API 나오면 아래 형식으로 변경
// export interface SearchProjectProps {
//     projectMetadata: ProjectMeta;
//   }

function FolderList(props: MyArrayType) {
  const { data } = props;

  return (
    <StyledRoot>
      {data?.map((v) => (
        <FolderBox key={v.id} {...v} />
      ))}
    </StyledRoot>
  );
}

export default FolderList;

export const StyledRoot = styled.section`
  width: 100%;
  --auto-grid-min-size: 16rem;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr));
  grid-gap: 1rem;
  margin-top: 2.4rem;
`;

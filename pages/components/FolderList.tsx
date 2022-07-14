import React from 'react';
import styled from 'styled-components';
import FolderBox from './FolderBox';

interface Folder {
  id: string;
  title: string;
  listNum: number;
}
interface FolderListProps {
  list: Folder[];
}

function FolderList({ list }: FolderListProps) {
  return (
    <StyledRoot>
      {list?.map((v) => (
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

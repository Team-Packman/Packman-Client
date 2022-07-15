import React from 'react';
import styled from 'styled-components';
import FolderBox from './FolderBox';

export interface FolderProps {
  id: string;
  title: string;
  listNum: number;
}
export interface FolderListProps {
  list: FolderProps[];
  categoryName: string;
  editableFolderId: string;
  onClick(id: string, title: string): void;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onKeyPress(e: React.KeyboardEvent<HTMLInputElement>): void;
  onFolderClick(id: string, categoryName: string): void;
}

function FolderList(props: FolderListProps) {
  const { list } = props;
  return (
    <StyledRoot>
      {list?.map((v) => (
        <FolderBox key={v.id} {...v} {...props} />
      ))}
    </StyledRoot>
  );
}

export default FolderList;

export const StyledRoot = styled.section`
  width: 100%;
  height: 100vh;
  --auto-grid-min-size: 16rem;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr));
  grid-gap: 1rem;
  justify-items: stretch;
  margin-top: 2.4rem;
`;

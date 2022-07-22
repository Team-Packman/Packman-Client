import React from 'react';
import styled from 'styled-components';
import FolderBox from './FolderBox';
export interface FolderProps {
  _id?: string;
  title?: string;
  listNum?: number;
}
export interface FolderListProps {
  list: FolderProps[];
  categoryName?: string;
  editableFolderId?: string;
  isEditing: boolean;
  onClick(id: string, title: string): void;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onKeyPress(e: React.KeyboardEvent<HTMLInputElement>): void;
  onFolderClick(id: string, categoryName: string): void;
  handleAddFolderChange(e: React.ChangeEvent<HTMLInputElement>): void;
  handleAddFolderKeyPress(e: React.KeyboardEvent<HTMLInputElement>): void;
  handleCancleAddFolder(): void;
}

function FolderList(props: FolderListProps) {
  const { list, isEditing } = props;

  return (
    <StyledListRoot>
      <StyledWrapper>
        {isEditing && <FolderBox key={0} isNew={isEditing} {...props} />}
        {list?.map((v) => (
          <FolderBox key={v._id} isNew={false} {...v} {...props} />
        ))}
      </StyledWrapper>
    </StyledListRoot>
  );
}

export default FolderList;

export const StyledListRoot = styled.section`
  width: 100%;
  height: 100%;
`;

export const StyledWrapper = styled.div`
  --auto-grid-min-size: 16rem;
  display: grid;
  align-items: start;
  grid-template-columns: repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr));
  grid-gap: 1rem;
  justify-items: stretch;
  margin-top: 2.4rem;
`;

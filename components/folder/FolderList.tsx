import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FolderBox from './FolderBox';
import FolderInitial from './FolderInitial';
export interface FolderProps {
  id?: string;
  name?: string;
  listNum?: string;
}
export interface FolderListProps {
  list: FolderProps[];
  categoryName: string;
  editableFolderId?: string;
  addNewFolder: boolean;
  isFolderExist: boolean;
  onClick(id: string, title: string): void;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onFolderClick(id: string, categoryName: string): void;
  handleAddFolderChange(e: React.ChangeEvent<HTMLInputElement>): void;
  handleOnBlurInEdit(): void;
  handleOnBlurInAdd(): void;
  handleCancleAddFolder(): void;
  handleStartButtonInInit(): void;
}

function FolderList(props: FolderListProps) {
  const {
    list,
    addNewFolder,
    categoryName = '',
    isFolderExist = false,
    handleStartButtonInInit,
  } = props;

  const [showInitialPage, setShowIntitialPage] = useState<boolean>(list?.length <= 0);

  const handleStartButton = () => {
    setShowIntitialPage(false);
    handleStartButtonInInit();
  };

  useEffect(() => {
    setShowIntitialPage(list.length <= 0);
  }, [list.length, addNewFolder]);

  useEffect(() => {
    if (addNewFolder && showInitialPage) {
      setShowIntitialPage(false);
    }
  }, [addNewFolder, showInitialPage]);

  return (
    <StyledListRoot>
      <StyledWrapper>
        {!showInitialPage ? (
          <>
            {addNewFolder && <FolderBox key={0} isNew={addNewFolder} {...props} />}
            {list?.map((v) => (
              <FolderBox key={v.id} isNew={false} {...v} {...props} />
            ))}
          </>
        ) : (
          <FolderInitial
            categoryName={categoryName}
            isFolderExist={isFolderExist}
            onClick={handleStartButton}
          />
        )}
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
  --auto-grid-min-size: 13rem;
  display: grid;
  align-items: start;
  grid-template-columns: repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr));
  grid-gap: 1rem;
  justify-items: stretch;
  margin-top: 2.4rem;
  padding-bottom: 5rem;
`;

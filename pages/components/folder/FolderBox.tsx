import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../../styles/color';
import { FolderListProps, FolderProps } from './FolderList';
import Kebab from '../../assets/kebab.svg';
import Close from '../../assets/close.svg';

type FolderBoxProps = FolderProps & Omit<FolderListProps, 'list'>;
interface AddNewFolderType {
  isNew: boolean;
}

function FolderBox(props: FolderBoxProps & AddNewFolderType) {
  const {
    id = '',
    title = '',
    listNum = 0,
    editableFolderId = '',
    categoryName = '',
    isNew = false,
    onClick: handleBottomModalOpen,
    onChange: handleFolderNameChange,
    onKeyPress: handleEnterKeyPress,
    onFolderClick: handleFolderClick,
    handleAddFolderChange,
    handleAddFolderKeyPress,
    handleCancleAddFolder,
  } = props;

  const inputElement = useRef<HTMLInputElement>(null);

  const onClickIcon = (id: string, title: string) => {
    if (!isNew) {
      handleBottomModalOpen(id, title);
    } else {
      handleCancleAddFolder();
    }
  };

  const onClickFolder = (id: string, categoryName: string) => {
    if (!isNew) {
      handleFolderClick(id, categoryName);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNew) {
      handleFolderNameChange(e);
    } else {
      handleAddFolderChange(e);
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isNew) {
      handleEnterKeyPress(e);
    } else {
      handleAddFolderKeyPress(e);
    }
  };

  useEffect(() => {
    if (editableFolderId === id) {
      inputElement.current?.focus();
    }
  }, [editableFolderId, id]);

  return (
    <StyledRoot key={id}>
      <StyledInfo>
        <StyledKebab>
          <span onClick={() => onClickIcon(id, title)}>
            {isNew ? (
              <Image src={Close} alt="Close icon" width={14} height={14} />
            ) : (
              <Image src={Kebab} alt="kebab icon" width={3} height={14} />
            )}
          </span>
        </StyledKebab>
        <StyledText onClick={() => onClickFolder(id, categoryName)}>
          <StyledTitle
            type="text"
            name="title"
            ref={inputElement}
            defaultValue={isNew ? '' : title}
            placeholder={isNew ? '폴더 이름 입력' : ''}
            onChange={(e) => onChange(e)}
            onKeyPress={(e) => onKeyPress(e)}
            disabled={isNew ? !isNew : editableFolderId !== id}
            autoFocus
            isNew={isNew}
            maxLength={8}
          />
          <StyledFolderInfo>{listNum}개의 리스트</StyledFolderInfo>
        </StyledText>
      </StyledInfo>
    </StyledRoot>
  );
}

export default FolderBox;

export const StyledRoot = styled.section`
  height: 16.4rem;
  background-color: ${packmanColors.pmBlueGrey};
  border-radius: 1rem;
  border-color: #fff;
  position: relative;
  z-index: 1;

  &:before {
    position: absolute;
    content: '';
    bottom: 0;
    border-style: solid;
    width: 100%;
    border-width: 0.5rem;
    border-color: ${packmanColors.pmGrey};
    border-radius: 0 0 0.8rem 0.8rem;
  }
`;

export const StyledInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledKebab = styled.div`
  display: flex;
  justify-content: end;
  padding: 0.9rem 1.6rem 0 0;
  z-index: 10;
  cursor: pointer;
`;

export const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 0 2rem 1.6rem;
  height: 100%;
`;

export const StyledTitle = styled.input<{ isNew: boolean }>`
  font-size: 1.4rem;
  font-weight: 600;
  background: ${packmanColors.pmBlueGrey};
  border: 1px solid ${packmanColors.pmDeepGrey};
  border-radius: 0.4rem;
  margin: 0 0.8rem 0 0;
  color: ${({ isNew }) => (isNew ? `${packmanColors.pmDeepGrey}` : `${packmanColors.pmBlack}`)};
  -webkit-text-fill-color: ${({ isNew }) =>
    isNew ? `${packmanColors.pmDeepGrey}` : `${packmanColors.pmBlack}`};
  -webkit-opacity: 1;
  &:disabled {
    border: 0;
    padding: 0;
    color: ${packmanColors.pmBlack};
  }
`;

export const StyledFolderInfo = styled.p`
  font-size: 1.2rem;
  color: ${packmanColors.pmDeepGrey};
`;

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import { FolderListProps, FolderProps } from './FolderList';
import Kebab from '/public/assets/svg/kebab_ic.svg';
import Close from '/public/assets/svg/iClose.svg';

type FolderBoxProps = FolderProps & Omit<FolderListProps, 'list'>;
interface AddNewFolderType {
  isNew: boolean;
}

function FolderBox(props: FolderBoxProps & AddNewFolderType) {
  const {
    id = '',
    name = '',
    listNum = '',
    editableFolderId = '',
    categoryName = '',
    isNew = false,
    onClick: handleBottomModalOpen,
    onChange: handleFolderNameChange,
    onFolderClick: handleFolderClick,
    handleAddFolderChange,
    handleOnBlurInAdd,
    handleCancleAddFolder,
    handleOnBlurInEdit,
  } = props;

  const inputElement = useRef<HTMLInputElement>(null);
  const [activeInput, setActiveInput] = useState<boolean>(false);

  const onClickIcon = (id: string, title: string) => {
    if (!isNew) {
      handleBottomModalOpen(id, title);
    } else {
      handleCancleAddFolder();
    }
  };

  const onClickFolder = (e: React.MouseEvent<HTMLElement>, id: string, categoryName: string) => {
    e.preventDefault();
    if (e.target instanceof HTMLInputElement) {
      return;
    } else {
      if (!isNew) {
        handleFolderClick(id, categoryName);
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!isNew) {
      handleFolderNameChange(e);
    } else {
      handleAddFolderChange(e);
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      onBlur();
    }
  };

  const onBlur = () => {
    setActiveInput(false);
    if (!isNew) {
      handleOnBlurInEdit();
    } else {
      handleOnBlurInAdd();
    }
  };

  useEffect(() => {
    if (inputElement.current || activeInput) {
      inputElement.current?.focus();
    }

    if (editableFolderId === id) {
      setActiveInput(true);
    }

    if (isNew) {
      setActiveInput(true);
    }
  }, [inputElement, editableFolderId, id, isNew, activeInput]);

  return (
    <StyledRoot key={id}>
      <StyledInfo>
        <StyledKebab>
          <span onClick={() => onClickIcon(id, name)}>
            {isNew ? (
              <Image src={Close} alt="Close icon" width={14} height={14} />
            ) : (
              <Image src={Kebab} alt="kebab icon" width={25} height={25} />
            )}
          </span>
        </StyledKebab>
        <StyledText onClick={(e) => onClickFolder(e, id, categoryName)}>
          <input type="password" autoComplete="off" style={{ display: 'none' }} />
          <StyledTitle
            type="text"
            name="title"
            ref={inputElement}
            defaultValue={isNew ? '' : name}
            placeholder={isNew ? '폴더 이름 입력' : ''}
            onChange={(e) => onChange(e)}
            onKeyPress={(e) => onKeyPress(e)}
            onBlur={onBlur}
            disabled={!activeInput}
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
  background-image: linear-gradient(to top, ${packmanColors.pmGrey} 8%, rgba(0, 0, 0, 0) 8%);
  border-radius: 1rem;
  border-color: #fff;
  position: relative;
  z-index: 1;
`;

export const StyledInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledKebab = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem 0.4rem 0 0;
  z-index: 10;
  cursor: pointer;

  & > span {
    z-index: 100;
    cursor: pointer;
  }
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
  /* Safari에서 font color 무시되는 경우를 위한 코드 */
  -webkit-text-fill-color: ${({ isNew }) =>
    isNew ? `${packmanColors.pmDeepGrey}` : `${packmanColors.pmBlack}`};
  opacity: 1;

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

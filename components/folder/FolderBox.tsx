import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import { FolderListProps, FolderProps } from './FolderList';
import Kebab from '/public/assets/svg/kebab_ic.svg';
import Close from '/public/assets/svg/iClose.svg';
import { FONT_STYLES } from '../../styles/font';

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

  const ref = useRef<HTMLInputElement | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(name);

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
    setTitle(e.target.value);

    if (!isNew) {
      handleFolderNameChange(e);
    } else {
      handleAddFolderChange(e);
    }
  };

  const onBlur = () => {
    setIsEditing(false);

    title === '' && setTitle(name);

    if (!isNew) {
      handleOnBlurInEdit();
    } else {
      handleOnBlurInAdd();
    }
  };

  useEffect(() => {
    if (isEditing) {
      ref.current && ref.current?.focus();
    }

    if (editableFolderId === id) {
      setIsEditing(true);
    }

    if (isNew) {
      setIsEditing(true);
    }
  }, [ref, editableFolderId, id, isNew, isEditing]);

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
          <StyledInput
            type="text"
            ref={ref}
            value={title}
            placeholder={isNew ? '폴더 이름 입력' : ''}
            onChange={onChange}
            onBlur={onBlur}
            disabled={!isEditing}
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
  padding: 0.5rem 0rem 0 0;
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

export const StyledInput = styled.input<{ isNew: boolean }>`
  ${FONT_STYLES.SUBHEAD1_SEMIBOLD};
  background: ${packmanColors.pmBlueGrey};
  border: 1px solid ${packmanColors.pmDeepGrey};
  border-radius: 0.4rem;
  margin: 0 0.8rem 0 0;
  color: ${({ isNew }) => (isNew ? `${packmanColors.pmDeepGrey}` : `${packmanColors.pmBlack}`)};
  /* Safari에서 font color 무시되는 경우를 위한 코드 */
  -webkit-text-fill-color: ${({ isNew }) =>
    isNew ? `${packmanColors.pmDeepGrey}` : `${packmanColors.pmBlack}`};
  opacity: 1;

  &:focus {
    outline: none;
  }

  &:disabled {
    border: 0;
    padding: 0.3rem 0;
    color: ${packmanColors.pmBlack};
  }
`;

export const StyledFolderInfo = styled.p`
  ${FONT_STYLES.CAPTION1_REGULAR};
  color: ${packmanColors.pmDeepGrey};
`;

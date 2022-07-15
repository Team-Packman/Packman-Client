import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import { FolderListProps, FolderProps } from './FolderList';
import Kebab from '../assets/kebab.svg';

type FolderBoxProps = FolderProps & Omit<FolderListProps, 'list'>;

function FolderBox(props: FolderBoxProps) {
  const {
    id,
    title,
    listNum,
    editableFolderId,
    onClick: handleBottomModalOpen,
    onChange: handleFolderNameChange,
    onKeyPress: handleEnterKeyPress,
  } = props;

  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editableFolderId === id) {
      inputElement.current?.focus();
    }
  }, [editableFolderId, id]);
  return (
    <StyledRoot key={id}>
      <StyledInfo>
        <StyledKebab>
          <span onClick={() => handleBottomModalOpen(id, title)}>
            <Image src={Kebab} alt="kebab icon" width={3} height={14} />
          </span>
        </StyledKebab>
        <StyledText>
          <StyledTitle
            type="text"
            name="title"
            ref={inputElement}
            defaultValue={title}
            onChange={(e) => handleFolderNameChange(e)}
            onKeyPress={handleEnterKeyPress}
            disabled={editableFolderId !== id}
            autoFocus
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

  &:before {
    position: absolute;
    content: '';
    bottom: 0;
    right: 0;
    border-style: solid;
    width: 0;
    border-width: 15px;
    border-color: ${packmanColors.pmPink} rgba(255, 255, 255, 0.9) rgba(255, 255, 255, 0.9)
      ${packmanColors.pmPink};
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
`;

export const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 0.9rem 1.6rem;
`;

export const StyledTitle = styled.input`
  font-size: 1.4rem;
  font-weight: 600;
  background: ${packmanColors.pmBlueGrey};
  border: 1px solid ${packmanColors.pmDeepGrey};
  border-radius: 0.4rem;
  margin: 0 0.8rem 0 0;

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

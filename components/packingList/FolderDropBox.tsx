import { PropsWithChildren, useContext } from 'react';
import { useRouter } from 'next/router';
import React from 'react';
import { DropdownContext } from '../common/Dropdown';
import DropBox from './DropBox';
import styled, { css } from 'styled-components';
import { packmanColors } from '../../styles/color';
import { FONT_STYLES } from '../../styles/font';
import iShowMore from '../../public/assets/svg/iShowMore.svg';
import Image from 'next/image';
import { useInventory } from '../../utils/hooks/queries/inventory';

interface FolderDropBoxProps {
  onClick: VoidFunction;
}

interface FolderDropBoxTriggerProps {
  onClick: VoidFunction;
  currentFolderName: string;
}
interface FolderDropBoxItemProps {
  id?: string;
  name?: string;
  currentFolderId?: string;
  onChange?: () => void;
}

function FolderDropBox(props: FolderDropBoxProps) {
  const { onClick: cancelDeleteMode } = props;
  const router = useRouter();
  const type = router.query.type as string;
  const id = router.query.id as string;

  const inventory = useInventory({ id, type });
  if (!inventory) return null;

  const onChange = (selectedFolderId: string) => {
    router.push(`/packing-list?type=${type}&id=${selectedFolderId}`);
    cancelDeleteMode();
  };

  const {
    folder,
    currentFolder: { id: currentFolderId, name: currentFolderName },
  } = inventory.data;

  return (
    <DropBox
      data={folder}
      onChange={onChange}
      trigger={
        <FolderDropBoxTrigger currentFolderName={currentFolderName} onClick={cancelDeleteMode} />
      }
      item={<FolderDropBoxItem currentFolderId={currentFolderId} />}
    />
  );
}

function FolderDropBoxTrigger(props: FolderDropBoxTriggerProps) {
  const { onClick: cancelDeleteMode, currentFolderName } = props;
  const { isOpen, open } = useContext(DropdownContext);

  const onClick = () => {
    cancelDeleteMode();
    open();
  };

  return (
    <StyledTrigger onClick={onClick}>
      <label>{currentFolderName}</label>

      <StyledToggleImage isOpen={isOpen}>
        <Image src={iShowMore} alt="상세보기" layout="fill" />
      </StyledToggleImage>
    </StyledTrigger>
  );
}

function FolderDropBoxItem(props: PropsWithChildren<FolderDropBoxItemProps>) {
  const { children, id, name, currentFolderId, onChange } = props;

  return (
    <StyledItem onClick={onChange} isCurrentFolder={id === currentFolderId}>
      {children}
    </StyledItem>
  );
}

export default FolderDropBox;

const StyledItem = styled.div<{ isCurrentFolder: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 4.8rem;

  font-size: 1.5rem;

  &:not(:last-child) {
    border-bottom: 1px solid ${packmanColors.pmGrey};
  }

  ${({ isCurrentFolder }) =>
    isCurrentFolder
      ? css`
          ${FONT_STYLES.BODY4_SEMIBOLD};
          color: ${packmanColors.pmBlack};
        `
      : css`
          ${FONT_STYLES.BODY3_REGULAR};
          color: ${packmanColors.pmDarkGrey};
        `}
`;

const StyledTrigger = styled.div`
  display: flex;

  & > label {
    ${FONT_STYLES.HEADLINE2_SEMIBOLD};
  }
`;

const StyledToggleImage = styled.div<{ isOpen?: boolean }>`
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

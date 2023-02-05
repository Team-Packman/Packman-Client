import { PropsWithChildren, useContext } from 'react';
import { useRouter } from 'next/router';
import React from 'react';
import { DropdownContext } from '../common/Dropdown';
import DropBox from './DropBox';
import styled, { css } from 'styled-components';
import { packmanColors } from '../../styles/color';
import { FONT_STYLES } from '../../styles/font';
import { useQuery } from 'react-query';
import apiService from '../../service';
import iShowMore from '../../public/assets/svg/iShowMore.svg';
import Image from 'next/image';

interface FolderDropBoxProps {
  onClick: VoidFunction;
}

interface FolderDropBoxTriggerProps {
  currentFolderName: string;
}
interface FolderDropBoxItemProps {
  value?: { id: string; name: string };
  currentFolderId?: string;
  onChange?: () => void;
}

function FolderDropBox(props: FolderDropBoxProps) {
  const { onClick: cancelDeleteMode } = props;
  const router = useRouter();
  const type = router.query.type as string;
  const id = router.query.id as string;

  const getAloneInventory = apiService.inventory.alone.getAloneInventory;
  const getTogetherInventory = apiService.inventory.together.getTogetherInventory;

  const { data: togetherInventory } = useQuery(
    ['getTogetherInventory', id],
    () => getTogetherInventory(id),
    {
      enabled: type === 'together' && !!id,
    },
  );
  const { data: aloneInventory } = useQuery(
    ['getAloneInventory', id],
    () => getAloneInventory(id),
    {
      enabled: type === 'alone' && !!id,
    },
  );

  const inventory = aloneInventory ?? togetherInventory;
  if (!inventory) return null;

  const onChange = (selectedFolderId?: string) => {
    if (!selectedFolderId) selectedFolderId = id;
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
      trigger={<FolderDropBoxTrigger currentFolderName={currentFolderName} />}
      item={<FolderDropBoxItem currentFolderId={currentFolderId} />}
    />
  );
}

function FolderDropBoxTrigger(props: FolderDropBoxTriggerProps) {
  const { currentFolderName } = props;
  const { isOpen, onChange } = useContext(DropdownContext);

  return (
    <StyledTrigger onClick={onChange}>
      <label>{currentFolderName}</label>

      <StyledToggleImage isOpen={isOpen}>
        <Image src={iShowMore} alt="상세보기" layout="fill" />
      </StyledToggleImage>
    </StyledTrigger>
  );
}

function FolderDropBoxItem(props: PropsWithChildren<FolderDropBoxItemProps>) {
  const { children, value, currentFolderId, onChange } = props;
  const router = useRouter();
  const type = router.query.type as string;

  const changeFolder = (id: string | undefined) => {
    onChange && onChange();
    router.push(`/packing-list?type=${type}&id=${id || currentFolderId}`);
  };

  return (
    <StyledItem
      onClick={() => changeFolder(value?.id)}
      isCurrentFolder={value?.id === currentFolderId}
    >
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

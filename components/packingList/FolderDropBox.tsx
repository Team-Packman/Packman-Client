import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Dropdown from '../common/Dropdown';
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

  const {
    folder,
    currentFolder: { id: currentFolderId, name: currentFolderName },
  } = inventory.data;

  return (
    <DropBox
      data={
        <>
          {folder.map(({ id, name }) => (
            <Dropdown.Item key={id} overlay={dropdownItemStyle}>
              <Link href={`/packing-list?type=${type}&id=${id}`}>
                <StyledItem isCurrentFolder={id === currentFolderId}>{name}</StyledItem>
              </Link>
            </Dropdown.Item>
          ))}
        </>
      }
      onChange={cancelDeleteMode}
      trigger={<FolderDropBoxTrigger currentFolderName={currentFolderName} />}
    />
  );
}

function FolderDropBoxTrigger(props: FolderDropBoxTriggerProps) {
  const { currentFolderName } = props;

  return (
    <StyledTrigger>
      <h1>{currentFolderName}</h1>

      <StyledToggleImage className="rotate">
        <Image src={iShowMore} alt="상세보기" layout="fill" />
      </StyledToggleImage>
    </StyledTrigger>
  );
}

export default FolderDropBox;

const dropdownItemStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 4.8rem;

  font-size: 1.5rem;

  &:not(:last-child) {
    border-bottom: 1px solid ${packmanColors.pmGrey};
  }
`;

const StyledItem = styled.div<{ isCurrentFolder: boolean }>`
  display: flex;
  justify-content: center;

  width: 100%;

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

  & > h1 {
    ${FONT_STYLES.HEADLINE2_SEMIBOLD};
  }
`;

const StyledToggleImage = styled.div`
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  transition: 0.2s ease-in-out;
  cursor: pointer;
`;

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

interface FolderDropBoxProps {
  onChange: VoidFunction;
}

function FolderDropBox(props: FolderDropBoxProps) {
  const { onChange } = props;

  return <DropBox data={<FolderDropBoxItem />} onChange={onChange} />;
}

function FolderDropBoxItem() {
  const router = useRouter();
  const id = router.query.id as string;
  const type = router.query.type as string;

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
    currentFolder: { id: currentFolderId },
  } = inventory.data;

  return (
    <>
      {folder.map(({ id, name }) => (
        <Dropdown.Item key={id} overlay={dropdownItemStyle}>
          <Link href={`/packing-list?type=${type}&id=${id}`}>
            <StyledItem isCurrentFolder={id === currentFolderId}>{name}</StyledItem>
          </Link>
        </Dropdown.Item>
      ))}
    </>
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

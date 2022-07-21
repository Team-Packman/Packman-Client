import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { shallowEqualObjects } from 'react-query/types/core/utils';
import styled from 'styled-components';
import { packmanColors } from '../../../styles/color';

interface DropBoxProps {
  folderList: { _id: string; title: string }[];
  closeDropBox: () => void;
  currentId: string;
  categoryName: string;
}

function DropBox(props: DropBoxProps) {
  const { folderList, closeDropBox, currentId, categoryName } = props;
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <>
      <StyledBackground onClick={closeDropBox} />
      <StyledRoot>
        {folderList.map(({ _id, title }) => (
          <StyledItem
            key={_id}
            currentId={_id === currentId}
            onClick={() => {
              router.push(`/packing-list/${categoryName}/${_id}`, undefined, { shallow: true });

              queryClient.invalidateQueries('getAloneInventory');
              queryClient.invalidateQueries('getTogetherInventory');
            }}
          >
            {title}
          </StyledItem>
        ))}
      </StyledRoot>
    </>
  );
}

export default DropBox;

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: none;
  z-index: 10;
`;

const StyledRoot = styled.div`
  position: absolute;
  width: 16rem;
  top: 4.2rem;
  background-color: ${packmanColors.pmWhite};
  border-radius: 0.8rem;
  filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.1));
  z-index: 100;
`;
const StyledItem = styled.div<{ currentId: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4.8rem;
  font-weight: ${({ currentId }) => (currentId ? '600' : '400')};
  font-size: 1.5rem;
  color: ${packmanColors.pmDarkGrey};
  border-bottom: 1px solid ${packmanColors.pmGrey};
`;

import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery, useQueryClient } from 'react-query';
import Layout from '../common/Layout';
import useGlobalState from '../../utils/hooks/useGlobalState';
import CheckListHeader from '../together/CheckListHeader';
import useAPI from '../../utils/hooks/useAPI';
import CheckListSubHeader from '../together/CheckListSubHeader';
import { packmanColors } from '../../styles/color';

interface RemainingInfoPayload {
  listId: string;
  title?: string;
  departureDate?: string;
  isSaved?: boolean;
  isAloned?: boolean;
}

type RemainingInfoType = 'title' | 'departure' | 'save';

function AloneLanding() {
  const client = useQueryClient();
  const [scroll, setScroll] = useGlobalState('scroll', false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentCreatingCategory, setCurrentCreatingCategory] = useState('');

  const getPackingListDeatil = useAPI((api) => api.packingList.alone.getPackingListDeatil);
  const { data } = useQuery('getAlonePackingListDeatil', () => getPackingListDeatil('3'), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  if (!data) return null;
  const { data: info } = data;
  const creatingCategoryHandler = () => setCurrentCreatingCategory(info._id);
  const createdCategoryHandler = () => setCurrentCreatingCategory('');
  const updateRemainingInfo = (payload: RemainingInfoPayload, type: RemainingInfoType) => {
    const { listId, title, departureDate, isSaved, isAloned = false } = payload;

    switch (type) {
      case 'title':
        console.log({
          listId,
          title,
          isAloned,
        });
        return;
      case 'departure':
        console.log({
          listId,
          departureDate,
          isAloned,
        });
        return;
      case 'save':
        console.log({
          listId,
          isSaved,
          isAloned,
        });
        return;
      default:
        return;
    }
  };
  return (
    <Layout
      back
      title="템플릿 미리보기"
      option={
        <CheckListHeader
          listId={info._id}
          departureDate={info.departureDate}
          title={info.title}
          updateRemainingInfo={updateRemainingInfo}
        />
      }
    >
      <StyledAloneLanding>
        <CheckListSubHeader categoryHandler={creatingCategoryHandler} />
      </StyledAloneLanding>
    </Layout>
  );
}

export default AloneLanding;

const StyledAloneLanding = styled.div`
  height: 100%;
  background-color: ${packmanColors.white};
  overflow: hidden;
`;

import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import useAPI from '../../../utils/hooks/useAPI';
import styled from 'styled-components';
import Layout from '../../../components/common/Layout';
import Loading from '../../../components/common/Loading';
import FunctionSection from '../../../components/common/FunctionSection';
import SharePackingListButton from '../../../components/common/SharePackingListButton';
import PackagesWithCategory from '../../../components/common/PackagesWithCategory';
import PackingItem from '../../../components/common/PackingItem';
import PackingCategory from '../../../components/common/PackingCategory';
import CheckListHeader from '../../../components/together/CheckListHeader';

function SharedLanding() {
  const router = useRouter();
  const { id } = router.query;

  const getAlonePackingListDetail = useAPI(
    (api) => api.packingList.alone.getAlonePackingListDetail,
  );
  const { data } = useQuery(
    ['getAlonePackingListDetail', id],
    () => getAlonePackingListDetail(id as string),
    {
      enabled: !!id,
    },
  );

  if (!data) return <Loading />;
  const { data: info } = data;

  return (
    <Layout
      title="logo"
      option={
        <CheckListHeader
          listId={info.id}
          departureDate={info.departureDate}
          title={info.title}
          shared
        />
      }
    >
      <StyledBody>
        {info.category.map(({ id, name, pack }) => (
          <PackagesWithCategory
            key={id}
            preview
            packages={
              <>
                {pack.map(({ id, name }) => (
                  <PackingItem key={id} name={name} example />
                ))}
              </>
            }
          >
            <PackingCategory example name={name} />
          </PackagesWithCategory>
        ))}
        <StyledScrollBlock />
      </StyledBody>
      <FunctionSection>
        <SharePackingListButton onClick={() => router.push('/folder')}>
          나도 팩맨으로 짐 싸보기
        </SharePackingListButton>
      </FunctionSection>
    </Layout>
  );
}

export default SharedLanding;

const StyledBody = styled.div`
  display: flex;
  //100% - subheader - device
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
  margin-bottom: 24.4rem;
  padding: 0 2rem;
  padding-top: 1.6rem;
`;

const StyledScrollBlock = styled.div`
  width: 100%;
  min-height: 12.1rem;
  background-color: transparent;
`;

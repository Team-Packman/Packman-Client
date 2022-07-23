import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import useAPI from '../../utils/hooks/useAPI';
import Layout from '../common/Layout';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import FunctionSection from '../common/FunctionSection';
import AddTemplateButton from '../common/AddTemplateButton';
import SharePackingListButton from '../common/SharePackingListButton';
import PackagesWithCategory from '../common/PackagesWithCategory';
import PackingCategory from '../common/PackingCategory';
import PackingItem from '../common/PackingItem';
import { GetTemplateOutput } from '../../service/ect';
interface Query {
  categoryName: 'alone' | 'together';
  type: 'basic' | 'alone' | 'together';
  id: string;
}

function PreviewLanding() {
  const router = useRouter();
  const { id, type, categoryName } = router.query;
  const client = useQueryClient();
  const [data, setData] = useState<GetTemplateOutput | null>(null);

  const getTemplate = useAPI((api) => api.ect.getTemplate);

  useEffect(() => {
    if (router.isReady) {
      (async () => {
        const query = router.query;
        const data = await client.fetchQuery('getTemplate', () =>
          getTemplate({
            templateId: id as string,
            type: categoryName as 'basic' | 'alone' | 'together',
          }),
        );
        setData(data);
      })();
    }
  }, [router.isReady]);

  if (!data || !router.query) return null;
  const { data: info } = data;
  return (
    <Layout
      back
      title="템플릿 미리보기"
      option={<StyledPreviewHeader>{info.title}</StyledPreviewHeader>}
    >
      <StyledBody>
        {info.category.map(({ _id, name, pack }) => (
          <PackagesWithCategory
            key={_id}
            packages={
              <>
                {pack.map(({ _id, name }) => (
                  <PackingItem key={_id} name={name} example />
                ))}
              </>
            }
          >
            <PackingCategory example name={name} />
          </PackagesWithCategory>
        ))}
      </StyledBody>
      <FunctionSection>
        <AddTemplateButton
          onClick={() => {
            //
          }}
        >
          직접 작성하기
        </AddTemplateButton>
        <SharePackingListButton>템플릿 불러오기</SharePackingListButton>
      </FunctionSection>
    </Layout>
  );
}

export default PreviewLanding;

const StyledPreviewHeader = styled.div`
  height: 8.4rem;
  line-height: 8.4rem;
  font-weight: 800;
  font-size: 2.8rem;
  padding: 0 2rem;
  color: ${packmanColors.black};
  background-color: ${packmanColors.pmWhite};
  box-shadow: 0px 3px 13px rgba(0, 0, 0, 0.05);
  z-index: 90;
`;

const StyledBody = styled.div`
  display: flex;
  //100% - subheader - device
  height: calc(100% - 11rem - 10rem);
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
  margin-bottom: 24.4rem;
  padding: 0 2rem;
  padding-top: 1.6rem;
`;

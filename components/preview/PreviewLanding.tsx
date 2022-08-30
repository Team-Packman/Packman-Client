import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
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
import Loading from '../common/Loading';

function PreviewLanding() {
  const router = useRouter();
  const { id, type, folderId } = router.query;

  const getTemplate = useAPI((api) => api.ect.getTemplate);
  const { data } = useQuery(['getTemplate', id], () => getTemplate(id as string), {
    enabled: !!id,
  });

  if (!data) return <Loading />;
  const { data: info } = data;

  const importTemplate = () =>
    router.push(`/list-intro?id=${id}&folderId=${folderId ?? ''}&type=${type}`);

  const addSelf = () => router.push(`/list-intro?id=&folderId=${folderId ?? ''}&type=${type}`);

  return (
    <Layout
      back
      title="템플릿 미리보기"
      option={<StyledPreviewHeader>{info.title}</StyledPreviewHeader>}
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
      </StyledBody>
      <FunctionSection>
        <AddTemplateButton onClick={addSelf}>직접 작성하기</AddTemplateButton>
        <SharePackingListButton onClick={importTemplate}>템플릿 불러오기</SharePackingListButton>
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

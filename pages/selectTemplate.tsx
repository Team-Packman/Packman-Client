import Image from 'next/image';
import styled from 'styled-components';
import template from '../public/assets/svg/template.svg';
import Template from './components/Template';
import useAPI from '../utils/hooks/useAPI';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import Header from '../components/common/Header';

function CreateList() {
  const getTemplateList = useAPI((api) => api.ect.getTemplateList);
  const { data } = useQuery('templateList', () => getTemplateList());
  const router = useRouter();

  // useEffect(() => {
  //   if (router.isReady) {
  //     setIsAloned(router.query.toString());
  //   }
  // }, []);

  // 페이지 path에서 alone이랑 together 추출해서
  if (!data) return;

  const { basicTemplate, myTemplate } = data.data;

  return (
    <>
      <Header back title="템플릿 선택하기" />
      <StyledRoot>
        <Image src={template} alt="템플릿이미지" />
        <Template isAloned={true} basicTemplate={basicTemplate} myTemplate={myTemplate} />
      </StyledRoot>
    </>
  );
}

export default CreateList;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 2rem;
`;

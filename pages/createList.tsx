import Image from 'next/image';
import styled from 'styled-components';
import template from '../public/assets/svg/template.svg';
import Template from './components/Template';
import useAPI from '../utils/hooks/useAPI';
import { useQuery } from 'react-query';

function CreateList() {
  const getTemplateList = useAPI((api) => api.ect.getTemplateList);
  const { data } = useQuery('templateList', () => getTemplateList());

  if (!data) return;

  const { basicTemplate, myTemplate } = data.data;

  return (
    <StyledRoot>
      {/* 헤더 */}
      <Image src={template} alt="템플릿이미지" />
      <Template isAloned basicTemplate={basicTemplate} myTemplate={myTemplate} />
    </StyledRoot>
  );
}

export default CreateList;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

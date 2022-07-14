import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import TemplateItem from './TemplateItem';

interface Template {
  id: string;
  title: string;
}

interface TemplateProps {
  isAloned: boolean;
  basicTemplate: Template[];
  myTemplate: Template[];
}

function Template(props: TemplateProps) {
  const { isAloned, basicTemplate, myTemplate } = props;

  return (
    <StyledRoot>
      <StyledTemplateWrapper>
        <h1>{isAloned ? '혼자 패킹 추천' : '함께 패킹 추천'} 템플릿</h1>
        <p>팩맨에서 추천하는 템플릿을 사용해 리스트를 손쉽게 작성해보세요</p>
        <StyledTemplate>
          {basicTemplate.map((template) => (
            <TemplateItem key={template.id} template={template} />
          ))}
        </StyledTemplate>
      </StyledTemplateWrapper>

      <StyledTemplateWrapper>
        <h1>나만의 템플릿</h1>
        <p>팩맨에서 추천하는 템플릿을 사용해 리스트를 손쉽게 작성해보세요</p>
        <StyledTemplate>
          {myTemplate.map((template) => (
            <TemplateItem key={template.id} template={template} />
          ))}
        </StyledTemplate>
      </StyledTemplateWrapper>
    </StyledRoot>
  );
}

export default Template;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;
const StyledTemplateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 1rem;
  & > h1 {
    font-weight: 600;
    font-size: 1.6rem;
    color: ${packmanColors.black};
  }
  & > p {
    font-weight: 400;
    font-size: 1.2rem;
    color: ${packmanColors.deepGray};
  }
`;
const StyledTemplate = styled.div`
  display: flex;
  padding: 1rem;
  gap: 1rem;
`;

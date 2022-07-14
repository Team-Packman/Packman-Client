import TemplateItem from './TemplateItem';
import styled from 'styled-components';

interface Template {
  id: string;
  title: string;
}

interface TemplateListProps {
  templateList: Template[];
}

function TemplateList(props: TemplateListProps) {
  const { templateList } = props;

  return (
    <StyledRoot>
      {!templateList.length && (
        <TemplateItem template={{ id: '', title: '아직 저장된 템플릿이 없어요' }} />
      )}
      {templateList.map((template) => (
        <TemplateItem key={template.id} template={template} />
      ))}
    </StyledRoot>
  );
}

export default TemplateList;

const StyledRoot = styled.div`
  display: flex;
  padding: 1rem;
  gap: 1rem;
`;

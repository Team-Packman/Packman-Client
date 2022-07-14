import styled from 'styled-components';
import { ReactNode } from 'react';

interface TemplateListProps {
  templateList: ReactNode;
}

function TemplateList(props: TemplateListProps) {
  const { templateList } = props;

  return <StyledRoot>{templateList}</StyledRoot>;
}

export default TemplateList;

const StyledRoot = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 9.921rem;
  gap: 1rem;
  padding: 1rem 0;
  overflow: scroll;
`;

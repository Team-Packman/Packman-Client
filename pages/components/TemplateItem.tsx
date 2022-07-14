import styled from 'styled-components';
import { packmanColors } from '../../styles/color';

interface Template {
  id: string;
  title: string;
}

interface TemplateItemProps {
  template: Template;
}

function TemplateItem(props: TemplateItemProps) {
  const { template } = props;
  const { id, title } = template;

  return <StyledRoot isListEmpty={id === ''}>{title}</StyledRoot>;
}

export default TemplateItem;

const StyledRoot = styled.div<{ isListEmpty: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.4rem;
  padding: 0.8rem 1.2rem;
  background: ${packmanColors.blueGray};
  border-radius: 0.8rem;
  color: ${({ isListEmpty }) => (isListEmpty ? packmanColors.gray : packmanColors.darkGray)};

  font-size: 1.5rem;
`;

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

  return <StyledRoot>{title}</StyledRoot>;
}

export default TemplateItem;

const StyledRoot = styled.div`
  width: 6.3rem;
  height: 3.4rem;
  background: ${packmanColors.blueGray};
  border-radius: 0.8rem;
  color: ${packmanColors.darkGray};
`;

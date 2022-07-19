import styled, { css } from 'styled-components';
import { packmanColors } from '../../../styles/color';

interface Template {
  id: string;
  title: string;
}

interface TemplateItemProps {
  template: Template;
  isSelected: string;
  onClick?: () => void;
}

function TemplateItem(props: TemplateItemProps) {
  const { template, isSelected, onClick } = props;
  const { id, title } = template;

  return (
    <StyledRoot
      isSelected={isSelected === id}
      isListEmpty={id === ''}
      onClick={() => {
        onClick && onClick();
      }}
    >
      {title}
    </StyledRoot>
  );
}

export default TemplateItem;

const StyledRoot = styled.div<{ isListEmpty: boolean; isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.4rem;
  padding: 0.7rem 1.1rem;
  border-radius: 0.8rem;
  font-size: 1.5rem;

  ${({ isSelected }) =>
    isSelected
      ? css`
          border: 1px solid ${packmanColors.pmPink};
          background-color: ${packmanColors.pmWhite};
          color: ${packmanColors.pmPink};
        `
      : css`
          border: 1px solid ${packmanColors.pmBlueGrey};
          background-color: ${packmanColors.pmBlueGrey};
          color: ${packmanColors.pmDeepGrey};
        `};
  color: ${({ isListEmpty }) => isListEmpty && packmanColors.pmGrey};
`;

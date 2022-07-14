import styled, { css } from 'styled-components';
import { packmanColors } from '../../styles/color';

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
  padding: 0.8rem 1.2rem;
  border-radius: 0.8rem;
  font-size: 1.5rem;

  ${({ isSelected }) =>
    isSelected
      ? css`
          border: 1px solid ${packmanColors.pink};
          background-color: ${packmanColors.white};
          color: ${packmanColors.pink};
        `
      : css`
          border: none;
          background-color: ${packmanColors.blueGray};
          color: ${packmanColors.darkGray};
        `};
  color: ${({ isListEmpty }) => isListEmpty && packmanColors.gray};
`;

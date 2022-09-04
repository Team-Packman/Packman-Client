import styled, { css } from 'styled-components';
import { packmanColors } from '../../styles/color';
import { FONT_STYLES } from '../../styles/font';

interface Template {
  id: string;
  title: string;
}
interface TemplateItemProps {
  template: Template;
  isSelected: string;
  handleTemplateItem?: () => void;
  changeTemplateImage?: (template: Template[], templateId: string, templateType: string) => void;
  checkIsTemplate?: (templateType: string) => void;
  basicTemplate?: Template[];
  myTemplate?: Template[];
}

function TemplateItem(props: TemplateItemProps) {
  const {
    template,
    isSelected,
    handleTemplateItem,
    changeTemplateImage,
    basicTemplate,
    myTemplate,
  } = props;
  const { id, title } = template;

  const onClickTemplateItem = (id: string) => {
    basicTemplate?.forEach((template) => {
      if (id === template.id) {
        changeTemplateImage && changeTemplateImage(basicTemplate, id, 'basic');
      }
    });
    myTemplate?.forEach((template) => {
      if (id === template.id) {
        changeTemplateImage && changeTemplateImage(myTemplate, id, 'myTemplate');
      }
    });
    handleTemplateItem && handleTemplateItem();
  };

  return (
    <StyledRoot
      isSelected={isSelected === id}
      isListEmpty={id === ''}
      onClick={() => onClickTemplateItem(id)}
    >
      {title}
    </StyledRoot>
  );
}

export default TemplateItem;

const StyledRoot = styled.div<{ isListEmpty: boolean; isSelected: boolean }>`
  ${FONT_STYLES.BODY4_SEMIBOLD};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.4rem;
  padding: 0.7rem 1.1rem;
  border-radius: 0.8rem;
  &:not(:last-child) {
    margin-right: 1rem;
  }

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

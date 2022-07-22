import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import TemplateList from './TemplateList';
import TemplateItem from './TemplateItem';
import { FONT_STYLES } from '../../styles/font';

interface Template {
  _id: string;
  title: string;
}

interface TemplateProps {
  isAloned: boolean;
  basicTemplate: Template[];
  myTemplate: Template[];
  activate: (isSelected: string) => void;
  changeTemplateImage: (templateId: string) => void;
  changeUserOwnTemplateImage: (templateId: string) => void;
  checkIsTemplate: (isTemplate: boolean) => void;
  setTemplateId: (templateId: string) => void;
}

function Template(props: TemplateProps) {
  const {
    isAloned,
    basicTemplate,
    myTemplate,
    activate,
    changeTemplateImage,
    changeUserOwnTemplateImage,
    checkIsTemplate,
    setTemplateId,
  } = props;
  const [isSelected, setIsSelected] = useState('');

  const onClickTemplateItem = (id: string) => {
    if (isSelected === id) {
      setIsSelected('');
    } else {
      setIsSelected(id);
    }
  };

  const handleTemplateItem = (template: Template) => {
    onClickTemplateItem(template._id);
    setTemplateId(template._id);
  };

  useEffect(() => {
    activate(isSelected);
  }, [isSelected]);

  return (
    <StyledRoot>
      <StyledTemplateWrapper>
        <h1>{isAloned ? '혼자 패킹 추천' : '함께 패킹 추천'} 템플릿</h1>
        <p>팩맨에서 추천하는 템플릿을 사용해 리스트를 손쉽게 작성해보세요</p>

        <TemplateList
          templateList={
            <>
              {basicTemplate.map((template) => (
                <TemplateItem
                  key={template._id}
                  template={template}
                  isSelected={isSelected}
                  onClick={() => handleTemplateItem(template)}
                  changeTemplateImage={changeTemplateImage}
                  checkIsTemplate={checkIsTemplate}
                  basicTemplate={basicTemplate}
                  myTemplate={myTemplate}
                />
              ))}
            </>
          }
        />
      </StyledTemplateWrapper>

      <StyledTemplateWrapper>
        <h1>나만의 템플릿</h1>
        <p>내가 저장한 템플릿을 활용해 리스트를 손쉽게 작성해보세요</p>
        <TemplateList
          templateList={
            <>
              {!myTemplate.length && (
                <TemplateItem
                  isSelected="null"
                  template={{ _id: '', title: '아직 저장된 템플릿이 없어요' }}
                />
              )}
              {myTemplate.map((template) => (
                <TemplateItem
                  key={template._id}
                  template={template}
                  isSelected={isSelected}
                  onClick={() => handleTemplateItem(template)}
                  changeUserOwnTemplateImage={() => {
                    changeUserOwnTemplateImage(template._id);
                  }}
                  checkIsTemplate={checkIsTemplate}
                />
              ))}
            </>
          }
        />
      </StyledTemplateWrapper>
    </StyledRoot>
  );
}

export default Template;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  height: 33rem;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const StyledTemplateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 1rem;
  & > h1 {
    font-style: ${FONT_STYLES.SUBHEAD1_SEMIBOLD};
    color: ${packmanColors.pmBlack};
  }
  & > p {
    font-style: ${FONT_STYLES.CAPTION1_REGULAR};
    color: ${packmanColors.pmDeepGrey};
  }
`;

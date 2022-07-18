import Image from 'next/image';
import styled, { css } from 'styled-components';
import template from '../../public/assets/svg/template.svg';
import Template from '../components/selectTemplate/Template';
import useAPI from '../../utils/hooks/useAPI';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import Header from '../../components/common/Header';
import { packmanColors } from '../../styles/color';
import { useState } from 'react';
import useGlobalState from '../../utils/hooks/useGlobalState';

function SelectTemplateLanding() {
  const router = useRouter();
  const [activateButton, setActivateButton] = useState(false);
  const getTemplateList = useAPI((api) => api.ect.getTemplateList);
  const { data } = useQuery('templateList', () => getTemplateList());
  const [isTemplate, setIsTemplate] = useGlobalState('isTemplate', false);

  if (!data) return null;
  if (!router.query) return null;

  console.log(router.query);

  const { categoryName } = router.query; //together | alone

  const { basicTemplate, myTemplate } = data.data;

  return (
    <StyledRoot>
      <Header back title="템플릿 선택하기" />
      <StyledTemplateWrapper>
        <picture>
          <Image src={template} alt="템플릿이미지" />
        </picture>
        <Template
          isAloned={true}
          basicTemplate={basicTemplate}
          myTemplate={myTemplate}
          activate={(isSelected: string) => {
            if (isSelected === '') {
              setActivateButton(false);
            } else {
              setActivateButton(true);
            }
          }}
        />
      </StyledTemplateWrapper>
      <StyledButtonWrapper>
        <StyleButton
          isTemplate={false}
          isActivated={true}
          onClick={() => {
            setIsTemplate(false);
            router.push('/test');
          }}
        >
          건너뛰기
        </StyleButton>
        <StyleButton
          isTemplate={true}
          disabled={!activateButton}
          isActivated={activateButton}
          onClick={() => {
            setIsTemplate(true);
            router.push('/preview');
          }}
        >
          확인
        </StyleButton>
      </StyledButtonWrapper>
    </StyledRoot>
  );
}

export default SelectTemplateLanding;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const StyledTemplateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
  & > picture {
    margin: 5.7rem 0 3.3rem 0;
  }
`;
const StyledButtonWrapper = styled.div`
  position: absolute;
  bottom: 3.456rem;
  display: flex;
  gap: 1.1rem;
`;
const StyleButton = styled.button<{ isTemplate: boolean; isActivated: boolean }>`
  width: 16.3rem;
  height: 4rem;
  border-radius: 0.8rem;
  font-size: 1.5rem;
  font-weight: 600;

  ${({ isTemplate }) =>
    isTemplate
      ? css`
          border: none;
          background-color: ${packmanColors.pmPink};
          color: ${packmanColors.pmWhite};
        `
      : css`
          border: 1px solid ${packmanColors.pmBlack};
          background-color: ${packmanColors.pmWhite};
          color: ${packmanColors.pmBlack};
        `}
  ${({ isActivated }) =>
    !isActivated &&
    css`
      color: ${packmanColors.pmWhite};
      background-color: ${packmanColors.pmGrey};
    `}
`;

import Image from 'next/image';
import styled, { css } from 'styled-components';
import template from '../public/assets/svg/template.svg';
import Template from './components/Template';
import useAPI from '../utils/hooks/useAPI';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import Header from '../components/common/Header';
import { packmanColors } from '../styles/color';
import { useState } from 'react';
import useGlobalState from '../utils/hooks/useGlobalState';

function CreateList() {
  const [activateButton, setActivateButton] = useState(false);
  const getTemplateList = useAPI((api) => api.ect.getTemplateList);
  const { data } = useQuery('templateList', () => getTemplateList());
  const router = useRouter();
  const [isTemplate, setIsTemplate] = useGlobalState('isTemplate', false);

  // useEffect(() => {
  //   if (router.isReady) {
  //     setIsAloned(router.query.toString());
  //   }
  // }, []);

  // 페이지 path에서 alone이랑 together 추출해서
  if (!data) return;

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
          activate={() => setActivateButton(true)}
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
          isActivated={activateButton}
          onClick={() => setIsTemplate(true)}
        >
          확인
        </StyleButton>
      </StyledButtonWrapper>
    </StyledRoot>
  );
}

export default CreateList;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
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
          background-color: ${packmanColors.pink};
          color: ${packmanColors.white};
        `
      : css`
          border: 1px solid ${packmanColors.black};
          background-color: ${packmanColors.white};
          color: ${packmanColors.black};
        `}
  ${({ isActivated }) =>
    !isActivated &&
    css`
      color: ${packmanColors.white};
      background-color: ${packmanColors.gray};
    `}
`;

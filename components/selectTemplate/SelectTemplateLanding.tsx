import Image from 'next/image';
import styled, { css } from 'styled-components';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import korea_travel from '/public/assets/png/korea_travel.png';
import oversea_travel from '/public/assets/png/oversea_travel.png';
import jeju from '/public/assets/png/jeju.png';
import pet from '/public/assets/png/pet.png';
import concert from '/public/assets/png/concert.png';
import toeic from '/public/assets/png/toeic.png';
import random1 from '/public/assets/png/random1.png';
import random2 from '/public/assets/png/random2.png';
import random3 from '/public/assets/png/random3.png';
import random4 from '/public/assets/png/random4.png';
import useAPI from '../../utils/hooks/useAPI';
import Template from './Template';
import { FONT_STYLES } from '../../styles/font';
import { packmanColors } from '../../styles/color';
import Layout from '../common/Layout';

interface Itemplate {
  id: string;
  title: string;
}

const basicTemplateImageList = [korea_travel, oversea_travel, concert, toeic, jeju, pet];
const randomImageList = [random1, random2, random3, random4];

function SelectTemplateLanding() {
  const router = useRouter();
  const { type, folderId } = router.query;

  const [activateButton, setActivateButton] = useState(false);
  const [templateImageIndex, setTemplateImageIndex] = useState('');
  const [templateType, setTemplateType] = useState('');
  const [templateId, setTemplateId] = useState('');

  // api call
  const getTogetherTemplateList = useAPI((api) => api.ect.getTogetherTemplateList);
  const getAloneTemplateList = useAPI((api) => api.ect.getAloneTemplateList);
  const { data: togetherTemplateList } = useQuery('togetherTemplateList', getTogetherTemplateList);
  const { data: aloneTemplateList } = useQuery('aloneTemplateList', getAloneTemplateList);

  const templateList = togetherTemplateList ?? aloneTemplateList;
  if (!templateList) return null;

  const { basicTemplate, myTemplate } = templateList.data;

  const changeTemplateImage = (template: Itemplate[], templateId: string, templateType: string) => {
    template.forEach(({ id }, idx) => {
      if (id === templateId) {
        setTemplateImageIndex(idx.toString());
        setTemplateType(templateType);
        templateType === 'myTemplate' &&
          setTemplateImageIndex(Math.floor(Math.random() * 4).toString());
      }
    });
  };
  const onClickConfirmButton = () => {
    router.push(`/preview?id=${templateId}&folderId=${folderId ?? ''}&type=${type}`);
  };
  const onClickSkipButton = () =>
    router.push(`/list-intro?id=&folderId=${folderId ?? ''}&type=${type}`);

  const activateConfirmButtonHandler = () => setActivateButton(true);
  const deactivateConfirmButtonHandler = () => setActivateButton(false);
  const setTemplateIdHandler = (templateId: string) => setTemplateId(templateId);

  return (
    <Layout back title="템플릿 선택하기" padding>
      <StyledTemplateWrapper>
        <picture>
          {(basicTemplateImageList[+templateImageIndex] ||
            randomImageList[+templateImageIndex]) && (
            <Image
              src={
                templateType === 'basic'
                  ? basicTemplateImageList[+templateImageIndex]
                  : randomImageList[+templateImageIndex]
              }
              alt="template-image"
              width={375}
              height={211}
              priority
            />
          )}
        </picture>
        <Template
          isAloned={type === 'alone'}
          basicTemplate={basicTemplate}
          myTemplate={myTemplate}
          activate={(isSelected: string) =>
            isSelected === '' ? deactivateConfirmButtonHandler() : activateConfirmButtonHandler()
          }
          changeTemplateImage={(template: Itemplate[], templateId: string, templateType: string) =>
            changeTemplateImage(template, templateId, templateType)
          }
          setTemplateId={(templateId: string) => setTemplateIdHandler(templateId)}
        />
      </StyledTemplateWrapper>
      <StyledButtonWrapper>
        <StyledButton isActivated onClick={onClickSkipButton}>
          건너뛰기
        </StyledButton>
        <StyledButton
          isMyTemplate
          disabled={!activateButton}
          isActivated={activateButton}
          onClick={onClickConfirmButton}
        >
          확인
        </StyledButton>
      </StyledButtonWrapper>
    </Layout>
  );
}

export default SelectTemplateLanding;
const StyledTemplateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > picture {
    margin: 0rem 0 3.3rem 0;
  }
`;
const StyledButtonWrapper = styled.div`
  position: absolute;
  bottom: 1.656rem;
  gap: 1.1rem;
  display: flex;

  width: calc(100vw - 4rem);
  height: 4rem;

  background-color: #fff;
  z-index: 1;
`;
const StyledButton = styled.button<{ isMyTemplate?: boolean; isActivated: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 0.8rem;
  ${FONT_STYLES.BODY4_SEMIBOLD};

  ${({ isMyTemplate }) =>
    isMyTemplate
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

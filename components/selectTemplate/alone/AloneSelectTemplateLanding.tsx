import Image from 'next/image';
import styled, { css } from 'styled-components';
import Template from '../Template';
import useAPI from '../../../utils/hooks/useAPI';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import Header from '../../common/Header';
import { packmanColors } from '../../../styles/color';
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
import { FONT_STYLES } from '../../../styles/font';

const basicTemplateImageList = [korea_travel, oversea_travel, concert, toeic, jeju, pet];

interface Itemplate {
  id: string;
  title: string;
}

function AloneSelectTemplateLanding() {
  const router = useRouter();
  const [activateButton, setActivateButton] = useState(false);
  const getAloneTemplateList = useAPI((api) => api.ect.getAloneTemplateList);
  const { data } = useQuery('templateList', () => getAloneTemplateList());

  const [templateImageIndex, setTemplateImageIndex] = useState('');
  const [templateType, setTemplateType] = useState('');
  const [templateId, setTemplateId] = useState('');
  const [randomImageList, setRandomImageList] = useState([random1, random2, random3, random4]);

  if (!data) return null;
  if (!router.query) return null;

  const { basicTemplate, myTemplate } = data.data;

  const changeTemplateImage = (template: Itemplate[], templateId: string, templateType: string) => {
    template.forEach(({ id }, idx) => {
      if (id === templateId) {
        setTemplateImageIndex(idx.toString());
        setTemplateType(templateType);
        templateType === 'myTemplate' &&
          setRandomImageList((prev) => prev.sort(() => Math.random() - 0.5));
      }
    });
  };

  const onClickConfirmButton = () =>
    router.push(`/preview?id=${templateId}&type=${templateType}&categoryName=alone`);

  const onClickSkipButton = () => router.push(`/list-intro?id=&categoryName=alone`);

  const activateConfirmButtonHandler = () => setActivateButton(true);
  const deactivateConfirmButtonHandler = () => setActivateButton(false);
  const setTemplateIdHandler = (templateId: string) => setTemplateId(templateId);

  return (
    <StyledRoot>
      <Header back title="템플릿 선택하기" />
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
          isAloned={true}
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
        <StyledButton isTemplate={false} isActivated={true} onClick={onClickSkipButton}>
          건너뛰기
        </StyledButton>
        <StyledButton
          isTemplate={true}
          disabled={!activateButton}
          isActivated={activateButton}
          onClick={onClickConfirmButton}
        >
          확인
        </StyledButton>
      </StyledButtonWrapper>
    </StyledRoot>
  );
}

export default AloneSelectTemplateLanding;

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
    margin: 0rem 0 3.3rem 0;
  }
`;
const StyledButtonWrapper = styled.div`
  position: absolute;
  bottom: 1.656rem;
  display: flex;
  gap: 1.1rem;
  width: 100%;
  height: 4rem;
  background-color: #fff;
  padding: 0 2rem;
`;
const StyledButton = styled.button<{ isTemplate: boolean; isActivated: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 0.8rem;
  ${FONT_STYLES.BODY4_SEMIBOLD};

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

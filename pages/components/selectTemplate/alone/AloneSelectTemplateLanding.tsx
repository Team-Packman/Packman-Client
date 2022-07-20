import Image from 'next/image';
import styled, { css } from 'styled-components';
import Template from '../Template';
import useAPI from '../../../../utils/hooks/useAPI';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import Header from '../../../../components/common/Header';
import { packmanColors } from '../../../../styles/color';
import { useState } from 'react';
import korea_travel from '../../../../public/assets/svg/korea_travel.svg';
import oversea_travel from '../../../../public/assets/svg/oversea_travel.svg';
import jeju from '../../../../public/assets/svg/jeju.svg';
import pet from '../../../../public/assets/svg/pet.svg';
import concert from '../../../../public/assets/svg/concert.svg';
import toeic from '../../../../public/assets/svg/toeic.svg';
import random1 from '../../../../public/assets/svg/random1.svg';
import random2 from '../../../../public/assets/svg/random2.svg';
import random3 from '../../../../public/assets/svg/random3.svg';
import random4 from '../../../../public/assets/svg/random4.svg';

const basicTemplateImageList = [korea_travel, oversea_travel, concert, toeic, jeju, pet];
const randomImageList = [random1, random2, random3, random4];

function AloneSelectTemplateLanding() {
  const router = useRouter();
  const [activateButton, setActivateButton] = useState(false);
  const getAloneTemplateList = useAPI((api) => api.ect.getAloneTemplateList);
  const { data } = useQuery('templateList', () => getAloneTemplateList());

  const [templateImageIndex, setTemplateImageIndex] = useState('');
  const [isBasicTemplate, setIsBasicTemplate] = useState(false);
  const [templateId, setTemplateId] = useState('');

  if (!data) return null;
  if (!router.query) return null;

  const categoryName = router.query.categoryName as unknown as string; //together | alone

  const { basicTemplate, myTemplate } = data.data;

  const changeTemplateImage = (templateId: string) => {
    basicTemplate.forEach(({ _id }, idx) => {
      if (_id === templateId) {
        setTemplateImageIndex(idx.toString());
      }
    });
  };

  const changeUserOwnTemplateImage = () => {
    setTemplateImageIndex(Math.floor(Math.random() * 4).toString());
  };

  return (
    <StyledRoot>
      <Header back title="템플릿 선택하기" />
      <StyledTemplateWrapper>
        <picture>
          {(basicTemplateImageList[+templateImageIndex] ||
            randomImageList[+templateImageIndex]) && (
            <Image
              src={
                isBasicTemplate
                  ? basicTemplateImageList[+templateImageIndex]
                  : randomImageList[+templateImageIndex]
              }
              alt="template-image"
              width={375}
              height={211}
            />
          )}
        </picture>
        <Template
          isAloned={categoryName === 'alone'}
          basicTemplate={basicTemplate}
          myTemplate={myTemplate}
          activate={(isSelected: string) => {
            if (isSelected === '') {
              setActivateButton(false);
            } else {
              setActivateButton(true);
            }
          }}
          changeTemplateImage={(templateId: string) => changeTemplateImage(templateId)}
          changeUserOwnTemplateImage={changeUserOwnTemplateImage}
          checkIsTemplate={(isTemplate: boolean) => setIsBasicTemplate(isTemplate)}
          setTemplateId={(templateId: string) => {
            setTemplateId(templateId);
            console.log(templateId);
          }}
        />
      </StyledTemplateWrapper>
      <StyledButtonWrapper>
        <StyleButton
          isTemplate={false}
          isActivated={true}
          onClick={() => {
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
            if (isBasicTemplate) {
              router.push(`/preview?type=basic&categoryName=${categoryName}`);
            } else {
              router.push(`/preview?type=myTemplate&categoryName=${categoryName}`);
            }
          }}
        >
          확인
        </StyleButton>
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
  justify-content: center;
  gap: 1.1rem;
  width: 100%;
  background-color: #fff;
  height: 4rem;
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

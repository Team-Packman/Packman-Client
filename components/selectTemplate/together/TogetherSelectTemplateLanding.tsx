import Image, { StaticImageData } from 'next/image';
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

const basicTemplateImageList = [korea_travel, oversea_travel, concert, toeic, jeju, pet];

function TogetherSelectTemplateLanding() {
  const router = useRouter();
  const [activateButton, setActivateButton] = useState(false);
  const getTogetherTemplateList = useAPI((api) => api.ect.getTogetherTemplateList);
  const { data } = useQuery('templateList', () => getTogetherTemplateList());

  const [templateImageIndex, setTemplateImageIndex] = useState('');
  const [isBasicTemplate, setIsBasicTemplate] = useState(false);
  const [templateId, setTemplateId] = useState('');
  const [randomImageList, setRandomImageList] = useState([random1, random2, random3, random4]);

  if (!data) return null;
  if (!router.query) return null;

  const { basicTemplate, myTemplate } = data.data;

  const changeTemplateImage = (templateId: string) => {
    basicTemplate.forEach(({ _id }, idx) => {
      if (_id === templateId) {
        setTemplateImageIndex(idx.toString());
      }
    });
  };

  const changeUserOwnTemplateImage = (templateId: string) => {
    myTemplate.forEach(({ _id }, idx) => {
      if (_id === templateId) {
        setTemplateImageIndex(idx.toString());
        setRandomImageList((prev) => prev.sort(() => Math.random() - 0.5));
      }
    });
    // setTemplateImageIndex(Math.floor(Math.random() * 4).toString());
  };

  return (
    <StyledRoot>
      <Header back title="????????? ????????????" />
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
          isAloned={false}
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
          setTemplateId={(templateId: string) => setTemplateId(templateId)}
        />
      </StyledTemplateWrapper>
      <StyledButtonWrapper>
        <StyleButton
          isTemplate={false}
          isActivated={true}
          onClick={() => {
            router.push(`/list-intro?id=''&categoryName=together`);
          }}
        >
          ????????????
        </StyleButton>
        <StyleButton
          isTemplate={true}
          disabled={!activateButton}
          isActivated={activateButton}
          onClick={() => {
            if (isBasicTemplate) {
              router.push(`/preview?id=${templateId}&type=basic&categoryName=together`);
            } else {
              router.push(`/preview?id=${templateId}&type=myTemplate&categoryName=together`);
            }
          }}
        >
          ??????
        </StyleButton>
      </StyledButtonWrapper>
    </StyledRoot>
  );
}

export default TogetherSelectTemplateLanding;

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

import React from 'react';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import { useSwiper } from 'swiper/react';
import { packmanColors } from '../../styles/color';
import { useErrorBubbling } from '../../utils/AsyncBoundary';
import useAPI from '../../utils/hooks/useAPI';

interface CheckListSubHeaderProps {
  slot?: string;
  activeMode?: number;
  modeHandler?: (idx: number) => void;
  together?: boolean;
  categoryHandler: () => void;
}

function CheckListSubHeader(props: CheckListSubHeaderProps) {
  const { together, activeMode, modeHandler, categoryHandler } = props;
  const client = useQueryClient();
  const getHelp = useAPI((api) => api.packingList.common.getHelp);
  const swiper = useSwiper();
  const { reportError } = useErrorBubbling();

  const handleClickMode = (idx: number) => {
    modeHandler && modeHandler(idx);
    swiper.slideTo(idx);
  };

  const fetchHelp = async () => {
    try {
      await client.fetchQuery(['getHelp'], () => getHelp());
    } catch (error) {
      reportError(error);
    }
  };

  const handleClickHelp = async () => {
    await fetchHelp();
    alert('준비중 입니다.\n조금만 기다려주세요🙏🏻');
  };

  return (
    <StyledRoot>
      {together && (
        <StyledModeBlock>
          <StyledModeWrapper index={activeMode}>
            <StyledMode onClick={() => handleClickMode(0)} selected={activeMode === 0}>
              함께 패킹
            </StyledMode>
            <StyledMode onClick={() => handleClickMode(1)} selected={activeMode === 1}>
              나의 패킹
            </StyledMode>
          </StyledModeWrapper>
        </StyledModeBlock>
      )}
      <StyledOptions>
        <StyledButtonWrapper>
          <StyledButton onClick={handleClickHelp}>엿보기</StyledButton>
          <StyledLine />
          <StyledButton onClick={categoryHandler}>카테고리 추가</StyledButton>
        </StyledButtonWrapper>
      </StyledOptions>
    </StyledRoot>
  );
}

export default CheckListSubHeader;

const StyledRoot = styled.div`
  position: relative;
  width: 100vw;
  z-index: 55;
  background-color: ${packmanColors.pmWhite};
`;

const StyledOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  -webkit-justify-content: flex-end;
  width: 100vw;
  height: 4rem;
  background-color: ${packmanColors.pmWhite};
  box-shadow: 0px 3px 13px rgba(0, 0, 0, 0.05);
  z-index: 1;
`;

const StyledButtonWrapper = styled.div`
  width: 13.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 2rem;
  z-index: 1;
`;
const StyledButton = styled.button`
  height: 2.4rem;
  background-color: transparent;
  border: none;
  outline: none;
  font-weight: 600;
  font-size: 1.4rem;
  color: ${packmanColors.darkGray};
  padding: 0;
  flex-shrink: 0;
`;

const StyledLine = styled.div`
  height: 1.2rem;
  border-left: 1px solid ${packmanColors.pmDeepGrey};
`;
const StyledModeBlock = styled.div`
  position: relative;
  width: 100vw;
  height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${packmanColors.pmWhite};
  z-index: 12;
`;

const StyledModeWrapper = styled.div<{
  index: number | undefined;
}>`
  display: flex;
  width: 33.6rem;
  height: 4rem;
  //실제 높이
  position: relative;
  border: 1px solid ${packmanColors.deepGray};
  border-radius: 0.8rem;
  &:after {
    content: '';
    position: absolute;
    transition: transform 0.3s;
    transform: ${({ index }) => index !== undefined && `translate(calc(${index} * 100%))`};
    width: 50%;
    height: 100%;
    background-color: ${packmanColors.black};
    border-radius: 0.6rem;
    z-index: 2;
  }
`;

const StyledMode = styled.button<{
  selected: boolean;
}>`
  width: 50%;
  font-size: 1.6rem;
  font-weight: 400;
  background-color: transparent;
  border: none;
  color: ${({ selected }) => (selected ? `${packmanColors.pmWhite}` : `${packmanColors.deepGray}`)};
  z-index: 3;
`;

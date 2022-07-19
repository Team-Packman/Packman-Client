import React from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';

function PackingListHeader() {
  return (
    <StyledListHeader>
      <StyledListName type="text" maxLength={12} />
      <StyledWhenToGo>
        <StyledDate type="date" />
      </StyledWhenToGo>
      <StyledMoreFunctions>
        <StyledMoreFunction>엿보기</StyledMoreFunction>
        <StyledMoreFunction>카테고리 추가</StyledMoreFunction>
      </StyledMoreFunctions>
    </StyledListHeader>
  );
}

const StyledListHeader = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding-bottom: 1.2rem;
  box-shadow: 0px 3px 13px rgba(0, 0, 0, 0.05);
`;

const StyledListName = styled.input`
  width: 100%;
  font-weight: 700;
  font-size: 2.8rem;
  line-height: 3.4rem;
  display: flex;
  align-items: center;
  color: ${packmanColors.black};
  border: 0;
  :focus {
    outline: none;
  }
`;

const StyledWhenToGo = styled.div`
  width: 100%;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.9ren;
  display: flex;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  color: ${packmanColors.black};
`;

const StyledDate = styled.input`
  border: 0;
  color: ${packmanColors.black};
  ::-webkit-calendar-picker-indicator {
    color: rgba(0, 0, 0, 0);
    opacity: 1;
    background-image: url('/assets/png/editButton.png');
    width: 24px;
    height: 24px;
    margin-left: -15px;
  }
`;

const StyledMoreFunctions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledMoreFunction = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${packmanColors.darkGray};
  padding: 0 1rem;
  border-right: 1px solid ${packmanColors.pmGrey};
  :last-child {
    padding: 0 0 0 1rem;
    border-right: 0;
  }
`;

export default PackingListHeader;

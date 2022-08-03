import React from 'react';
import styled from 'styled-components';
import { packmanColors } from '../styles/color';
import { FONT_STYLES } from '../styles/font';

function MemberManage() {
  return (
    <StyledRoot>
      <StyledHeader>
        <StyledHeaderLeft>
          <StyledListName>패킹이들과 캠핑</StyledListName>
          <StyledListDate>2022.08.26</StyledListDate>
        </StyledHeaderLeft>
        <StyledDday>D-27</StyledDday>
      </StyledHeader>
    </StyledRoot>
  );
}

export default MemberManage;

const StyledRoot = styled.div`
  width: 100vw;
  height: 100vh;
`;

const StyledHeader = styled.section`
  height: 8.4rem;
  margin: 0 2rem;
  background-color: ${packmanColors.pmBlueGrey};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
`;

const StyledHeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledListName = styled.h2`
  font-style: ${FONT_STYLES.SUBHEAD2_SEMIBOLD};
`;

const StyledListDate = styled.div`
  font-style: ${FONT_STYLES.BODY1_REGULAR};
  color: ${packmanColors.pmDeepGrey};
`;

const StyledDday = styled.div`
  font-style: ${FONT_STYLES.DISPLAY3_EXTRABOLD};
  color: ${packmanColors.pmGreen};
`;

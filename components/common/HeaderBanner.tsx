import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import { FONT_STYLES } from '../../styles/font';
import Chip from './Chip';

interface HeaderBannerProps {
  title: string;
  subTitle: string;
  remainDay: string;
  remainPack?: string;
  onClick?: () => void;
}

const getRemainDayToString = (remainDay: string) => {
  const remainDayToInt = Number(remainDay);
  if (!remainDayToInt) {
    return 'D-day 🎉';
  } else if (remainDayToInt < 0) {
    return 'Done!';
  } else {
    return `D-${remainDay}`;
  }
};

const showSubTitle = (subTitle: string) => {
  if (subTitle.includes('-')) {
    const trimSubTitle = subTitle.replaceAll('-', '.');
    return trimSubTitle;
  } else {
    const trimChipText = `총 ${subTitle}개의 짐`;
    return <Chip text={trimChipText} />;
  }
};

const showCurrentPackNum = (remainPack: string, remainDay: string) => {
  const isNotOutDated = Number(remainDay) > 0 && remainPack !== '';
  const remainNum = Number(remainPack);

  if (isNotOutDated) {
    if (remainNum === 0) {
      return (
        <span>
          <em>패킹</em>이 완료되었어요!
        </span>
      );
    } else {
      return (
        <span>
          아직 <em>{remainPack}</em>개의 짐이 남았어요!
        </span>
      );
    }
  }

  return;
};

function HeaderBanner(props: HeaderBannerProps) {
  const { title, subTitle, remainDay, remainPack = '', onClick } = props;

  return (
    <StyledHeaderBanner onClick={onClick}>
      <StyledLeft>
        <StyledTitle>{title}</StyledTitle>
        <StyledSubTitle>{showSubTitle(subTitle)}</StyledSubTitle>
      </StyledLeft>
      <StyledRight>
        <StyledRemainDay>{getRemainDayToString(remainDay)}</StyledRemainDay>
        <StyledRemainPack>{showCurrentPackNum(remainPack, remainDay)}</StyledRemainPack>
      </StyledRight>
    </StyledHeaderBanner>
  );
}

export default HeaderBanner;

const StyledHeaderBanner = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 8.4rem;

  margin: 1rem 0 4.5rem 0;
  padding: 0 2rem;
  border-radius: 1rem;
  background-color: ${packmanColors.pmBlueGrey};
`;

const StyledLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;

  font-style: ${FONT_STYLES.SUBHEAD2_SEMIBOLD};
`;

const StyledTitle = styled.h2`
  font-style: ${FONT_STYLES.SUBHEAD2_SEMIBOLD};
  color: ${packmanColors.black};
`;

const StyledSubTitle = styled.div`
  font-style: ${FONT_STYLES.BODY1_REGULAR};
  color: ${packmanColors.pmDeepGrey};
`;

const StyledRemainDay = styled.div`
  font-style: ${FONT_STYLES.DISPLAY3_EXTRABOLD};
  color: ${packmanColors.pmGreen};
`;

const StyledRemainPack = styled.div`
  font-size: 1.2rem;
  color: ${packmanColors.pmBlack};

  & > span {
    & > em {
      color: ${packmanColors.pmPink};
    }
  }
`;

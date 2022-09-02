import styled from 'styled-components';
import Image from 'next/image';
import iTrash from '/public/assets/svg/iTrash.svg';
import { FONT_STYLES } from '../../styles/font';
import { packmanColors } from '../../styles/color';

interface CaptionSectionProps {
  packingList: any[];
  isDeleting: boolean;
  deleteList: string[];
  onClickCaptionButton: () => void;
  handleIsDragged: (arr: boolean[]) => void;
  resetDeleteList: (arr: string[]) => void;
}
function CaptionSection(props: CaptionSectionProps) {
  const {
    packingList,
    isDeleting,
    deleteList,
    onClickCaptionButton,
    handleIsDragged,
    resetDeleteList,
  } = props;

  return (
    <StyledRoot>
      {!isDeleting && (
        <StyledCaptionText>
          <span>{packingList.length}</span>
          개의 패킹 리스트
        </StyledCaptionText>
      )}
      {isDeleting && <span onClick={() => resetDeleteList([])}>선택해제</span>}

      <StyledCaptionButtonWrapper onClick={onClickCaptionButton}>
        {isDeleting ? (
          <p onClick={() => handleIsDragged(Array(packingList.length).fill(false))}>취소</p>
        ) : (
          <Image
            src={iTrash}
            alt="삭제"
            width={24}
            height={24}
            onClick={() => handleIsDragged(Array(packingList.length).fill(false))}
          />
        )}
      </StyledCaptionButtonWrapper>
    </StyledRoot>
  );
}

export default CaptionSection;

const StyledRoot = styled.section`
  position: relative;
  display: flex;
  width: 100%;
  height: 6.9rem;

  & > span {
    position: absolute;
    left: 2.6rem;
    bottom: 0.8rem;
    ${FONT_STYLES.BODY2_SEMIBOLD};
    color: ${packmanColors.pmDeepGrey};
  }
`;
const StyledCaptionText = styled.p`
  display: flex;
  justify-content: start;
  padding: 1.8rem 0 0 2.4rem;
  margin: 0;
  ${FONT_STYLES.BODY1_REGULAR};
  color: ${packmanColors.pmDeepGrey};
  & > span {
    ${FONT_STYLES.BODY2_SEMIBOLD};
    color: ${packmanColors.pmPink};
  }
`;
const StyledCaptionButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  right: 2rem;
  bottom: 0.8rem;
  & > p {
    ${FONT_STYLES.BODY2_SEMIBOLD};
    color: ${packmanColors.pmDeepGrey};
  }
`;

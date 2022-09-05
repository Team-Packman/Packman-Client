import SelectProfileSection from './SelectProfileSection';
import styled from 'styled-components';
import { FONT_STYLES } from '../../styles/font';
import { packmanColors } from '../../styles/color';

interface CreateProfileProps {
  comment: React.ReactNode;
  oldNickname: string;
  oldProfileImageId: string;
  finishEditing: () => void;
}

function EditingProfile(props: CreateProfileProps) {
  const { comment, oldNickname, oldProfileImageId, finishEditing } = props;

  return (
    <>
      <StyledCommentWrapper>{comment}</StyledCommentWrapper>
      <SelectProfileSection
        isEditing={true}
        oldNickname={oldNickname}
        oldProfileImageId={oldProfileImageId}
        finishEditing={finishEditing}
      />
    </>
  );
}

export default EditingProfile;

const StyledCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 8.7rem;

  & > h1 {
    ${FONT_STYLES.DISPLAY1_LIGHT};
    color: ${packmanColors.pmBlack};
    word-break: break-all;
    word-wrap: break-word;

    & > b {
      ${FONT_STYLES.DISPLAY2_SEMIBOLD};
    }
  }
`;

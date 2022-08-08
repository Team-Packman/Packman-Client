import SelectProfileSection from './SelectProfileSection';
import styled from 'styled-components';

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

const StyledCommentWrapper = styled.h1`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

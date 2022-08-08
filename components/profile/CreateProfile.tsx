import SelectProfileSection from './SelectProfileSection';
import styled from 'styled-components';
import { FONT_STYLES } from '../../styles/font';

interface CreateProfileProps {
  comment: React.ReactNode;
}

function CreateProfile(props: CreateProfileProps) {
  const { comment } = props;
  return (
    <>
      <StyledCommentWrapper>{comment}</StyledCommentWrapper>
      <SelectProfileSection />
    </>
  );
}

export default CreateProfile;

const StyledCommentWrapper = styled.h1`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > div > h1 {
    color: #000;
    word-break: break-all;
    word-wrap: break-word;
    ${FONT_STYLES.DISPLAY1_LIGHT};
  }
  & b {
    ${FONT_STYLES.DISPLAY2_SEMIBOLD};
  }
`;

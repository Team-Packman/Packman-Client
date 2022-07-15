import SelectProfileSection from './SelectProfileSection';
import styled from 'styled-components';

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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > h1 {
    line-height: 2.9rem;
    font-weight: 300;
    font-size: 2.4rem;
    color: #000;
    word-break: break-all;
    word-wrap: break-word;
  }
  & b {
    font-weight: 500;
  }
`;

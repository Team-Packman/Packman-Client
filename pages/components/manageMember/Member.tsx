import styled from 'styled-components';
import { packmanColors } from '../../../styles/color';

interface Members {
  id: string; //  멤버 id
  nickname: string; // 멤버 닉네임
  profileImageId: string; // 멤버 프로필 사진 id
}
interface MemberProps {
  member: Members;
}

function Member(props: MemberProps) {
  const { member } = props;
  const { id, nickname, profileImageId } = member;

  return (
    <StyledRoot>
      <StyledMember />
      <p>{nickname}</p>
    </StyledRoot>
  );
}

export default Member;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 0.455rem;
`;
const StyledMember = styled.div`
  font-weight: 600;
  font-size: 1.4rem;
  color: ${packmanColors.pmDarkGrey};
`;

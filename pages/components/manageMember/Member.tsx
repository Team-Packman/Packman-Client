import styled from 'styled-components';
import { packmanColors } from '../../../styles/color';
import iCrown from '../../../public/assets/svg/iCrown.svg';
import iDeleteMember from '../../../public/assets/svg/iDeleteMember.svg';
import Image from 'next/image';

interface Members {
  id: string; //  멤버 id
  nickname: string; // 멤버 닉네임
  profileImageId: string; // 멤버 프로필 사진 id
}
interface MemberProps {
  member: Members;
  manager: boolean;
  isEditing: boolean;
}

function Member(props: MemberProps) {
  const { member, manager, isEditing } = props;
  const { id, nickname, profileImageId } = member;

  return (
    <StyledRoot>
      {isEditing && !manager && (
        <Image src={iDeleteMember} alt="delete-member" width={24} height={24} />
      )}
      {manager && <StyledImage src={iCrown} alt="crown" width={18} height={14.84} />}
      <StyledMember manager={manager} />
      <p>{nickname}</p>
    </StyledRoot>
  );
}

export default Member;

const StyledRoot = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  gap: 0.455rem;
`;
const StyledImage = styled(Image)`
  position: absolute;
  top: -0.3rem;
`;
const StyledMember = styled.div<{ manager: boolean }>`
  width: 6.4rem;
  height: 6.4rem;
  font-weight: 600;
  font-size: 1.4rem;
  color: ${packmanColors.pmDarkGrey};
  background-color: ${packmanColors.pmGrey};
  border: ${({ manager }) => manager && `1px solid ${packmanColors.pmPink}`};
  border-radius: 50%;
`;

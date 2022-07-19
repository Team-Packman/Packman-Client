import { useState } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../../styles/color';
import Member from './Member';

interface Members {
  id: string; //  멤버 id
  nickname: string; // 멤버 닉네임
  profileImageId: string; // 멤버 프로필 사진 id
}

interface MembersProps {
  members: Members[];
}

function Members(props: MembersProps) {
  const { members } = props;

  const [isEditing, setIsEditing] = useState(false);

  const onClickEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <StyledRoot>
      <StyledCaption>
        <h1>함께하는 멤버</h1>
        <p onClick={onClickEdit}>{isEditing ? '취소' : '편집'}</p>
      </StyledCaption>

      <StyledMembers>
        {members.map((member, idx) => (
          <Member key={member.id} member={member} manager={idx === 0} isEditing={isEditing} />
        ))}
      </StyledMembers>
      {isEditing ? <button onClick={onClickEdit}>완료</button> : <button>멤버 초대하기</button>}
    </StyledRoot>
  );
}

export default Members;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  & > button {
    position: absolute;
    bottom: 7.937rem;
    font-weight: 600;
    font-size: 1.5rem;
    color: ${packmanColors.pmWhite};
    background-color: ${packmanColors.pmPink};
    border: none;
    border-radius: 0.8rem;
    width: 100%;
    height: 4.1rem;
  }
`;
const StyledCaption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 4.637rem 0 1.163rem 0;
  & > h1 {
    font-weight: 600;
    font-size: 2rem;
    color: ${packmanColors.pmBlack};
  }
  & > p {
    font-weight: 600;
    font-size: 1.4rem;
    color: ${packmanColors.pmDarkGrey};
  }
`;
const StyledMembers = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 0 1.2rem 5.2rem 1.2rem;
  gap: 1.788rem;
`;

import React, { useState } from 'react';
import Layout from '../common/Layout';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import { FONT_STYLES } from '../../styles/font';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface ImockData {
  status: number;
  success: boolean;
  message: string;
  data: {
    title: string; // 함께 패킹리스트 제목
    departureDate: string; // 함께 패킹리스트 출발 날짜
    remainDay: string; // 함께 패킹리스트 남은 출발 날짜
    member: {
      // 그룹에 속한 멤버 배열
      id: string; //  멤버 id
      nickname: string; // 멤버 닉네임
      profileImage: string; // 멤버 프로필 사진 id
    }[];
  };
}

interface Imember {
  // 그룹에 속한 멤버 배열
  id: string; //  멤버 id
  nickname: string; // 멤버 닉네임
  profileImage: string; // 멤버 프로필 사진 id
}

const mockData: ImockData = {
  status: 200,
  success: true,
  message: '멤버 조회 성공',
  data: {
    title: '패킹이들과 캠핑',
    departureDate: '2022.08.26',
    remainDay: '27',
    member: [
      {
        id: '1',
        nickname: '융맨',
        profileImage: '1',
      },
      {
        id: '2',
        nickname: '서히',
        profileImage: '2',
      },
      {
        id: '3',
        nickname: '현지',
        profileImage: '3',
      },
      {
        id: '4',
        nickname: '경린',
        profileImage: '4',
      },
    ],
  },
};

function ManagingMember() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [hasCopied, setHasCopied] = useState<boolean>(false);
  const [members, setMembers] = useState<Imember[]>(mockData.data.member);

  const editMembers = () => {
    setIsEditing((prev) => !prev);
  };

  const deleteMember = (index: number) => {
    setMembers(
      members.filter((member, memberIndex) => {
        return memberIndex !== index;
      }),
    );
  };

  const clickInvitingButton = () => {
    if (isEditing) {
      setIsEditing(false);
    }
  };

  const copyToClipboard = () => {
    setHasCopied(true);
    setTimeout(() => {
      setHasCopied(false);
    }, 3000);
  };

  return (
    <Layout back title="멤버 관리">
      <StyledRoot>
        <StyledHeader>
          <StyledHeaderLeft>
            <StyledListName>{mockData.data.title}</StyledListName>
            <StyledListDate>{mockData.data.departureDate}</StyledListDate>
          </StyledHeaderLeft>
          <StyledDday>D-{mockData.data.remainDay}</StyledDday>
        </StyledHeader>
        <WithMembersLabelAndEdit>
          <WithMembersLabel>함께하는 멤버</WithMembersLabel>
          <WithMembersEditButton onClick={editMembers}>
            {isEditing ? '취소' : '편집'}
          </WithMembersEditButton>
        </WithMembersLabelAndEdit>
        <WithMembers>
          {members.map((member, index: number) => {
            if (index === 0) {
              return (
                <Member key={index}>
                  <Crown src={'/assets/png/crown.png'} alt="왕관" />
                  <MemberImage index={index} />
                  <MemberName>{member.nickname}</MemberName>
                </Member>
              );
            }
            return (
              <Member key={index}>
                <MemberImage index={index} />
                <MemberName>{member.nickname}</MemberName>
                <RemoveButton
                  onClick={() => {
                    deleteMember(index);
                  }}
                  src={'/assets/png/removeMember.png'}
                  isEditing={isEditing}
                />
              </Member>
            );
          })}
        </WithMembers>
        <InviteOtherMember length={members.length}>
          함께 패킹할 멤버를 초대해보세요
        </InviteOtherMember>
        <LinkHasCopied>{hasCopied ? '링크가 복사되었습니다' : ''}</LinkHasCopied>
        {isEditing ? (
          <InvitingButton onClick={clickInvitingButton}>완료</InvitingButton>
        ) : (
          <CopyToClipboard text={'링크!'} onCopy={copyToClipboard}>
            <InvitingButton onClick={clickInvitingButton}>멤버 초대하기</InvitingButton>
          </CopyToClipboard>
        )}
      </StyledRoot>
    </Layout>
  );
}

export default ManagingMember;

const StyledRoot = styled.div`
  width: 100vw;
  height: 100%;
  padding: 0 2rem;
  overflow-y: scroll;
  position: relative;
`;

const StyledHeader = styled.section`
  height: 8.4rem;
  margin: 1rem 0 4.5rem 0;
  background-color: ${packmanColors.pmBlueGrey};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  border-radius: 1rem;
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

const WithMembersLabelAndEdit = styled.div`
  display: flex;
  justify-content: space-between;
`;

const WithMembersLabel = styled.h1`
  font-style: ${FONT_STYLES.HEADLINE2_SEMIBOLD};
`;

const WithMembersEditButton = styled.div`
  font-style: ${FONT_STYLES.BODY2_SEMIBOLD};
  color: ${packmanColors.pmDarkGrey};
  margin-bottom: 4rem;
`;

const WithMembers = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(6.4rem, 1fr));
  gap: 2rem;
  justify-items: center;
`;

const Member = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RemoveButton = styled.img<{ isEditing: boolean }>`
  display: ${({ isEditing }) => (isEditing ? 'block' : 'none')};
  width: 2.4rem;
  height: 2.4rem;
  position: absolute;
  top: -1rem;
  right: -1rem;
`;

const Crown = styled.img`
  position: absolute;
  width: 2rem;
  height: 2rem;
  top: -2rem;
`;

const MemberImage = styled.img<{ index: number }>`
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 50%;
  background-color: yellow;
  margin-bottom: 0.5rem;
  border: ${({ index }) => (index === 0 ? `0.2rem solid ${packmanColors.pmPink}` : 'none')};
`;

const MemberName = styled.div`
  font-style: ${FONT_STYLES.BODY2_SEMIBOLD};
  color: ${packmanColors.pmDarkGrey};
`;

const InviteOtherMember = styled.div<{ length: number }>`
  display: ${({ length }) => (length === 1 ? 'block;' : 'none;')};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-style: ${FONT_STYLES.SUBHEAD2_SEMIBOLD};
  color: ${packmanColors.pmGrey};
  white-space: nowrap;
`;

const LinkHasCopied = styled.div`
  font-style: ${FONT_STYLES.BODY1_REGULAR};
  color: ${packmanColors.pmDarkGrey};
  position: absolute;
  bottom: 12.5rem;
  width: calc(100vw - 4rem);
  text-align: center;
`;

const InvitingButton = styled.div`
  width: calc(100vw - 4rem);
  height: 4rem;
  color: white;
  background-color: ${packmanColors.pmPink};
  border-radius: 0.8rem;
  font-style: ${FONT_STYLES.BODY4_SEMIBOLD};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 8rem;
`;

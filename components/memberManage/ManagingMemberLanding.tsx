import React, { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';
import styled, { css } from 'styled-components';
import { packmanColors } from '../../styles/color';
import { FONT_STYLES } from '../../styles/font';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useAPI from '../../utils/hooks/useAPI';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Loading from '../common/Loading';
import { useRecoilValue } from 'recoil';
import { authUserAtom } from '../../utils/recoil/atom/atom';
import produce from 'immer';
import { GetGroupMemberOutput } from '../../service/member';
import { ProfileList } from '../../utils/profileImages';

interface Imember {
  // 그룹에 속한 멤버 배열
  id: string; //  멤버 id
  nickname: string; // 멤버 닉네임
  profileImage: string; // 멤버 프로필 사진 id
}

function ManagingMemberLanding() {
  const client = useQueryClient();
  const router = useRouter();
  const { id } = router.query;

  const getGroupMember = useAPI((api) => api.member.getGroupMember);
  const { data } = useQuery(
    ['getGroupMember', id],
    () => getGroupMember({ listId: id as string }),
    {
      enabled: !!id,
      refetchInterval: 3000,
    },
  );

  const user = useRecoilValue(authUserAtom);
  const userId = user.id;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [hasCopied, setHasCopied] = useState<boolean>(false);
  const [oldMembers, setOldMembers] = useState<Imember[]>([]);
  const [willBeDeleted, setWillBeDeleted] = useState<string[]>([]);

  const hasCopiedTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (hasCopiedTimeoutRef.current) {
        clearTimeout(hasCopiedTimeoutRef.current);
      }
    };
  }, []);

  const editMembers = () => {
    const prev = client.getQueryData<GetGroupMemberOutput>(['getGroupMember', id]);

    // 취소 버튼 누를 시
    if (prev) {
      if (isEditing) {
        const newPrev = produce(prev, (draft) => {
          draft.data.member = oldMembers;
        });

        client.setQueryData(['getGroupMember', id], newPrev);
      }
      // 편집 버튼 누를 시
      else {
        setOldMembers(prev.data.member);
      }
    }
    setIsEditing((prev) => !prev);
  };

  const deletePackingListMember = useAPI((api) => api.member.deleteGroupMember);
  const { mutate: deleteListMember } = useMutation(
    'deletePackingListMember',
    deletePackingListMember,
  );

  const deleteMember = (memberId: string) => {
    const prev = client.getQueryData<GetGroupMemberOutput>(['getGroupMember', id]);

    const newPrev = produce(prev, (draft) => {
      let index;
      draft?.data.member.forEach((member, i) => {
        if (member.id === memberId) {
          index = i;
        }
      });
      index && draft?.data.member.splice(index, 1);
    });

    client.setQueryData(['getGroupMember', id], newPrev);
    setWillBeDeleted((prev) => [...prev, memberId]);
  };

  const clickInvitingButton = () => {
    if (isEditing) {
      deleteListMember(
        {
          groupId: id as string,
          userId: willBeDeleted.join(),
        },
        {
          onSuccess: () => {
            client.invalidateQueries(['getGroupMember', id]);
          },
        },
      );
      setIsEditing(false);
    }
  };

  const copyToClipboard = () => {
    setHasCopied(true);
    hasCopiedTimeoutRef.current = setTimeout(() => {
      setHasCopied(false);
    }, 3000);
  };

  if (!data) return <Loading />;
  const { data: packingList } = data;
  const members = packingList.member;

  const getRemainDayToString = () => {
    const remainDayToInt = parseInt(packingList.remainDay);
    if (!remainDayToInt) {
      return 'D-day 🎉';
    } else if (remainDayToInt < 0) {
      return 'Done!';
    } else {
      return `D-${packingList.remainDay}`;
    }
  };

  return (
    <Layout back title="멤버 관리">
      <StyledRoot>
        <StyledHeader>
          <StyledHeaderLeft>
            <StyledListName>{packingList.title}</StyledListName>
            <StyledListDate>{packingList.departureDate.replaceAll('-', '. ')}</StyledListDate>
          </StyledHeaderLeft>
          <StyledDday>{getRemainDayToString()}</StyledDday>
        </StyledHeader>
        <WithMembersLabelAndEdit>
          <WithMembersLabel>함께하는 멤버</WithMembersLabel>
          {userId === members[0].id ? (
            <WithMembersEditButton onClick={editMembers}>
              {isEditing ? '취소' : '편집'}
            </WithMembersEditButton>
          ) : (
            <></>
          )}
        </WithMembersLabelAndEdit>
        <WithMembers>
          {members.map((member, index: number) => (
            <Member key={index}>
              {index === 0 && (
                <Crown>
                  <Image src={'/assets/png/crown.png'} alt="왕관" layout="fill" />
                </Crown>
              )}
              <MemberImage index={index}>
                <Image
                  src={ProfileList[+member.profileImage]}
                  width={64}
                  height={64}
                  alt="profile_image"
                  priority
                  layout="responsive"
                />
              </MemberImage>
              <MemberName>{member.nickname}</MemberName>
              <RemoveButton onClick={() => deleteMember(member.id)} isEditing={isEditing}>
                <Image
                  src={'/assets/png/removeMember.png'}
                  alt="삭제"
                  layout="fill"
                  loading="eager"
                />
              </RemoveButton>
            </Member>
          ))}
        </WithMembers>
        <InviteOtherMember length={members.length}>
          함께 패킹할 멤버를 초대해보세요
        </InviteOtherMember>
        <InvitingButtonWrapper>
          {isEditing ? (
            <InvitingButton onClick={clickInvitingButton} hasCopied={hasCopied}>
              완료
            </InvitingButton>
          ) : (
            <CopyToClipboard
              text={`${process.env.NEXT_PUBLIC_DOMAIN}/together/invited?inviteCode=${packingList.inviteCode}`}
              onCopy={copyToClipboard}
            >
              <InvitingButton onClick={clickInvitingButton} hasCopied={hasCopied}>
                멤버 초대하기
              </InvitingButton>
            </CopyToClipboard>
          )}
        </InvitingButtonWrapper>
      </StyledRoot>
    </Layout>
  );
}

export default ManagingMemberLanding;

const StyledRoot = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 2rem;
  overflow-y: scroll;
  position: relative;
  display: flex;
  flex-direction: column;
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
  margin-bottom: 4rem;
`;

const WithMembersLabel = styled.h1`
  font-style: ${FONT_STYLES.HEADLINE2_SEMIBOLD};
`;

const WithMembersEditButton = styled.div`
  font-style: ${FONT_STYLES.BODY2_SEMIBOLD};
  color: ${packmanColors.pmDarkGrey};
`;

const WithMembers = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fill, minmax(6.4rem, 1fr));
  gap: 2rem;

  position: relative;
`;

const Member = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RemoveButton = styled.div<{ isEditing: boolean }>`
  display: ${({ isEditing }) => (isEditing ? 'block' : 'none')};
  width: 2.4rem;
  height: 2.4rem;
  position: absolute;
  top: -1rem;
  right: -1rem;
`;

const Crown = styled.div`
  position: absolute;
  width: 2rem;
  height: 2rem;
  top: -2rem;
`;

const MemberImage = styled.div<{ index: number }>`
  width: 6.4rem;
  height: 6.4rem;
  margin-bottom: 0.5rem;
  border-radius: 50%;
  border: ${({ index }) => (index === 0 ? `0.2rem solid ${packmanColors.pmPink}` : 'none')};
  overflow: hidden;
`;

const MemberName = styled.div`
  font-style: ${FONT_STYLES.BODY2_SEMIBOLD};
  color: ${packmanColors.pmDarkGrey};
`;

const InviteOtherMember = styled.div<{ length: number }>`
  display: ${({ length }) => (length === 1 ? 'block' : 'none')};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-style: ${FONT_STYLES.SUBHEAD2_SEMIBOLD};
  color: ${packmanColors.pmGrey};
  white-space: nowrap;
`;

const InvitingButtonWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: flex-end;
  padding-bottom: 13rem;
`;

const InvitingButton = styled.div<{ hasCopied: boolean }>`
  width: calc(100vw - 4rem);
  height: 4rem;
  color: white;
  background-color: ${packmanColors.pmPink};
  border-radius: 0.8rem;
  font-style: ${FONT_STYLES.BODY4_SEMIBOLD};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  ${({ hasCopied }) =>
    hasCopied &&
    css`
      &::after {
        font-style: ${FONT_STYLES.BODY1_REGULAR};
        color: ${packmanColors.pmDarkGrey};
        position: absolute;
        bottom: 12.5rem;
        width: calc(100vw - 4rem);
        text-align: center;
        top: -2.5rem;
        height: 2rem;
        content: '링크가 복사되었습니다';
      }
    `}
`;

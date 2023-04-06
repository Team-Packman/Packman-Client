import React, { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';
import styled, { css } from 'styled-components';
import { packmanColors } from '../../styles/color';
import { FONT_STYLES } from '../../styles/font';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Image from 'next/image';
import useAPI from '../../utils/hooks/useAPI';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Loading from '../common/Loading';
import { useRecoilValue } from 'recoil';
import { authUserAtom } from '../../utils/recoil/atom/atom';
import { ProfileList } from '../../utils/profileImages';
import Card from '../common/Card';
import { Utility } from '../../utils/Utility';
import { GetMembersOutput } from '../../service/packingList/together';
import useQueryString from '../../utils/hooks/common/useQueryString';

interface Imember {
  // 그룹에 속한 멤버 배열
  id: string; //  멤버 id
  nickname: string; // 멤버 닉네임
  profileImage: string; // 멤버 프로필 사진 id
}

function ManagingMemberLanding() {
  const client = useQueryClient();
  const listId = useQueryString('id');
  const { id: userId } = useRecoilValue(authUserAtom);
  const getMembers = useAPI((api) => api.packingList.together.getMembers);
  const { data } = useQuery(['getMembers', listId], () => getMembers(listId as string), {
    enabled: !!listId,
    refetchInterval: 3000,
  });

  const [localMembers, setLocalMembers] = useState<Imember[]>([]);
  const [willBeDeleted, setWillBeDeleted] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [hasCopied, setHasCopied] = useState<boolean>(false);
  const hasCopiedTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const deletePackingListMember = useAPI((api) => api.packingList.together.deleteMember);
  const { mutate: deleteListMember } = useMutation(
    'deletePackingListMember',
    deletePackingListMember,
  );

  useEffect(() => {
    data?.data.member && setLocalMembers(data?.data.member);
  }, [data?.data.member]);

  useEffect(() => {
    return () => {
      if (hasCopiedTimeoutRef.current) {
        clearTimeout(hasCopiedTimeoutRef.current);
      }
    };
  }, []);

  if (!data || !listId || !localMembers.length) return <Loading />;

  const toggleEditingMode = () => {
    const originMembers = client.getQueryData<GetMembersOutput>(['getMembers', listId]);

    if (isEditing) {
      originMembers && setLocalMembers(originMembers.data.member);
      setWillBeDeleted([]);
    }

    setIsEditing((prev) => !prev);
  };

  const deleteMember = (memberId: string) => {
    const filteredMembers = localMembers.filter((member) => member.id !== memberId);

    setLocalMembers(filteredMembers);
    setWillBeDeleted((prev) => [...new Set([...prev, memberId])]);
  };

  const clickEditConfirmButton = () => {
    if (isEditing) {
      deleteListMember(
        {
          listId,
          memberId: willBeDeleted.join(),
        },
        {
          onSuccess() {
            client.invalidateQueries(['getMembers', listId]);
          },
          onSettled() {
            setWillBeDeleted([]);
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

  const { data: packingList } = data;
  console.log(localMembers);
  return (
    <Layout back title="멤버 관리">
      <StyledRoot>
        <Card>
          <Card.LeftContainer overlay={leftContainerStyle}>
            <Card.Title value={packingList.title} />
            <Card.SubTitle value={Utility.convertDateFormatToDot(packingList.departureDate)} />
          </Card.LeftContainer>
          <Card.RightContainer>
            <Card.DDay value={Utility.getDDay(packingList.remainDay)} />
          </Card.RightContainer>
        </Card>
        <WithMembersLabelAndEdit>
          <WithMembersLabel>함께하는 멤버</WithMembersLabel>
          {userId === localMembers[0].id ? (
            <WithMembersEditButton onClick={toggleEditingMode}>
              {isEditing ? '취소' : '편집'}
            </WithMembersEditButton>
          ) : (
            <></>
          )}
        </WithMembersLabelAndEdit>
        <WithMembers>
          {localMembers.map((member, index: number) => {
            if (index === 0) {
              return (
                <Member key={index}>
                  <Crown>
                    <Image src={'/assets/png/crown.png'} alt="왕관" layout="fill" />
                  </Crown>
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
                </Member>
              );
            }
            return (
              <Member key={index}>
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
                <RemoveButton
                  onClick={() => {
                    deleteMember(member.id);
                  }}
                  isEditing={isEditing}
                >
                  <Image
                    src={'/assets/png/removeMember.png'}
                    alt="삭제"
                    layout="fill"
                    loading="eager"
                  />
                </RemoveButton>
              </Member>
            );
          })}
        </WithMembers>
        <InviteOtherMember length={localMembers.length}>
          함께 패킹할 멤버를 초대해보세요
        </InviteOtherMember>
        <InvitingButtonWrapper>
          {isEditing ? (
            <InvitingButton onClick={clickEditConfirmButton} hasCopied={hasCopied}>
              완료
            </InvitingButton>
          ) : (
            <CopyToClipboard
              text={`${process.env.NEXT_PUBLIC_DOMAIN}/together/invited?inviteCode=${packingList.inviteCode}`}
              onCopy={copyToClipboard}
            >
              <InvitingButton hasCopied={hasCopied}>멤버 초대하기</InvitingButton>
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

const leftContainerStyle = css`
  gap: 0.8rem;
`;

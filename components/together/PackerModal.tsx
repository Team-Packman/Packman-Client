import Image from 'next/image';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { packmanColors } from '../../styles/color';
import { FONT_STYLES } from '../../styles/font';
import { ProfileList } from '../../utils/profileImages';
import Modal from '../common/Modal';

export interface PackerInfoPayload {
  listId: string; // 패킹리스트 id
  packId: string; // 짐 id
  packerId: string; // 짐 챙길 사람 id
}

interface PackerModalProps {
  member: {
    id: string;
    nickname: string;
    profileImage: string;
  }[];
  packId: string;
  listId: string;
  modalHandler: () => void;
  updatePacker: (payload: PackerInfoPayload) => void;
}

function PackerModal(props: PackerModalProps) {
  const { member, modalHandler, packId, listId, updatePacker } = props;

  const TICK = 30;
  const ITERATOR = Array(TICK).fill('').entries();
  const ID_LIST = member.map(({ id }) => id);
  const drawId = () => Math.floor(Math.random() * member.length);
  const [selected, setSelected] = useState('');

  /** @todo 랜덤 배정 로직 수정 */
  const draw = () => {
    const randomId = ID_LIST[drawId()];
    setSelected(randomId);

    // if (selected !== randomId) {
    //   return;
    // }
    // draw();
  };

  async function StartDraw() {
    setSelected('');
    draw();
  }

  const clickHandler = () => {
    const payload = {
      listId,
      packId,
      packerId: selected,
    };
    updatePacker(payload);
    modalHandler();
  };

  return (
    <Modal onClick={modalHandler}>
      <Modal.Body>
        <StyledTitle>챙길 사람을 선택해주세요</StyledTitle>
        <StyledRandomButton onClick={StartDraw}>랜덤 배정</StyledRandomButton>
        <StyledPackerWrapper>
          {member.map(({ id, nickname, profileImage }) => (
            <StyledPacker key={id} onClick={() => setSelected(id)}>
              <StyledPackerImg selected={selected === id}>
                <StyledBackground selected={selected === id} />
                <Image
                  src={ProfileList[+profileImage]}
                  placeholder="blur"
                  alt="profile"
                  layout="fill"
                />
              </StyledPackerImg>
              <StyledPackerName selected={selected === id}>{nickname}</StyledPackerName>
            </StyledPacker>
          ))}
        </StyledPackerWrapper>
      </Modal.Body>
      <Modal.Controls
        controls={
          <StyledConfirmButton selected={selected !== ''} onClick={clickHandler}>
            배정 완료
          </StyledConfirmButton>
        }
      />
    </Modal>
  );
}

export default PackerModal;

const StyledTitle = styled.div`
  font-weight: 600;
  font-size: 1.6rem;
  text-align: center;
`;

const StyledRandomButton = styled.button`
  width: 100%;
  height: 4rem;
  color: ${packmanColors.black};
  background-color: ${packmanColors.pmWhite};
  border: 1px solid ${packmanColors.black};
  border-radius: 0.8rem;
  font-weight: 500;
  font-size: 1.5rem;
  margin-top: 1.4rem;
`;

const StyledPackerWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: space-between;
  height: 18rem;
  margin-top: 2.4rem;
  overflow: scroll;
`;

const StyledPacker = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 6.4rem;
  height: 8.6rem;
`;

const StyledPackerImg = styled.div<{
  selected: boolean;
}>`
  position: relative;
  width: 100%;
  height: 6.4rem;
  border: 2.5px solid transparent;
  ${({ selected }) =>
    selected &&
    css`
      border-color: ${packmanColors.pink};
    `}
  border-radius: 0.8rem;
`;

const StyledBackground = styled.div<{ selected: boolean }>`
  position: absolute;
  transform: translate(-0.15rem, -0.15rem);

  width: 6.3rem;
  height: 6.3rem;
  border-radius: 0.7rem;
  background: url('assets/svg/iSelected.svg') no-repeat center;
  background-color: ${({ selected }) => (selected ? 'rgba(0,0,0,0.48)' : 'transparent')};
  z-index: ${({ selected }) => selected && '1'};
`;

const StyledPackerName = styled.div<{ selected: boolean }>`
  ${FONT_STYLES.BODY2_SEMIBOLD};
  width: 100%;
  height: 1.7rem;
  line-height: 1.7rem;
  text-align: center;
  color: ${({ selected }) => selected && packmanColors.pmPink};
`;

const StyledConfirmButton = styled.button<{
  selected: boolean;
}>`
  width: 100%;
  height: 4rem;
  color: ${packmanColors.pmWhite};
  border: none;
  border-radius: 0.8rem;
  font-weight: 600;
  font-size: 1.5rem;
  margin-top: 2.4rem;
  background-color: ${({ selected }) =>
    selected ? `${packmanColors.pink}` : `${packmanColors.pmGrey}`};
`;

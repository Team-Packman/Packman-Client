import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { packmanColors } from '../../styles/color';
import { calcMs } from '../../utils/Draw';

interface PackerModalProps {
  members: {
    id: string;
    nickname: string;
    profileImageId: string;
  }[];
  packId: string;
  modalHandler: () => void;
}

function PackerModal(props: PackerModalProps) {
  const { members, modalHandler, packId } = props;

  const TICK = 30;
  const ITERATOR = Array(TICK).fill('').entries();
  const [selected, setSelected] = useState('');
  const drawId = () => Math.floor(Math.random() * members.length);

  // const draw = () => {
  //   const randomId = drawId();

  //   if (selected !== randomId) {
  //     setSelected(randomId);
  //     return;
  //   }
  //   draw();
  // };

  async function StartDraw() {
    // for (const [index] of ITERATOR) {
    //   draw();
    //   await new Promise((r) => setTimeout(r, calcMs(index)));
    // }
  }

  return (
    <StyledRoot>
      <StyledModal>
        <StyledTitle>챙길 사람을 선택해주세요</StyledTitle>
        <StyledRandomButton onClick={StartDraw}>랜덤 배정</StyledRandomButton>
        <StyledPackerWrapper>
          {members.map(({ id, nickname, profileImageId }, i) => (
            <StyledPacker key={id} onClick={() => setSelected(id)}>
              <StyledPackerImg selected={selected === id} />
              <StyledPackerName>{nickname}</StyledPackerName>
            </StyledPacker>
          ))}
        </StyledPackerWrapper>
        <StyledConfirmButton
          selected={selected !== ''}
          onClick={() => {
            console.log({
              packId,
              packerId: selected,
            });
            modalHandler();
          }}
        >
          배정 완료
        </StyledConfirmButton>
      </StyledModal>
      <StyledBg onClick={modalHandler} />
    </StyledRoot>
  );
}

export default PackerModal;

const StyledRoot = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 45;
`;

const StyledBg = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 45;
`;
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32rem;
  height: 40.2rem;
  border-radius: 0.8rem;
  background-color: ${packmanColors.white};
  padding: 0 1.6rem;
  z-index: 46;
`;

const StyledTitle = styled.div`
  font-weight: 600;
  font-size: 1.6rem;
  text-align: center;
  margin-top: 4.3rem;
`;

const StyledRandomButton = styled.button`
  width: 100%;
  height: 4rem;
  background-color: ${packmanColors.white};
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
  width: 100%;
  height: 6.4rem;
  border: 2px solid ${packmanColors.pmGrey};
  ${({ selected }) =>
    selected &&
    css`
      border-color: ${packmanColors.pink};
    `}
  background-color: ${packmanColors.pmGrey};
  border-radius: 0.8rem;
`;

const StyledPackerName = styled.div`
  width: 100%;
  height: 1.7rem;
  line-height: 1.7rem;
  font-weight: 600;
  font-size: 1.4rem;
  text-align: center;
`;

const StyledConfirmButton = styled.button<{
  selected: boolean;
}>`
  width: 100%;
  height: 4rem;
  color: ${packmanColors.white};
  border: none;
  border-radius: 0.8rem;
  font-weight: 600;
  font-size: 1.5rem;
  margin-top: 2.4rem;
  background-color: ${({ selected }) =>
    selected ? `${packmanColors.pink}` : `${packmanColors.pmGrey}`};
`;

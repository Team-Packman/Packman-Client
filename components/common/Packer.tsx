import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import HoleIc from '/public/assets/svg/hole_ic.svg';
import SelectedHoleIc from '/public/assets/svg/hole_selected_ic.svg';
interface PackerProps {
  packer: { _id: string; name: string } | null;
  modalHandler?: () => void;
}

function Packer(props: PackerProps) {
  const { packer, modalHandler } = props;

  return (
    <>
      <StyledRoot selected={packer !== null} onClick={modalHandler}>
        <div>
          {packer ? (
            <Image src={SelectedHoleIc} alt="hole_ic" layout="fill" />
          ) : (
            <Image src={HoleIc} alt="hole_ic" layout="fill" />
          )}
        </div>
        <span>{packer ? packer.name : '챙길사람'}</span>
      </StyledRoot>
    </>
  );
}

export default Packer;

const StyledRoot = styled.button<{
  selected: boolean;
}>`
  display: flex;
  height: 2.4rem;
  align-items: center;
  border-style: solid;
  border-width: 1px;
  border-radius: 0.8rem 0.4rem 0.4rem 0.8rem;
  padding-left: 0.5rem;
  padding-right: 1.2rem;
  outline: none;
  -webkit-border-radius: 0.8rem 0.4rem 0.4rem 0.8rem;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  ${({ selected }) =>
    selected
      ? `
    background-color: ${packmanColors.white};
    border-color: ${packmanColors.pmLightPink};
    color: ${packmanColors.pink};
  `
      : `
    background-color: ${packmanColors.pmGrey};
    border-color: ${packmanColors.pmGrey};
    color: ${packmanColors.white};
  `}

  & > div {
    width: 0.4rem;
    height: 0.8rem;
    position: relative;
    -webkit-appearance: none; /* Safari and Chrome */
  }

  & > span {
    width: 5.3rem;
    font-size: 1.4rem;
    letter-spacing: 0.04em;
    flex-shrink: 0;
    margin-left: 1.1rem;
  }
`;

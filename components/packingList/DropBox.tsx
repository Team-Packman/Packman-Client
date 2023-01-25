import styled, { css } from 'styled-components';
import { packmanColors } from '../../styles/color';
import Dropdown from '../common/Dropdown';
import { ReactNode, useState } from 'react';
import iShowMore from '../../public/assets/svg/iShowMore.svg';
import Image from 'next/image';

interface DropBoxProps {
  data: ReactNode;
  onChange: VoidFunction;
}

function DropBox(props: DropBoxProps) {
  const { data, onChange } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    // 스와이프 리스트 삭제 모드 해제
    onChange();
  };

  return (
    <Dropdown isOpen={isOpen} overlay={dropdownStyle} onChange={toggleDropdown}>
      <Dropdown.Trigger
        as={
          <StyledToggleImage toggle={isOpen} onClick={toggleDropdown}>
            <Image src={iShowMore} alt="상세보기" layout="fill" />
          </StyledToggleImage>
        }
      />
      <Dropdown.Menu overlay={dropdownMenuStyle}>{data}</Dropdown.Menu>
    </Dropdown>
  );
}

export default DropBox;

const dropdownStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 0.8rem;
`;

const dropdownMenuStyle = css`
  position: absolute;
  top: 4.2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 18rem;

  background-color: ${packmanColors.pmWhite};
  border-radius: 0.8rem;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 100;
`;

const StyledToggleImage = styled.div<{ toggle: boolean }>`
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  transition: 0.2s ease-in-out;
  transform: ${({ toggle }) => (toggle ? 'rotate(180deg)' : 'rotate(0deg)')};
  cursor: pointer;
`;

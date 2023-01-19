import Link from 'next/link';
import styled, { css } from 'styled-components';
import { packmanColors } from '../../styles/color';
import Dropdown from '../common/Dropdown';
import { useState } from 'react';
import iShowMore from '../../public/assets/svg/iShowMore.svg';
import Image from 'next/image';

interface DropBoxProps {
  folders: Array<{ id: string; name: string }>;
  link: string;
  currentFolder: {
    id: string;
    name: string;
  };
  onClick: VoidFunction;
}

function DropBox(props: DropBoxProps) {
  const {
    folders,
    link,
    currentFolder: { id: currentId },
    onClick,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    onClick();
  };

  return (
    <Dropdown isOpen={isOpen} toggleDropdown={toggleDropdown} dropdownStyle={dropdownStyle}>
      <Dropdown.Trigger
        as={
          <StyledToggleImage toggle={isOpen} onClick={toggleDropdown}>
            <Image src={iShowMore} alt="상세보기" layout="fill" />
          </StyledToggleImage>
        }
      />
      <Dropdown.Menu dropdownMenuStyle={dropdownMenuStyle}>
        {folders.map(({ id, name }) => (
          <Dropdown.Item
            key={id}
            isCurrentFolder={id === currentId}
            dropdownItemStyle={dropdownItemStyle}
            onClick={toggleDropdown}
          >
            <Link href={`${link}${id}`}>{name}</Link>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
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

const dropdownItemStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 4.8rem;

  font-size: 1.5rem;

  &:not(:last-child) {
    border-bottom: 1px solid ${packmanColors.pmGrey};
  }
`;

const StyledToggleImage = styled.div<{ toggle: boolean }>`
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  transition: 0.2s ease-in-out;
  transform: ${({ toggle }) => (toggle ? 'rotate(180deg)' : 'rotate(0deg)')};
  cursor: pointer;
`;

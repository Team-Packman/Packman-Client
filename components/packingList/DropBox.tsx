import { css } from 'styled-components';
import { packmanColors } from '../../styles/color';
import Dropdown from '../common/Dropdown';
import { ReactElement, ReactNode, useState } from 'react';

interface DropBoxProps {
  data: ReactNode;
  onChange: VoidFunction;
  trigger: ReactElement;
}

function DropBox(props: DropBoxProps) {
  const { data, onChange, trigger } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    onChange();
  };

  return (
    <Dropdown isOpen={isOpen} onChange={toggleDropdown} overlay={dropdownStyle}>
      <Dropdown.Trigger as={trigger} onClick={toggleDropdown} overlay={dropdownTriggerStyle} />
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

const dropdownTriggerStyle = css<{ isOpen?: boolean }>`
  & .rotate {
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  }
`;

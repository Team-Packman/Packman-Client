import { css } from 'styled-components';
import { packmanColors } from '../../styles/color';
import Dropdown from '../common/Dropdown';
import { ReactElement, ReactNode, useState } from 'react';

interface DropBoxProps<T, U> {
  data: T[];
  onChange: VoidFunction;
  trigger: ReactElement;
  items: (args: U) => ReactNode;
}

function DropBox<
  T extends { id: string; name: string },
  U extends { value: { id: string; name: string }; onChange: VoidFunction },
>(props: DropBoxProps<T, U>) {
  const { data, onChange, trigger, items } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Dropdown isOpen={isOpen} onChange={toggleDropdown} overlay={dropdownStyle}>
      <Dropdown.Trigger as={trigger} />
      <Dropdown.Menu overlay={dropdownMenuStyle}>
        {data.map(({ id, name }) => (
          <Dropdown.Item key={id}>
            {items({
              value: { id, name },
              onChange,
            })}
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

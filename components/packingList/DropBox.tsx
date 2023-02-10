import { css } from 'styled-components';
import { packmanColors } from '../../styles/color';
import Dropdown from '../common/Dropdown';
import { ReactElement } from 'react';

interface DropBoxProps<T> {
  data: T[];
  onChange: (id: string) => void;
  trigger: ReactElement;
  item: ReactElement<T>;
}

function DropBox<T extends { id: string; name: string }>(props: DropBoxProps<T>) {
  const { data, trigger, item, onChange } = props;

  return (
    <Dropdown overlay={dropdownStyle} onChange={onChange}>
      <Dropdown.Trigger as={trigger} />
      <Dropdown.Menu overlay={dropdownMenuStyle}>
        {data.map((option) => (
          <Dropdown.Item key={option.id} as={item} value={option}>
            {option.name}
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

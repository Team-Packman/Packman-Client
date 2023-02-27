import { ReactElement } from 'react';
import Dropdown from './Dropdown';

interface SelectProps {
  options: Array<any>;
  trigger: ReactElement;
}

function Select(props: SelectProps) {
  const { options, trigger } = props;

  return (
    <Dropdown>
      <Dropdown.Trigger as={trigger} />
      <Dropdown.Menu>
        {options.map((option) => (
          <Dropdown.Item key={option}>{option}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Select;

import { PropsWithChildren, ReactElement } from 'react';

interface TriggerProps {
  as: ReactElement;
}

function Dropdown(props: PropsWithChildren) {
  const { children } = props;
  return <>{children}</>;
}

Dropdown.Menu = function Menu(props: PropsWithChildren) {
  const { children } = props;
  return <>{children}</>;
};

Dropdown.Item = function Item(props: PropsWithChildren) {
  const { children } = props;
  return <>{children}</>;
};

Dropdown.Trigger = function Trigger(props: TriggerProps) {
  const { as } = props;
  return as;
};

export default Dropdown;

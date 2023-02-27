import { createContext, PropsWithChildren, ReactElement, useContext } from 'react';
import styled from 'styled-components';

interface DropdownProps {
  isOpen: boolean;
  toggleDropdown: VoidFunction;
}

interface BackgroundProps {
  onClick: VoidFunction;
}
interface TriggerProps {
  as: ReactElement;
}

export const DropdownContext = createContext({
  isOpen: false,
  toggleDropdown: () => {},
});

function Dropdown(props: PropsWithChildren<DropdownProps>) {
  const { children, isOpen, toggleDropdown } = props;

  return (
    <DropdownContext.Provider value={{ isOpen, toggleDropdown }}>
      {children}
    </DropdownContext.Provider>
  );
}

Dropdown.Background = function Background(props: BackgroundProps) {
  const { onClick } = props;
  return <StyledBackground onClick={onClick} />;
};

Dropdown.Menu = function Menu(props: PropsWithChildren) {
  const { children } = props;
  const { isOpen, toggleDropdown } = useContext(DropdownContext);

  return (
    <>
      {isOpen && (
        <>
          <Dropdown.Background onClick={toggleDropdown} />
          {children}
        </>
      )}
    </>
  );
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

const StyledBackground = styled.div`
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

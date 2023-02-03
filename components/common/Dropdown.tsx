import { createContext, PropsWithChildren, ReactElement, useContext } from 'react';
import styled, { CSSProp } from 'styled-components';

interface DropdownProps {
  isOpen: boolean;
  onChange: VoidFunction;
  overlay?: CSSProp;
}

interface BackgroundProps {
  onClick?: VoidFunction;
}
interface MenuProps {
  overlay?: CSSProp;
}

interface ItemProps {
  onClick?: VoidFunction;
}

interface TriggerProps {
  as: ReactElement;
}

export const DropdownContext = createContext({
  isOpen: false,
  onChange: () => {},
});

function Dropdown(props: PropsWithChildren<DropdownProps>) {
  const { children, isOpen, overlay, onChange } = props;

  return (
    <DropdownContext.Provider value={{ isOpen, onChange }}>
      <StyledDropdown overlay={overlay} onChange={onChange}>
        {children}
      </StyledDropdown>
    </DropdownContext.Provider>
  );
}

Dropdown.Background = function Background(props: BackgroundProps) {
  const { onClick } = props;
  return <StyledBackground onClick={onClick} />;
};

Dropdown.Menu = function Menu(props: PropsWithChildren<MenuProps>) {
  const { children, overlay } = props;
  const { isOpen, onChange } = useContext(DropdownContext);

  return (
    <>
      {isOpen && (
        <StyledMenu overlay={overlay}>
          <Dropdown.Background onClick={onChange} />
          {children}
        </StyledMenu>
      )}
    </>
  );
};

Dropdown.Item = function Item(props: PropsWithChildren<ItemProps>) {
  const { children } = props;

  return <>{children}</>;
};

Dropdown.Trigger = function Trigger(props: TriggerProps) {
  const { as } = props;

  return <>{as}</>;
};

export default Dropdown;

const StyledDropdown = styled.div<{ overlay?: CSSProp }>`
  ${({ overlay }) => overlay}
`;

const StyledMenu = styled.div<{ overlay?: CSSProp }>`
  ${({ overlay }) => overlay}
`;

const StyledBackground = styled.div`
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`;

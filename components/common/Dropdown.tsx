import { createContext, PropsWithChildren, ReactElement, useContext } from 'react';
import styled, { CSSProp } from 'styled-components';

interface DropdownProps {
  isOpen: boolean;
  styles?: CSSProp;
  onChange: VoidFunction;
}

interface BackgroundProps {
  onClick?: VoidFunction;
}
interface MenuProps {
  styles?: CSSProp;
}

interface ItemProps {
  onClick?: VoidFunction;
  styles?: CSSProp;
}

interface TriggerProps {
  as: ReactElement;
}

export const DropdownContext = createContext({
  isOpen: false,
  onChange: () => {},
});

function Dropdown(props: PropsWithChildren<DropdownProps>) {
  const { children, isOpen, styles, onChange } = props;

  return (
    <DropdownContext.Provider value={{ isOpen, onChange }}>
      <StyledDropdown styles={styles} onChange={onChange}>
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
  const { children, styles } = props;
  const { isOpen, onChange } = useContext(DropdownContext);

  return (
    <>
      {isOpen && (
        <StyledMenu styles={styles}>
          <Dropdown.Background onClick={onChange} />
          {children}
        </StyledMenu>
      )}
    </>
  );
};

Dropdown.Item = function Item(props: PropsWithChildren<ItemProps>) {
  const { children, onClick, styles } = props;
  return (
    <StyledItem styles={styles} onClick={onClick}>
      {children}
    </StyledItem>
  );
};

Dropdown.Trigger = function Trigger(props: TriggerProps) {
  const { as } = props;

  return as;
};

export default Dropdown;

const StyledDropdown = styled.div<{ styles?: CSSProp }>`
  ${({ styles }) => styles}
`;

const StyledMenu = styled.div<{ styles?: CSSProp }>`
  ${({ styles }) => styles}
`;

const StyledBackground = styled.div`
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`;

const StyledItem = styled.div<{ styles?: CSSProp }>`
  ${({ styles }) => styles};
`;

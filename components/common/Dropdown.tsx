import React, { createElement } from 'react';
import {
  cloneElement,
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
  ElementType,
} from 'react';
import styled, { CSSProp } from 'styled-components';
import useBoolean from '../../utils/hooks/common/useBoolean';

interface DropdownProps {
  isOpen?: boolean;
  onChange?: VoidFunction;
  overlay?: CSSProp;
}

interface BackgroundProps {
  onClick?: VoidFunction;
}
interface MenuProps {
  overlay?: CSSProp;
}

interface ItemProps<T> {
  onClick?: VoidFunction;
  as?: ReactElement<T> | ElementType;
  value: T;
}

interface TriggerProps {
  as: ReactElement;
}

export const DropdownContext = createContext({
  isOpen: false,
  onChange: () => {},
});

function Dropdown(props: PropsWithChildren<DropdownProps>) {
  const { children, overlay, onChange } = props;
  const [isOpen, open, close, toogle] = useBoolean(false);

  return (
    <DropdownContext.Provider value={{ isOpen, onChange: toogle }}>
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

Dropdown.Item = function Item<T>(props: PropsWithChildren<ItemProps<T>>) {
  const { children, as = 'li', value } = props;
  const { onChange } = useContext(DropdownContext);

  return (
    <>
      {typeof as === 'string'
        ? createElement(as, { onChange }, children)
        : cloneElement(as as ReactElement, { value, onChange }, children)}
    </>
  );
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

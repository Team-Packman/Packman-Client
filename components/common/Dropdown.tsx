import { createContext, PropsWithChildren, ReactElement, useContext } from 'react';
import styled, { CSSProp } from 'styled-components';

interface DropdownProps {
  isOpen: boolean;
  style?: CSSProp;
  onChange: VoidFunction;
}

interface BackgroundProps {
  onClick?: VoidFunction;
}
interface MenuProps {
  style?: CSSProp;
}

interface ItemProps {
  onClick?: VoidFunction;
  style?: CSSProp;
}

interface TriggerProps {
  as: ReactElement;
}

export const DropdownContext = createContext({
  isOpen: false,
  onChange: () => {},
});

function Dropdown(props: PropsWithChildren<DropdownProps>) {
  const { children, isOpen, style, onChange } = props;

  return (
    <DropdownContext.Provider value={{ isOpen, onChange }}>
      <StyledDropdown css={style} onChange={onChange}>
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
  const { children, style } = props;
  const { isOpen, onChange } = useContext(DropdownContext);

  return (
    <>
      {isOpen && (
        <StyledMenu css={style}>
          <Dropdown.Background onClick={onChange} />
          {children}
        </StyledMenu>
      )}
    </>
  );
};

Dropdown.Item = function Item(props: PropsWithChildren<ItemProps>) {
  const { children, onClick, style } = props;
  return (
    <StyledItem css={style} onClick={onClick}>
      {children}
    </StyledItem>
  );
};

Dropdown.Trigger = function Trigger(props: TriggerProps) {
  const { as } = props;

  return as;
};

export default Dropdown;

const StyledDropdown = styled.div<{ css?: CSSProp }>`
  ${({ css }) => css}
`;

const StyledMenu = styled.div<{ css?: CSSProp }>`
  ${({ css }) => css}
`;

const StyledBackground = styled.div`
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`;

const StyledItem = styled.div<{ css?: CSSProp }>`
  ${({ css }) => css};
`;

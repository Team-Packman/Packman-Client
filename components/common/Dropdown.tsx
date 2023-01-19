import { createContext, PropsWithChildren, ReactElement, useContext } from 'react';
import styled, { CSSProp } from 'styled-components';
import { FONT_STYLES } from '../../styles/font';
import { packmanColors } from '../../styles/color';

interface DropdownProps {
  isOpen: boolean;
  toggle: VoidFunction;
  dropdownStyle?: CSSProp;
}

interface MenuProps {
  dropdownMenuStyle?: CSSProp;
}

interface ItemProps {
  dropdownItemStyle?: CSSProp;
  isCurrentFolder?: boolean;
  onClick: VoidFunction;
}

interface BackgroundProps {
  onClick?: VoidFunction;
}
interface TriggerProps {
  as: ReactElement;
}

export const DropdownContext = createContext({
  isOpen: false,
  toggle: () => {},
});

function Dropdown(props: PropsWithChildren<DropdownProps>) {
  const { children, isOpen, toggle, dropdownStyle } = props;

  return (
    <DropdownContext.Provider value={{ isOpen, toggle }}>
      <StyledDropdown dropdownStyle={dropdownStyle}>{children}</StyledDropdown>
    </DropdownContext.Provider>
  );
}

Dropdown.Background = function Background(props: BackgroundProps) {
  const { onClick } = props;
  return <StyledBackground onClick={onClick} />;
};

Dropdown.Menu = function Menu(props: PropsWithChildren<MenuProps>) {
  const { children, dropdownMenuStyle } = props;
  const { isOpen, toggle } = useContext(DropdownContext);

  return (
    <>
      {isOpen && (
        <StyledMenu dropdownMenuStyle={dropdownMenuStyle}>
          <Dropdown.Background onClick={toggle} />
          {children}
        </StyledMenu>
      )}
    </>
  );
};

Dropdown.Item = function Item(props: PropsWithChildren<ItemProps>) {
  const { children, dropdownItemStyle, isCurrentFolder, onClick } = props;
  return (
    <StyledItem
      isCurrentFolder={isCurrentFolder}
      dropdownItemStyle={dropdownItemStyle}
      onClick={onClick}
    >
      {children}
    </StyledItem>
  );
};

Dropdown.Trigger = function Trigger(props: TriggerProps) {
  const { as } = props;

  return as;
};

export default Dropdown;

const StyledDropdown = styled.div<{ dropdownStyle?: CSSProp }>`
  ${({ dropdownStyle }) => dropdownStyle}
`;

const StyledMenu = styled.div<{ dropdownMenuStyle?: CSSProp }>`
  ${({ dropdownMenuStyle }) => dropdownMenuStyle}
`;

const StyledItem = styled.div<{ isCurrentFolder?: boolean; dropdownItemStyle?: CSSProp }>`
  ${({ dropdownItemStyle }) => dropdownItemStyle};
  ${({ isCurrentFolder }) =>
    isCurrentFolder ? FONT_STYLES.BODY4_SEMIBOLD : FONT_STYLES.BODY3_REGULAR};
  color: ${({ isCurrentFolder }) =>
    isCurrentFolder ? packmanColors.pmBlack : packmanColors.pmDarkGrey};
`;

const StyledBackground = styled.div`
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`;

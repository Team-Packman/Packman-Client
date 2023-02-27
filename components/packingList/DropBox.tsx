import Link from 'next/link';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import { FONT_STYLES } from '../../styles/font';
import Dropdown from '../common/Dropdown';
import { ReactElement } from 'react';

interface DropBoxProps {
  trigger: ReactElement;
  folders: Array<{ id: string; name: string }>;
  link: string;
  current: string;
  onReset: VoidFunction;
  isOpen: boolean;
}

function DropBox(props: DropBoxProps) {
  const { trigger, folders, link, current, onReset, isOpen } = props;

  return (
    <>
      <Dropdown.Trigger as={trigger} />
      <StyledRoot>
        <Dropdown>
          {isOpen && (
            <Dropdown.Menu>
              {folders.map(({ id, name }) => (
                <Link key={id} href={`${link}${id}`}>
                  <StyledItem onClick={onReset} currentId={id === current}>
                    <Dropdown.Item>{name}</Dropdown.Item>
                  </StyledItem>
                </Link>
              ))}
            </Dropdown.Menu>
          )}
        </Dropdown>
      </StyledRoot>
    </>
  );
}

export default DropBox;

const StyledRoot = styled.div`
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

const StyledItem = styled.div<{ currentId: boolean }>`
  ${({ currentId }) => (currentId ? FONT_STYLES.BODY4_SEMIBOLD : FONT_STYLES.BODY3_REGULAR)};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4.8rem;
  font-size: 1.5rem;
  color: ${({ currentId }) => (currentId ? packmanColors.pmBlack : packmanColors.pmDarkGrey)};
  &:not(:last-child) {
    border-bottom: 1px solid ${packmanColors.pmGrey};
  }
`;

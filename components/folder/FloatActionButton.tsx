import styled from 'styled-components';
import Image from 'next/image';
import { useState } from 'react';
import FAB from '/public/assets/svg/fab.svg';
import FABOPEN from '/public/assets/svg/fab_rotate.svg';
import { Backdrop } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { packmanColors } from '../../styles/color';
import { FONT_STYLES } from '../../styles/font';

interface FloatModalProps {
  onClick(index: number): void;
  pageName: string;
  isAloned?: string;
}
const useStyles = makeStyles(() => ({
  backdrop: {
    zIndex: 2,
    color: 'rgba(0, 0, 0, 0.47)',
  },
}));

// ref : https://www.upbeatcode.com/react/implement-floating-action-button-in-react/
const FloatActionButton = (props: FloatModalProps) => {
  const { onClick: handleFloatClick, pageName, isAloned = '' } = props;
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleActionClick = (index: number) => {
    handleFloatClick(index);
    handleOpen();
  };
  const actions = [
    { icon: '👐🏻', name: '함께 리스트 추가' },
    { icon: '☝🏻', name: '혼자 리스트 추가' },
    { icon: '📂', name: '폴더 추가 ' },
  ];

  const actionsForPackingList = [
    { icon: '👐🏻', name: '함께 리스트 추가' },
    { icon: '☝🏻', name: '혼자 리스트 추가' },
  ];

  return (
    <>
      <Backdrop open={open} className={classes.backdrop} onClick={handleOpen} />
      <StyledFABContainer pageName={pageName} isAloned={isAloned}>
        <li onClick={handleOpen}>
          {open ? (
            <div>
              <Image src={FABOPEN} alt="FAB" layout="fill" />
            </div>
          ) : (
            <div>
              <Image src={FAB} alt="FAB" layout="fill" />
            </div>
          )}
        </li>
        {pageName === 'folder' ? (
          actions.map((action, index) => (
            <StyledList
              style={{ transitionDelay: `${index * 25}ms` }}
              className="fab-action"
              key={action.name}
              open={open}
              index={index}
              onClick={() => handleActionClick(index)}
            >
              <span className="tooltip">{action.icon}</span>
              <span className="tooltip">{action.name}</span>
            </StyledList>
          ))
        ) : isAloned === 'alone' ? (
          <StyledList
            style={{ transitionDelay: `${1 * 25}ms` }}
            className="fab-action"
            key={actionsForPackingList[1].name}
            open={open}
            index={1}
            onClick={() => handleActionClick(1)}
          >
            <span className="tooltip">{actionsForPackingList[1].icon}</span>
            <span className="tooltip">{actionsForPackingList[1].name}</span>
          </StyledList>
        ) : (
          <StyledList
            style={{ transitionDelay: `${1 * 25}ms` }}
            className="fab-action"
            key={actionsForPackingList[0].name}
            open={open}
            index={0}
            onClick={() => handleActionClick(0)}
          >
            <span className="tooltip">{actionsForPackingList[0].icon}</span>
            <span className="tooltip">{actionsForPackingList[0].name}</span>
          </StyledList>
        )}
      </StyledFABContainer>
    </>
  );
};

export default FloatActionButton;

export const StyledFABContainer = styled.ul<{ pageName: string; isAloned: string }>`
  display: flex;
  // Display actions from bottom to top
  flex-direction: column-reverse;
  align-items: end;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 1300;

  // Display button to the bottom right
  position: fixed;
  right: 2rem;
  bottom: 13.5rem;

  // Set max height to only trigger mouse enter
  // when user hover over first button
  max-height: 52px;

  li > div {
    width: 5.7rem;
    height: 5.7rem;
  }

  li:first-child {
    position: fixed;
    right: 2rem;
    bottom: 6.5rem;
    filter: drop-shadow(2px 4px 16px rgba(0, 0, 0, 0.2));
  }

  li:last-child {
    margin-bottom: ${({ pageName }) => pageName === 'folder' && '0.8rem'};
    border-radius: 0.8rem;
  }

  li:nth-child(2) {
    border-radius: ${({ isAloned }) => (isAloned ? '0.8rem' : '0 0 0.8rem 0.8rem')};
  }

  li:nth-child(3) {
    border-radius: 0.8rem 0.8rem 0 0;
  }
`;

export const StyledList = styled.li<{ open: boolean; index: number }>`
  display: flex;
  justify-content: flex-start;
  font-size: 1.5rem;
  align-items: center;
  padding: 1.2rem 1.627rem 1.2rem 1.2rem;
  cursor: pointer;
  position: relative;
  background: ${packmanColors.pmWhite};
  width: 16rem;
  transform: ${({ open }) => (open ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0)')};
  transition: transform 300ms, opacity 300ms;
  opacity: ${({ open }) => (open ? '1' : '0')};

  span:first-child {
    width: 1.6rem;
    font-size: 1.6rem;
  }

  span:last-child {
    /* '폴더 추가' 중앙 정렬을 위한 코드 */
    font-style: ${FONT_STYLES.BODY4_SEMIBOLD};
    padding-left: ${({ index }) => (index === 2 ? '3.2rem' : '1.4rem')};
    flex-shrink: 0;
  }
`;

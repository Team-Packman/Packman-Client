import styled from 'styled-components';
import Image from 'next/image';
import { useState } from 'react';
import FAB from '../../assets/fab.svg';
import FABOPEN from '../../assets/fab_rotate.svg';
import { Backdrop } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { packmanColors } from '../../../styles/color';
import { isNonNullChain } from 'typescript';

interface FloatModalProps {
  onClick(index: number): void;
  pageName: string;
}
const useStyles = makeStyles(() => ({
  backdrop: {
    zIndex: 1,
    color: 'rgba(0, 0, 0, 0.47)',
  },
}));

// ref : https://www.upbeatcode.com/react/implement-floating-action-button-in-react/
const FloatActionButton = (props: FloatModalProps) => {
  const { onClick: handleFloatClick, pageName } = props;
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
      <StyledFABContainer pageName={pageName}>
        <li onClick={handleOpen}>
          {open ? (
            <Image src={FABOPEN} width={63} height={63} alt="FAB" />
          ) : (
            <Image src={FAB} width={63} height={63} alt="FAB" />
          )}
        </li>
        {pageName === 'folder'
          ? actions.map((action, index) => (
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
          : actionsForPackingList.map((action, index) => (
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
            ))}
      </StyledFABContainer>
    </>
  );
};

export default FloatActionButton;

export const StyledFABContainer = styled.ul<{ pageName: string }>`
  display: flex;
  // Display actions from bottom to top
  flex-direction: column-reverse;
  align-items: end;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 105;

  // Display button to the bottom right
  position: fixed;
  right: 2em;
  bottom: 2em;

  // Set max height to only trigger mouse enter
  // when user hover over first button
  max-height: 52px;

  li:last-child {
    margin-bottom: ${({ pageName }) => pageName === 'folder' && '0.8rem'};
    border-radius: 0.8rem;
  }

  li:nth-child(2) {
    border-radius: 0 0 0.8rem 0.8rem;
  }

  li:nth-child(3) {
    border-radius: 0.8rem 0.8rem 0 0;
  }
`;

export const StyledList = styled.li<{ open: boolean; index: number }>`
  display: flex;
  justify-content: flex-start;
  font-size: 1.5rem;
  padding: 12px;
  cursor: pointer;
  position: relative;
  background: ${packmanColors.pmWhite};
  width: 16rem;

  transform: ${({ open }) =>
    open ? 'transform: translateY(0) scale(1)' : 'translateY(50px) scale(0)'};
  transition: transform 300ms, opacity 300ms;
  opacity: ${({ open }) => (open ? '1' : '0')};

  span:last-child {
    /* '폴더 추가' 중앙 정렬을 위한 코드 */
    padding-left: ${({ index }) => (index === 2 ? '3.2rem' : '1rem')};
  }
`;

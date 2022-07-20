import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { packmanColors } from '../../styles/color';
import { editHandler } from '../../utils/editHandler';
import useGlobalState from '../../utils/hooks/useGlobalState';

interface RemainingInfoPayload {
  listId: string;
  title?: string;
  departureDate?: string;
  isSaved?: boolean;
}

type RemainingInfoType = 'title' | 'departure' | 'save';
interface CheckListHeaderProps {
  listId: string;
  title: string;
  departureDate: string;
  together?: boolean;
  activeMode?: number;
  updateRemainingInfo: (payload: RemainingInfoPayload, type: RemainingInfoType) => void;
}

function CheckListHeader(props: CheckListHeaderProps) {
  const { title: titleProps, listId, departureDate, updateRemainingInfo } = props;
  const [title, setTitle] = useState(titleProps);
  const [isEditing, setIsEditing] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const [scroll] = useGlobalState<boolean>('scroll');
  const ref = useRef<HTMLInputElement | null>(null);

  const saveTitle = () => {
    const payload = {
      listId,
      title: title === '' ? titleProps : title,
    };

    updateRemainingInfo(payload, 'title');
    setIsEditing(false);
  };

  const saveDate = (e: ChangeEvent<HTMLInputElement>) => {
    const payload = {
      listId,
      departureDate: e.target.value,
    };
    updateRemainingInfo(payload, 'departure');
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      ref.current && ref.current.focus();
    }
  }, [isEditing]);

  return (
    <StyledRoot scroll={scroll}>
      {isEditing ? (
        <StyledInput
          ref={ref}
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
          {...editHandler(isEntered, (state) => setIsEntered(state), saveTitle)}
        />
      ) : (
        <StyledTitle onClick={() => setIsEditing(true)}>{title}</StyledTitle>
      )}

      <StyledCalender>
        <input type="date" value={departureDate} onChange={saveDate} />
      </StyledCalender>
    </StyledRoot>
  );
}

export default CheckListHeader;

const StyledRoot = styled.div<{
  scroll: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: ${packmanColors.white};
  width: 100%;
  height: 8.4rem;
  padding: 0 2rem;
  transition: height 0.3s ease, opacity 0.3s ease;
  ${({ scroll }) =>
    scroll &&
    css`
      height: 0;
      opacity: 0;
    `};
`;

const StyledTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  text-align: start;
  align-items: center;
  max-height: 3.1rem;
  font-size: 2.8rem;
  font-weight: 700;
  line-height: 3.1rem;
  overflow: hidden;
  white-space: nowrap;
  color: ${packmanColors.black};
`;

const StyledInput = styled.input`
  display: flex;
  align-items: center;
  width: 100%;
  max-height: 3.25rem;
  font-size: 2.8rem;
  line-height: 3.1rem;
  font-weight: 700;
  outline: none;
  padding: 0;
  margin: 0;
  border: none;
`;
const StyledCalender = styled.div`
  display: flex;
  align-items: flex-end;
  height: 3.1rem;
  /* padding: 0 2rem; */
  background-color: ${packmanColors.white};
  z-index: 2;

  input[type='date'] {
    display: flex;
    align-items: flex-end;
    position: relative;
    height: 100%;
    border: none;
    font-size: 1.5rem;
    outline: none;
    padding: 0;
    -webkit-appearance: none;
  }

  input[type='date']::-webkit-date {
    display: flex;
    align-items: flex-end;
    position: relative;
    height: 100%;
    border: none;
    font-size: 1.5rem;
    outline: none;
    padding: 0;
    /* -webkit-appearance: none; */
  }

  input[type='date']::-webkit-clear-button,
  input[type='date']::-webkit-inner-spin-button {
    display: none;
  }
  input[type='date']::-webkit-calendar-picker-indicator {
    z-index: 1;
  }
`;

import Image from 'next/image';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { packmanColors } from '../../styles/color';
import { editHandler } from '../../utils/editHandler';
import useGlobalState from '../../utils/hooks/useGlobalState';
import Edit from '/public/assets/svg/edit_color_ic.svg';

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

const MAX_LENGTH = 12;

function CheckListHeader(props: CheckListHeaderProps) {
  const { title: titleProps, listId, departureDate, updateRemainingInfo } = props;
  const [title, setTitle] = useState(titleProps);
  const [isEditing, setIsEditing] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const [scroll] = useGlobalState<boolean>('scroll');
  const ref = useRef<HTMLInputElement | null>(null);

  const handleTitle = (title: string) => {
    if (title.length <= MAX_LENGTH) {
      setTitle(title);
    }
  };

  const saveTitle = () => {
    const payload = {
      listId,
      title: title === '' ? titleProps : title,
    };

    title === '' && setTitle(titleProps);
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
    <StyledRoot scroll={scroll} className="layout_option">
      {isEditing ? (
        <StyledInput
          ref={ref}
          value={title}
          maxLength={MAX_LENGTH}
          onChange={({ target: { value } }) => handleTitle(value)}
          {...editHandler(isEntered, (state) => setIsEntered(state), saveTitle)}
        />
      ) : (
        <StyledTitle onClick={() => setIsEditing(true)}>{title}</StyledTitle>
      )}

      <StyledCalender>
        <input type="date" value={departureDate} onChange={saveDate} />
        <StyledDate>{departureDate.replaceAll('-', '. ')}</StyledDate>
        <StyledEdit>
          <Image src={Edit} layout="fill" alt="edit_ic" />
        </StyledEdit>
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
  background-color: ${packmanColors.pmWhite};
  width: 100%;
  height: 6.5rem;
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
  height: 3.4rem;
  font-size: 2.8rem;
  font-weight: 700;
  line-height: 3.4rem;
  overflow: hidden;
  white-space: nowrap;
  color: ${packmanColors.black};
`;

const StyledInput = styled.input`
  display: flex;
  align-items: center;
  width: 100%;
  max-height: 3.4rem;
  font-size: 2.8rem;
  line-height: 3.4rem;
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
  background-color: ${packmanColors.pmWhite};
  z-index: 2;
  position: relative;

  input {
    position: absolute;
    z-index: 3;
    opacity: 0;
  }
  input[type='date'] {
    display: flex;
    align-items: flex-end;
    height: 100%;
    border: none;
    font-size: 1.35rem;
    outline: none;
    padding: 0;
    background-color: ${packmanColors.pmWhite};
    -webkit-appearance: none;
  }
  /*
  input[type='date']::-webkit-date {
    display: flex;
    align-items: flex-end;
    position: relative;
    height: 100%;
    border: none;
    font-size: 1.5rem;
    outline: none;
    padding: 0;
    background-color: ${packmanColors.pmWhite};
    -webkit-appearance: none;
  }
  */
  input[type='date']::-webkit-calendar-picker-indicator {
    z-index: 1;
  }
  /* placeholder text style */
  input[type='date']::-webkit-datetime-edit-text,
  input[type='date']::-webkit-datetime-edit-month-field,
  input[type='date']::-webkit-datetime-edit-day-field,
  input[type='date']::-webkit-datetime-edit-year-field {
    -webkit-appearance: none;
    color: ${packmanColors.pmBlack};
  }
`;

const StyledDate = styled.span`
  font-size: 1.5rem;
  font-weight: 400;
  z-index: 2;
`;
const StyledEdit = styled.span`
  width: 2.4rem;
  height: 2.4rem;

  position: relative;

  margin-left: 1rem;
`;

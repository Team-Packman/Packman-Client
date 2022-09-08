import Image from 'next/image';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { editHandler } from '../../utils/editHandler';
import Kebab from '/public/assets/svg/kebab_ic.svg';

export interface UpdateItemPayload {
  name: string;
  listId: string;
  categoryId: string;
  packId: string;
  isChecked: boolean;
}
interface PackingItemProps {
  name: string;
  mode?: number;
  listId?: string;
  categoryId?: string;
  packId?: string;
  isEditing?: boolean;
  isChecked?: boolean;
  assignee?: ReactNode;
  example?: boolean;
  modalHandler?: () => void;
  updateItem?: (payload: UpdateItemPayload) => void;
}

const MAX_LENGTH = 12;

function PackingItem(props: PackingItemProps) {
  const {
    example,
    mode,
    name: nameProps,
    listId = '',
    categoryId = '',
    packId = '',
    assignee,
    updateItem,
    modalHandler,
    isChecked,
    isEditing,
  } = props;
  const [isEntered, setIsEntered] = useState(false);
  const [name, setName] = useState(nameProps);
  const ref = useRef<HTMLInputElement | null>(null);

  const handleValue = (name: string) => {
    if (name.length <= MAX_LENGTH) {
      setName(name);
    } else {
      setName(name.slice(0, MAX_LENGTH));
    }
  };

  const saveResult = () => {
    const payload = {
      name: name === '' ? nameProps : name,
      listId,
      categoryId,
      packId,
      isChecked: isChecked ?? false,
    };

    name === '' && setName(nameProps);
    updateItem && updateItem(payload);
  };

  const checkHandler = () => {
    if (!isEditing) {
      updateItem && updateItem({ name, listId, categoryId, packId, isChecked: !isChecked });
    }
  };

  useEffect(() => {
    if (isEditing) {
      ref.current && ref.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setName(nameProps);
  }, [nameProps]);

  return (
    <StyledRoot>
      <label>
        <StyledCheckBox
          disabled={example}
          type="checkbox"
          checked={isChecked}
          onChange={checkHandler}
        />
        {isEditing ? (
          <StyledInput
            ref={ref}
            value={name}
            maxLength={MAX_LENGTH}
            placeholder="짐을 입력해주세요"
            onChange={({ target: { value } }) => handleValue(value)}
            {...editHandler(isEntered, setIsEntered, saveResult)}
          />
        ) : (
          <StyledContent>{name}</StyledContent>
        )}
      </label>
      <StyledOptionWrapper>
        {mode === 0 && assignee}
        <StyledKebab onClick={modalHandler}>
          {!isEditing && <Image src={Kebab} alt="kebab" layout="fill" />}
        </StyledKebab>
      </StyledOptionWrapper>
    </StyledRoot>
  );
}

export default PackingItem;

const StyledRoot = styled.li`
  display: flex;
  list-style: none;
  justify-content: space-between;
  & > label {
    display: flex;
    height: 3.2rem;
    align-items: center;
    flex-grow: 1;
  }
`;

const StyledCheckBox = styled.input`
  width: 1.8rem;
  height: 1.8rem;
  flex-shrink: 0;
`;

const StyledContent = styled.div`
  max-width: 22rem;
  font-size: 1.5rem;
  font-weight: 400;
  background-color: transparent;
  border: none;
  text-align: left;
  padding-left: 1.1rem;
  outline: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 1.5rem;
  font-weight: 400;
  padding: 0;
  padding-left: 1.1rem;
  letter-spacing: 0.04em;
  border-bottom: 1px soild black;
`;

const StyledOptionWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const StyledKebab = styled.div`
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  margin-left: auto;
`;

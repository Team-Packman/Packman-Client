import Image from 'next/image';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { editHandler } from '../../utils/editHandler';
import Kebab from '/public/assets/svg/kebab_ic.svg';

interface PackingItemProps {
  name: string;
  id: string;
  categoryId: string;
  isEditing: boolean;
  isChecked: boolean;
  updateItem: (value: string, id: string, categoryId: string, isChecked?: boolean) => void;
  assginee?: ReactNode;
  example?: boolean;
  modalHandler?: () => void;
}

function PackingItem(props: PackingItemProps) {
  const {
    name,
    id,
    example,
    assginee,
    updateItem,
    modalHandler,
    isChecked: check,
    isEditing,
    categoryId,
  } = props;
  const [isEntered, setIsEntered] = useState(false);
  const [isChecked, setIsChecked] = useState(check);
  const [value, setValue] = useState(name);
  const ref = useRef<HTMLInputElement | null>(null);

  const handleValue = (value: string) => {
    if (value.length < 13) {
      setValue(value);
    }
  };
  const saveResult = () => {
    updateItem(value, id, categoryId, isChecked);
  };

  const checkHandler = () => {
    console.log({
      name: value,
      categoryId,
      isChecked: !isChecked,
    });
    if (!isEditing) {
      setIsChecked((prev) => !prev);
    }
  };

  useEffect(() => {
    if (isEditing) {
      ref.current && ref.current.focus();
    }
  }, [isEditing]);
  return (
    <StyledRoot>
      <label>
        <StyledCheckBox type="checkbox" checked={isChecked} onChange={checkHandler} />
        {isEditing ? (
          <StyledInput
            ref={ref}
            value={value}
            placeholder="짐을 입력해주세요"
            onChange={({ target: { value } }) => handleValue(value)}
            {...editHandler(isEntered, (state) => setIsEntered(state), saveResult)}
          />
        ) : (
          <StyledContent>{name}</StyledContent>
        )}
      </label>
      <StyledOptionWrapper>
        {assginee && assginee}
        {!isEditing && (
          <StyledKebab onClick={modalHandler}>
            <Image src={Kebab} alt="kebab" layout="fill" />
          </StyledKebab>
        )}
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

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import { editHandler } from '../../utils/editHandler';
import Kebab from '/public/assets/svg/kebab_ic.svg';

interface PackingCategoryProps {
  id: string;
  listId: string;
  name: string;
  updateCategory: (value: string, id: string, listId: string) => void;
  modalHandler?: () => void;
  isEditing: boolean;
  example?: boolean;
}

function PackingCategory(props: PackingCategoryProps) {
  const { example, name, id, listId, updateCategory, modalHandler, isEditing } = props;
  const [isEntered, setIsEntered] = useState(false);
  const [value, setValue] = useState(name);
  const ref = useRef<HTMLInputElement | null>(null);

  const saveResult = () => {
    if (value === '') {
      setValue(name);
      return;
    }
    updateCategory(value, id, listId);
  };

  useEffect(() => {
    if (isEditing) {
      ref.current && ref.current.focus();
    }
  }, [isEditing]);

  return (
    <StyledRoot disabled={example} onClick={modalHandler}>
      {isEditing ? (
        <StyledInput
          ref={ref}
          value={value}
          placeholder="카테고리"
          onChange={({ target: { value } }) => setValue(value)}
          {...editHandler(isEntered, (state) => setIsEntered(state), saveResult)}
        />
      ) : (
        <StyledCategory>{name}</StyledCategory>
      )}
      {!isEditing && (
        <StyledKebab>
          <Image src={Kebab} alt="kebeb" layout="fill" />
        </StyledKebab>
      )}
    </StyledRoot>
  );
}

export default PackingCategory;

const StyledRoot = styled.button`
  display: flex;
  align-items: center;
  height: 3.2rem;
  padding: 0;
  padding-left: 1.2rem;
  background-color: ${packmanColors.lightGray};
  border-radius: 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: ${packmanColors.black};
  border: none;
  outline: none;
`;

const StyledKebab = styled.div`
  position: relative;
  flex-basis: 2.4rem;
  width: 2.4rem;
  height: 2.4rem;
  max-width: 18.4rem;
`;

const StyledCategory = styled.div``;
const StyledInput = styled.input`
  width: 2.4rem;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${packmanColors.black};
  outline: none;
`;

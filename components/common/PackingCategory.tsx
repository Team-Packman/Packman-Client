import Image from 'next/image';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import { editHandler } from '../../utils/editHandler';
import { setCaret } from '../../utils/setCaret';
import Kebab from '/public/assets/svg/kebab_ic.svg';

export interface UpdateCategoryPayload {
  listId: string;
  categoryId: string;
  name: string;
}
interface PackingCategoryProps {
  name: string;
  listId?: string;
  categoryId?: string;
  updateCategory?: (payload: UpdateCategoryPayload) => void;
  modalHandler?: () => void;
  isEditing?: boolean;
  example?: boolean;
}

const MAX_LENGTH = 12;

function PackingCategory(props: PackingCategoryProps) {
  const {
    example,
    name,
    categoryId = '',
    listId = '',
    updateCategory,
    modalHandler,
    isEditing,
  } = props;
  const [text, setText] = useState(name);
  const [isEntered, setIsEntered] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  const saveResult = () => {
    if (ref.current) {
      const text = ref.current.innerText;

      const payload = {
        name: text === '' ? name : text,
        categoryId,
        listId,
      };

      if (text === '') ref.current.innerText = name;
      updateCategory && updateCategory(payload);
    }
  };

  useEffect(() => {
    if (isEditing && ref.current) {
      ref.current.focus();
      setCaret(ref.current);
    }
  }, [isEditing]);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerText = name;
      setCaret(ref.current);
    }
  }, [name]);

  const handleChange = ({ currentTarget: { innerText } }: FormEvent<HTMLSpanElement>) => {
    if (ref.current && innerText.length > MAX_LENGTH) {
      ref.current.innerText = innerText.slice(0, MAX_LENGTH);
      setCaret(ref.current);
    }
  };

  return (
    <StyledRoot disabled={example} onClick={modalHandler}>
      {isEditing ? (
        <StyledCategory
          suppressContentEditableWarning
          contentEditable={true}
          ref={ref}
          defaultValue={text}
          onInput={handleChange}
          {...editHandler(isEntered, setIsEntered, saveResult)}
        >
          {text}
        </StyledCategory>
      ) : (
        <StyledCategory>{text}</StyledCategory>
      )}

      <StyledKebab>{!isEditing && <Image src={Kebab} alt="kebab_ic" layout="fill" />}</StyledKebab>
    </StyledRoot>
  );
}

export default PackingCategory;

const StyledRoot = styled.button`
  display: flex;
  align-items: center;
  height: 3.2rem;
  padding: 0;
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

const StyledCategory = styled.span`
  min-width: 2.5rem;
  max-width: 16rem;
  overflow: hidden;
  white-space: nowrap;
  outline: none;
  padding-left: 1.2rem;
`;

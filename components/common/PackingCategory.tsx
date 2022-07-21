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
    name: nameProps,
    categoryId = '',
    listId = '',
    updateCategory,
    modalHandler,
    isEditing,
  } = props;
  const [isEntered, setIsEntered] = useState(false);
  const [name, setName] = useState(nameProps);
  const ref = useRef<HTMLSpanElement | null>(null);

  const saveResult = () => {
    const payload = {
      name: name === '' ? nameProps : name,
      categoryId,
      listId,
    };

    name === '' && setName(nameProps);
    updateCategory && updateCategory(payload);
  };

  useEffect(() => {
    if (isEditing && ref.current) {
      ref.current.focus();
      setCaret(ref.current);
    }
  }, [isEditing]);

  const handleChange = ({ currentTarget: { innerText } }: FormEvent<HTMLSpanElement>) => {
    if (innerText.length <= MAX_LENGTH) {
      setName(innerText);
    } else {
      if (ref.current) {
        ref.current.innerText = name;
        setCaret(ref.current);
      }
    }
  };

  return (
    <StyledRoot disabled={example} onClick={modalHandler}>
      {isEditing ? (
        <StyledCategory
          suppressContentEditableWarning
          contentEditable={true}
          ref={ref}
          defaultValue={name}
          onInput={handleChange}
          {...editHandler(isEntered, (state) => setIsEntered(state), saveResult)}
        >
          {nameProps}
        </StyledCategory>
      ) : (
        <StyledCategory>{name}</StyledCategory>
      )}

      <StyledKebab>{!isEditing && <Image src={Kebab} alt="kebeb" layout="fill" />}</StyledKebab>
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

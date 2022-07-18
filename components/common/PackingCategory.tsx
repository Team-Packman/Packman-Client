import Image from 'next/image';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import { editHandler } from '../../utils/editHandler';
import { setCarret } from '../../utils/setCarret';
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

const MAX_LENGTH = 12;

function PackingCategory(props: PackingCategoryProps) {
  const { example, name, id, listId, updateCategory, modalHandler, isEditing } = props;
  const [isEntered, setIsEntered] = useState(false);
  const [value, setValue] = useState(name);
  const ref = useRef<HTMLSpanElement | null>(null);

  const saveResult = () => {
    updateCategory(value, id, listId);
  };

  useEffect(() => {
    if (isEditing && ref.current) {
      ref.current.focus();
      setCarret(ref.current);
    }
  }, [isEditing]);

  const handleChange = ({ currentTarget: { innerText } }: FormEvent<HTMLSpanElement>) => {
    if (innerText.length <= MAX_LENGTH) {
      setValue(innerText);
    } else {
      if (ref.current) {
        ref.current.innerText = value;
        setCarret(ref.current);
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
          onInput={handleChange}
          {...editHandler(isEntered, (state) => setIsEntered(state), saveResult)}
        >
          {name}
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

const StyledCategory = styled.span`
  min-width: 2.5rem;
  max-width: 16rem;
  overflow: hidden;
  white-space: nowrap;
  outline: none;
`;

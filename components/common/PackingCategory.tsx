import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import { editHandler } from '../../utils/editHandler';
import Kebab from '/public/assets/svg/kebab_ic.svg';

interface PackingCategoryProps {
  id: string;
  name: string;
  updateCategory: (value: string, id: string) => void;
  example?: boolean;
}

function PackingCategory(props: PackingCategoryProps) {
  const { example, name, id, updateCategory } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const [value, setValue] = useState('');
  const ref = useRef<HTMLInputElement | null>(null);

  const saveResult = () => {
    updateCategory(value, id);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      ref.current && ref.current.focus();
    }
  }, [isEditing]);

  return (
    <StyledRoot disabled={example} onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <StyledInput
          ref={ref}
          value={value}
          onChange={({ target: { value } }) => setValue(value)}
          {...editHandler(isEntered, (state) => setIsEntered(state), saveResult)}
        />
      ) : (
        <StyledCategory>{name}</StyledCategory>
      )}
      <StyledKebab>
        <Image src={Kebab} alt="kebeb" layout="fill" />
      </StyledKebab>
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

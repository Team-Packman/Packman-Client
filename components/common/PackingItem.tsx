import Image from 'next/image';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { editHandler } from '../../utils/editHandler';
import Kebab from '/public/assets/svg/kebab_ic.svg';

interface PackingItemProps {
  name: string;
  id: string;
  isChecked: boolean;
  updateItem: (value: string, id: string) => void;
  assginee?: ReactNode;
  example?: boolean;
}

function PackingItem(props: PackingItemProps) {
  const { name, id, example, assginee, updateItem, isChecked } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const [value, setValue] = useState('');
  const ref = useRef<HTMLInputElement | null>(null);

  const saveResult = () => {
    updateItem(value, id);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      ref.current && ref.current.focus();
    }
  }, [isEditing]);
  return (
    <StyledRoot>
      <label>
        <StyledCheckBox type="checkbox" checked={isChecked} />
        {isEditing ? (
          <StyledInput
            ref={ref}
            placeholder="짐을 입력해주세요"
            onChange={({ target: { value } }) => setValue(value)}
            {...editHandler(isEntered, (state) => setIsEntered(state), saveResult)}
          />
        ) : (
          <StyledContent disabled={example} onClick={() => setIsEditing(true)}>
            {name}
          </StyledContent>
        )}
        {assginee && assginee}
        <StyledKebab>
          <Image src={Kebab} alt="kebab" layout="fill" />
        </StyledKebab>
      </label>
    </StyledRoot>
  );
}

export default PackingItem;

const StyledRoot = styled.li`
  list-style: none;
  & > label {
    display: flex;
    align-items: center;
  }
`;

const StyledCheckBox = styled.input`
  width: 1.8rem;
  height: 1.8rem;
`;

const StyledContent = styled.button`
  width: 100%;
  font-size: 1.5rem;
  font-weight: 400;
  background-color: transparent;
  border: none;
  text-align: left;
  padding-left: 1.1rem;
`;
const StyledInput = styled.input`
  width: 100%;
  height: 3.2rem;
  border: none;
  outline: none;
  font-size: 1.5rem;
  font-weight: 400;
  padding: 0;
  padding-left: 1.1rem;
  letter-spacing: 0.04em;
`;

const StyledKebab = styled.div`
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  margin-left: auto;
`;

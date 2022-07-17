import React from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import AddTemplateButton from './AddTemplateButton';
import SharePackingListButton from './SharePackingListButton';

function FunctionSection() {
  return (
    <StyledRoot>
      <AddTemplateButton />
      <SharePackingListButton />
    </StyledRoot>
  );
}

export default FunctionSection;

const StyledRoot = styled.section`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  background-color: ${packmanColors.pmWhite};
  box-shadow: 0px -3px 13px rgba(0, 0, 0, 0.05);
  padding: 1.6rem 2rem;
  bottom: 0;
  z-index: 99;
  & > button:first-child {
    margin-bottom: 0.9rem;
  }
`;

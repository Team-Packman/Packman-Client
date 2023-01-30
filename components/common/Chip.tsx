import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import { FONT_STYLES } from '../../styles/font';

interface ChipProps {
  text: string;
}

function Chip(props: ChipProps) {
  const { text } = props;
  return <StyledChip>{text}</StyledChip>;
}

export default Chip;

const StyledChip = styled.div`
  width: fit-content;
  font-style: ${FONT_STYLES.BODY1_REGULAR};
  padding: 0.1rem 1rem;
  color: ${packmanColors.pmBlack};
  border-radius: 1.2rem;
  border: 1px solid ${packmanColors.pmPink};
`;

import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import { FONT_STYLES } from '../../styles/font';

interface ChipButtonProps {
  text: string;
}

function ChipButton(props: ChipButtonProps) {
  const { text } = props;
  return <StyledChipButton>{text}</StyledChipButton>;
}

export default ChipButton;

const StyledChipButton = styled.p`
  font-style: ${FONT_STYLES.BODY1_REGULAR};
  width: fit-content;
  padding: 0.1rem 1rem;
  color: ${packmanColors.pmBlack};
  border-radius: 1.2rem;
  border: 1px solid ${packmanColors.pmPink};
`;

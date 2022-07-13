import styled from 'styled-components';

function BottomModal() {
  const modalData = {
    folderName: '국내여행',
  };
  return (
    <StyledRoot>
      <StyledModalInfo>
        <h1>{folderName}</h1>
        <StyledButtonWrapper>
          <button>수정하기</button>
          <button>삭제하기</button>
        </StyledButtonWrapper>
      </StyledModalInfo>
    </StyledRoot>
  );
}

export default BottomModal;

const StyledRoot = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.47);
  z-index: 10;
  overflow: hidden;
`;
const StyledModalInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 31.5rem;
  height: 17.6rem;
  background-color: #fff;
  border-radius: 2.4rem 2.4rem 0 0;

  z-index: 10;
`;
const StyledButtonWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  & > button {
  }
`;
